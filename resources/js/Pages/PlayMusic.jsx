import ModalHeader from "@/Components/ModalHeader";
import React from "react";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
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
    const postData = props.post;
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");
    const [recordings, setRecordings] = useState([]);
    const [radio, setRadio] = useState("record");
    const [address, setAddress] = useState();
    const [comments, setComments] = useState([]);

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState();
    const [open, setOpen] = useState(false);
    const { data, setData, post } = useForm({
        text: "",
        music: "",
        post_id: props.post.id,
        user_id: props.auth.user.id,
    });

    useEffect(() => {
        setComments(props.post.comments);
    }, [comments]);


    const mainAudioRef = useRef(null);
    const subAudioRef = useRef(null);

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
        handleMainPause();
        if (recorder) {
            recorder.stopRecording(() => {
                // console.log(recorder);
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
            post(route("like.destroy", props.post), { preserveScroll: true });
        } else {
            post(route("like.store", props.post));
        }
    };

    const handleRadioChange = (e) => {
        setRadio(e.target.value);
    };

    const handleMainPlay = () => {
        mainAudioRef.current.volume = 0.3;
        mainAudioRef.current.play();
    };

    const handleMainPause = () => {
        mainAudioRef.current.pause();
        mainAudioRef.current.currentTime = 0;
    };

    const handleSubPlay = () => {
        subAudioRef.current.volume = 0.3;
        subAudioRef.current.play();
    };

    const handleSubPause = () => {
        subAudioRef.current.pause();
        subAudioRef.current.currentTime = 0;
    };

    const handleSession = () => {
        // console.log("再生");
        handleSubPlay();
        setTimeout(() => {
            handleMainPlay();
        }, 100); 
        
        // document.querySelectorAll('audio').forEach(audio => {
        //     audio.play();
        // });

    }

    const handleSubmit = (e) => {
        console.log("コメント投稿");
        e.preventDefault();
        setFile();
        setFileUrl();
        setOpen(false);

        post(route("comment.store"));
    };

    return (
        <div>
            <ModalHeader header="再生" />
            <div className="mx-3 pt-12 border-dotted border-b-2 border-gray-400">
                <div className="flex items-center mt-2">
                <img
                    className="mr-2 w-12 h-12"
                    style={{ borderRadius: '50%' }}
                    src={`../storage/image/${props.post.user.account.icon}`}
                    alt="アイコン"
                />
                    <div>
                        <div>{postData.user.name}</div>
                        <div>{postData.created_at}</div>
                    </div>
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
                <div className="flex justify-around my-3 mx-3">
                    <IconButton type="button" onClick={handleLike}>
                        {props.isLike ? (
                            <FavoriteIcon style={{ color: "#eb3495" }} />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                    <IconButton type="button" onClick={handleModalOpen}>
                        <LyricsRoundedIcon />
                    </IconButton>
                </div>
            </div>
            {comments.map((comment, index) => (
            <div key={index} className="mx-3 py-3 border-dotted border-b-2 border-gray-400">
                <div className="mt-2 flex items-center">
                    <img
                        className="mr-2 w-12 h-12"
                        style={{ borderRadius: '50%' }}
                        src={`../storage/image/${comment.user.account.icon}`}
                        alt="アイコン"
                    />
                    <div>
                        <div>{comment.user.name}</div>
                        <div>{comment.created_at}</div>
                    </div>
                </div>
                <div className="mt-2">{comment.text}</div>
                <audio
                    className="my-2"
                    ref={subAudioRef}
                    controls
                    src={storagePath + comment.user_id + "/" + comment.music}
                ></audio>
                <Button variant="outlined" onClick={handleSession} style={{ color: "#eb3495", borderColor: "#eb3495" }} >Session</Button>
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
