import ModalHeader from "@/Components/ModalHeader";
import React from "react";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import {
    Box,
    Button,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "@inertiajs/react";
import { MuiFileInput } from "mui-file-input";
import { useRef } from "react";
import { useEffect } from "react";
import EditMenu from "@/Components/EditMenu";

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();
    return `${year}${month}${date}${hour}${minute}${seconds}`;
};

const PlayMusic = (props) => {
    const storagePath = "../storage/audio/";
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");
    const [recordings, setRecordings] = useState([]);
    const [radio, setRadio] = useState("record");
    const [comments, setComments] = useState([]);
    const [postData, setPostData] = useState(props.post);
    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState();
    const [open, setOpen] = useState(false);
    const [playingStates, setPlayingStates] = useState({});
    const { data, setData, post } = useForm({
        text: "",
        music: "",
        music_flg: 0,
        post_id: props.post.id,
        user_id: props.auth.user.id,
    });

    useEffect(() => {
        setComments(props.post.comments);
    }, [props.post]);

    useEffect(() => {
        initializeSession();
    }, [comments]);

    const mainAudioRef = useRef(null);
    const subAudioRef = useRef({});

    function handleModalOpen() {
        setOpen(true);
    }

    function handleModalClose() {
        setOpen(false);
    }

    const handleChangeFile = (newfile) => {
        // file を参照するための一時的なURLを作成
        setFile(newfile);
        const url = URL.createObjectURL(newfile);

        setFileUrl(url);
        setData("music", newfile);
    };

    // 録音
    const RecButton = ({ isRecording, stopCallback, startCallback }) => (
        <button
            className="rounded-full w-20 h-20 shadow-lg bg-[#E5671D] hover:bg-[#FFB2A9] duration-300 transition drop-shadow-md active:translate-y-3"
            onClick={isRecording ? stopCallback : startCallback}
            type="button"
        >
            {isRecording ? (
                <StopIcon fontSize="large" />
            ) : (
                <MicIcon fontSize="large" />
            )}
        </button>
    );

    // 録音の開始
    const startRecording = async () => {
        try {
            if (recorder) {
                recorder.destroy();
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            const newRecorder = new RecordRTC(stream.clone(), {
                type: "audio",
                recorderType: StereoAudioRecorder,
                mimeType: "audio/wav",
            });
            newRecorder.startRecording();
            handleMainPlay();
            setRecorder(newRecorder);
            setIsRecording(true);
        } catch (err) {
            if (err instanceof Error) {
                setError("録音の開始に失敗しました: " + err.message);
            }
        }
    };

    // 録音の停止
    const stopRecording = () => {
        handleMainStop();
        if (recorder) {
            recorder.stopRecording(() => {
                const currentDate = getCurrentDate();
                const blob = recorder.getBlob();
                const recordFile = new File(
                    [blob],
                    "audio_" + currentDate + ".wav",
                    { type: "audio/wav" }
                );
                const soundUrl = URL.createObjectURL(blob);
                setIsRecording(false);

                const id =
                    Math.random().toString(32).substring(2) +
                    new Date().getTime().toString(32);

                const newRecording = {
                    audioURL: soundUrl,
                    blob,
                    id,
                    recDate: currentDate,
                };

                setRecordings([...recordings, newRecording]);
                setFileUrl(soundUrl);
                setFile(recordFile);
                setData("music", recordFile);
            });
        }
    };
    const handleLike = (e) => {
        if (props.isLike) {
            post(route("like.destroy", postData), { 
                preserveScroll: true,
                onSuccess: () => {
                    setPostData(prev => ({...prev, liked_count: prev.liked_count - 1}));
                }
            });
        } else {
            post(route("like.store", postData), {
                onSuccess: () => {
                    setPostData(prev => ({...prev, liked_count: prev.liked_count + 1}));
                }
            });
        }
    };

    const handleRadioChange = (e) => {
        setRadio(e.target.value);
        if (e.target.value == "record") {
            setData("music_flg", 0);
        } else {
            setData("music_flg", 1);
        }
    };

    const handleMainPlay = () => {
        mainAudioRef.current.volume = 0.3;
        mainAudioRef.current.play();
    };

    const handleMainStop = () => {
        mainAudioRef.current.pause();
        mainAudioRef.current.currentTime = 0;
    };

    const handleSubPlay = (id) => {
        subAudioRef.current[id].volume = 0.3;
        subAudioRef.current[id].play();
    };

    const handleSubStop = (id) => {
        subAudioRef.current[id].pause();
        subAudioRef.current[id].currentTime = 0;
    };

    const initializeSession = () => {
        const initialStates = {};
        comments.forEach(comment => {
            initialStates[comment.id] = 'stopped';
        });
        setPlayingStates(initialStates);
    };

    const handleSession = (music_flg, comment_id) => {
        initializeSession();
        let timeout = 0;
        if (music_flg == 0) {
            timeout = 100;
        }
        handleMainStop();
        handleSubStop(comment_id);

        handleSubPlay(comment_id);
        setTimeout(() => {
            handleMainPlay();
        }, timeout);

        setPlayingStates((prevStates) => ({
            ...prevStates,
            [comment_id]: "playing",
        }));
    };

    const handlePlay = (comment_id) => {
        handleMainPlay();
        handleSubPlay(comment_id);
        setPlayingStates((prevStates) => ({
            ...prevStates,
            [comment_id]: "playing",
        }));
    };

    const handleStop = (comment_id) => {
        handleMainStop();
        handleSubStop(comment_id);
        setPlayingStates((prevStates) => ({
            ...prevStates,
            [comment_id]: "stopped",
        }));
    };

    const handlePause = (comment_id) => {
        mainAudioRef.current.pause();
        subAudioRef.current[comment_id].pause();
        setPlayingStates((prevStates) => ({
            ...prevStates,
            [comment_id]: "paused",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFile();
        setFileUrl();
        setOpen(false);

        post(route("comment.store"), {
            onSuccess: (response) => {
                setComments(response.props.post.comments);
                setPostData(prev => ({...prev, comments_count: prev.comments_count + 1}));
            },
        });
    };

    return (
        <div>
            <ModalHeader header="再生" />
            <div className="mx-4 pt-12 border-dotted border-b-2 border-gray-400">
                <div className="flex items-center mt-2">
                    <img
                        className="mr-2 w-12 h-12"
                        style={{ borderRadius: "50%" }}
                        src={`../storage/image/${postData.user.account.icon}`}
                        alt="アイコン"
                    />
                    <div>
                        <div>{postData.user.name}</div>
                        <div>{postData.created_at}</div>
                    </div>
                    {props.auth.user.id === postData.user.id && (
                        <EditMenu target="post" id={postData.id} />
                    )}
                </div>

                <div className="mt-2">{postData.address}</div>
                <div className="mt-2">{postData.story}</div>
                <audio
                    id="main"
                    ref={mainAudioRef}
                    controls
                    src={storagePath + postData.user_id + "/" + postData.music}
                    className="mt-2"
                ></audio>
                <div className="flex justify-around mt-2 ml-2 mr-8">
                    <IconButton type="button" onClick={handleLike}>
                        {props.isLike ? (
                            <FavoriteIcon style={{ color: "#eb3495" }} />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                        <div className="ml-1 text-lg">
                            {postData.liked_count}
                        </div>
                    </IconButton>

                    <IconButton type="button" onClick={handleModalOpen}>
                        <LyricsRoundedIcon />
                        <div className="ml-1 text-lg">
                            {postData.comments_count}
                        </div>
                    </IconButton>
                </div>
            </div>
            {comments.map((comment, index) => (
                <div
                    key={index}
                    className="mx-4 py-3 border-dotted border-b-2 border-gray-400"
                >
                    <div className="mt-2 flex items-center">
                        <img
                            className="mr-2 w-12 h-12"
                            style={{ borderRadius: "50%" }}
                            src={`../storage/image/${comment.user.account.icon}`}
                            alt="アイコン"
                        />
                        <div>
                            <div>{comment.user.name}</div>
                            <div>{comment.created_at}</div>
                        </div>
                        {props.auth.user.id === comment.user.id && (
                            <EditMenu target="comment" id={comment.id} />
                        )}
                    </div>
                    <div className="mt-2">{comment.text}</div>
                    <audio
                        className="my-2"
                        ref={(el) => (subAudioRef.current[comment.id] = el)}
                        controls
                        src={
                            storagePath + comment.user_id + "/" + comment.music
                        }
                    ></audio>

                    {playingStates[comment.id] === "stopped" ? (
                        <Button
                            variant="outlined"
                            onClick={() =>
                                handleSession(comment.music_flg, comment.id)
                            }
                            style={{ color: "#eb3495", borderColor: "#eb3495" }}
                        >
                            Session
                        </Button>
                    ) : (
                        <div className="flex">
                            {playingStates[comment.id] === "paused" ? (
                                <div className="mx-3">
                                    <Button
                                        variant="outlined"
                                        onClick={() => handlePlay(comment.id)}
                                        style={{
                                            color: "#eb3495",
                                            borderColor: "#eb3495",
                                        }}
                                    >
                                        Play
                                    </Button>
                                </div>
                            ) : (
                                <div className="mx-3">
                                    <Button
                                        variant="outlined"
                                        onClick={() => handlePause(comment.id)}
                                        style={{
                                            color: "#eb3495",
                                            borderColor: "#eb3495",
                                        }}
                                    >
                                        Pause
                                    </Button>
                                </div>
                            )}
                            <Button
                                variant="outlined"
                                onClick={() => handleStop(comment.id)}
                                style={{
                                    color: "#eb3495",
                                    borderColor: "#eb3495",
                                }}
                            >
                                Stop
                            </Button>
                        </div>
                    )}
                </div>
            ))}
            <div>
                <Modal className="" open={open} onClose={handleModalClose}>
                    <div className="bg-white absolute bottom-0 w-full h-2/3 px-3 overflow-y-scroll">
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="px-3"
                        >
                            <div className="py-3 w-full flex items-center justify-center">
                                <div className="">コメントを書く</div>
                                <div className="mr-3 absolute right-0">
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        type="submit"
                                    >
                                        投稿
                                    </Button>
                                </div>
                            </div>

                            <Typography
                                variant="body1"
                                component="h6"
                                mt={3}
                                gutterBottom
                            >
                                コメント
                            </Typography>
                            <TextField
                                variant="standard"
                                multiline
                                className="text w-full"
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                            />
                            <Typography
                                variant="body1"
                                component="h6"
                                mt={5}
                                gutterBottom
                            >
                                投稿方法
                            </Typography>
                            <RadioGroup
                                defaultValue="record"
                                row
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel
                                    value="record"
                                    control={<Radio />}
                                    label="録音"
                                />
                                <FormControlLabel
                                    value="file"
                                    control={<Radio />}
                                    label="ファイルアップロード"
                                />
                            </RadioGroup>
                            {radio === "record" && (
                                <>
                                    <div className="mt-3">
                                        <audio
                                            controls={true}
                                            src={fileUrl}
                                        ></audio>
                                    </div>
                                    {/* 録音コンポーネント */}
                                    <div className="flex flex-col justify-center items-center z-50 py-8">
                                        <RecButton
                                            type="button"
                                            isRecording={isRecording}
                                            stopCallback={stopRecording}
                                            startCallback={startRecording}
                                        />
                                    </div>
                                </>
                            )}
                            {radio === "file" && (
                                <>
                                    <Typography
                                        variant="body1"
                                        component="h6"
                                        mt={3}
                                        gutterBottom
                                    >
                                        ファイル選択
                                    </Typography>
                                    <MuiFileInput
                                        value={file}
                                        onChange={handleChangeFile}
                                        variant="standard"
                                    />
                                    <br />
                                    <Typography
                                        variant="caption"
                                        component="div"
                                        gutterBottom
                                    >
                                        MP3/WAV ファイルのみ。
                                    </Typography>
                                    {file &&
                                        !(
                                            file.type === "audio/mpeg" ||
                                            file.type === "audio/wav" ||
                                            file.type === "audio/webm"
                                        ) && (
                                            <Typography
                                                variant="caption"
                                                component="div"
                                                color="error.main"
                                                gutterBottom
                                            >
                                                このファイルタイプはサポートしていません。
                                            </Typography>
                                        )}
                                    <div className="mt-3">
                                        <audio
                                            controls={true}
                                            src={fileUrl}
                                        ></audio>
                                    </div>
                                </>
                            )}
                        </Box>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default PlayMusic;
