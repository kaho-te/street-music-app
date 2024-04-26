import ModalHeader from "@/Components/ModalHeader";
import React from "react";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
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
    TextareaAutosize,
    Typography,
} from "@mui/material";
import { Link, useForm } from "@inertiajs/react";
import { MuiFileInput } from "mui-file-input";
import { useRef } from "react";
import { useEffect } from "react";
import EditMenu from "@/Components/EditMenu";
import InputLabel from "@/Components/InputLabel";

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
    const [playingState, setPlayingState] = useState(false);
    const { data, setData, post } = useForm({
        text: "",
        music: "",
        music_flg: 0,
        post_id: props.post.id,
        user_id: props.auth.user.id,
    });

    let audioCtx; // Must be initialized after a user interaction
    const offlineCtx = new OfflineAudioContext(2, 44100 * 40, 44100);
    const [song, setSong] = useState(null);
    const [urls, setUrls] = useState([]);
    const [selectedComments, setSelectedComments] = useState([]);

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
            className="rounded-full w-20 h-20 shadow-lg bg-[#f7576b] hover:bg-[#FFB2A9] duration-300 transition drop-shadow-md active:translate-y-3"
            onClick={isRecording ? stopCallback : startCallback}
            type="button"
        >
            {isRecording ? (
                <StopIcon style={{ color: "white" }} fontSize="large" />
            ) : (
                <MicIcon style={{ color: "white" }} fontSize="large" />
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
                // audio: true,
                audio: {
                    autoGainControl: false,
                    echoCancellation: false
                },
                video: false,
            });
            const newRecorder = new RecordRTC(stream.clone(), {
                type: "audio",
                recorderType: StereoAudioRecorder,
                mimeType: "audio/wav",
                autoGainControl: false, // この行を追加
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
                    setPostData((prev) => ({
                        ...prev,
                        liked_count: prev.liked_count - 1,
                    }));
                },
            });
        } else {
            post(route("like.store", postData), {
                onSuccess: () => {
                    setPostData((prev) => ({
                        ...prev,
                        liked_count: prev.liked_count + 1,
                    }));
                },
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
        return new Promise((resolve) => {
            mainAudioRef.current.volume = 0.3;
            mainAudioRef.current.play().then(() => {
                resolve();
            });
        });
    };

    const handleMainStop = () => {
        return new Promise((resolve) => {
            if (mainAudioRef.current) {
                mainAudioRef.current.pause();
                mainAudioRef.current.currentTime = 0;
            }
            resolve();
        });
    };

    const handleSubPlay = (id) => {
        return new Promise((resolve) => {
            subAudioRef.current[id].volume = 0.3;
            subAudioRef.current[id].play().then(() => {
                resolve();
            });
        });
    };

    const handleSubStop = (id) => {
        return new Promise((resolve) => {
            if (subAudioRef.current[id]) {
                subAudioRef.current[id].pause();
                subAudioRef.current[id].currentTime = 0;
            }
            resolve();
        });
    };

    const initializeSession = () => {
        return new Promise((resolve) => {
            setPlayingState(false);
            resolve();
        });
    };

    const handleSession = async (music_flg, comment_id) => {
        try {
            await initializeSession();
            await handleMainStop();
            await handleSubStop(comment_id);

            // await Promise.all([handleSubPlay(comment_id), handleMainPlay()]);
            const targetList = [mainAudioRef.current.src, ...selectedComments.map(id => subAudioRef.current[id].src)];
            console.log(targetList);

            // We can initialize the context as the user clicked.
            audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
          
            // Fetch the data and start the song
            getData(targetList);

            setPlayingState(true);
        } catch (e) {
            console.log(e);
        }
    };

    async function getData(targetList) {
      // Fetch an audio track, decode it and stick it in a buffer.
      // Then we put the buffer into the source and can play it.
      const buffers = await Promise.all(targetList.map(async (url) => {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return audioCtx.decodeAudioData(arrayBuffer);
    }));

    buffers.forEach((buffer, index) => {
        const source = offlineCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(offlineCtx.destination);
        source.start();
    });

      // Start rendering
      const renderedBuffer = await offlineCtx.startRendering();

      // Play the rendered buffer
      const song = new AudioBufferSourceNode(audioCtx, { buffer: renderedBuffer });
      song.connect(audioCtx.destination);
      song.start();
      setSong(song);
    }


    // const handlePlay = (comment_id) => {
    //     handleMainPlay();
    //     handleSubPlay(comment_id);
    //     setPlayingStates((prevStates) => ({
    //         ...prevStates,
    //         [comment_id]: "playing",
    //     }));
    // };

    const handleStop = () => {
        if (song) {
            song.stop();
            setSong(null);
        }
        audioCtx = new (window.AudioContext ||
            window.webkitAudioContext)();
        setPlayingState(false);
    };

    // const handlePause = (comment_id) => {
    //     mainAudioRef.current.pause();
    //     subAudioRef.current[comment_id].pause();
    //     setPlayingStates((prevStates) => ({
    //         ...prevStates,
    //         [comment_id]: "paused",
    //     }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFile();
        setFileUrl();
        setOpen(false);

        post(route("comment.store"), {
            onSuccess: (response) => {
                setComments(response.props.post.comments);
                setPostData((prev) => ({
                    ...prev,
                    comments_count: prev.comments_count + 1,
                }));
            },
        });
    };

    const handleCommentSelect = (commentId) => {
        setSelectedComments((prevSelectedComments) => {
            if (prevSelectedComments.includes(commentId)) {
                // 既に選択されている場合は削除
                return prevSelectedComments.filter(id => id !== commentId);
            } else {
                // 選択されていない場合は追加
                return [...prevSelectedComments, commentId];
            }
        });
    };


    async function fetchAndDecodeAudio(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return audioContext.decodeAudioData(arrayBuffer);
    }

    return (
        <div className="text-gray-800">
            <ModalHeader header="再生" />
            <div className="mx-4 pt-12 border-dotted border-b-2 border-gray-400">
                <div className="flex items-center mt-4">
                    <Link
                        className="flex items-center"
                        href={route("account.others", { id: postData.user.id })}
                    >
                        <img
                            className="mr-2 w-12 h-12"
                            style={{ borderRadius: "50%" }}
                            src={`../storage/image/${postData.user.account.icon}`}
                            alt="アイコン"
                        />
                        <div>
                            <div className="font-bold">
                                {postData.user.name}
                            </div>
                            <div className="text-gray-500">
                                {postData.created_at}
                            </div>
                        </div>
                    </Link>
                    {props.auth.user.id === postData.user.id && (
                        <EditMenu
                            target="post"
                            id={postData.id}
                            postData={postData}
                            setPostData={setPostData}
                        />
                    )}
                </div>

                <div className="mt-2 text-gray-500">{postData.address}</div>
                <div className="mt-2 whitespace-pre-wrap">{postData.story}</div>
                <audio
                    id="main"
                    ref={mainAudioRef}
                    controls
                    src={storagePath + postData.user_id + "/" + postData.music}
                    className="mt-2 mx-auto"
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
                        <MusicNoteIcon />
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
                    <div className="mt-2 flex">
                        <Link
                            className="items-center align-top mr-2"
                            href={route("account.others", {
                                id: comment.user_id,
                            })}
                        >
                            <img
                                className="mr-2 w-12 h-12 "
                                style={{ borderRadius: "50%" }}
                                src={`../storage/image/${comment.user.account.icon}`}
                                alt="アイコン"
                            />
                        </Link>
                        <div className="w-full">
                            <div className="flex">
                                <div>
                                    <div className="font-bold">
                                        {comment.user.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {comment.created_at}
                                    </div>
                                </div>
                                {props.auth.user.id === comment.user.id && (
                                    <div className="ml-auto">
                                        <EditMenu
                                            target="comment"
                                            id={comment.id}
                                            postData={postData}
                                            setPostData={setPostData}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-2">{comment.text}</div>
                        </div>
                    </div>
                    
                    <input
            type="checkbox"
            checked={selectedComments.includes(comment.id)}
            onChange={() => handleCommentSelect(comment.id)}
        />

                    <audio
                        className="my-3 mx-auto"
                        ref={(el) => (subAudioRef.current[comment.id] = el)}
                        controls
                        src={
                            storagePath + comment.user_id + "/" + comment.music
                        }
                    ></audio>
                    <div className="text-center w-full">
 
                    </div>
                </div>
            ))}
                         {playingState === false ? (
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    handleSession()
                                }
                                style={{
                                    color: "#f7576b",
                                    borderColor: "#f7576b",
                                }}
                            >
                                Session
                            </Button>
                        ) : (
                            <div className="mx-auto">
                                <Button
                                    variant="outlined"
                                    onClick={() => handleStop()}
                                    style={{
                                        color: "#f7576b",
                                        borderColor: "#f7576b",
                                        marginLeft: "12px",
                                    }}
                                >
                                    Stop
                                </Button>
                            </div>
                        )}

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
                                <div className="">セッション</div>
                                <div className="mr-3 absolute right-0">
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        type="submit"
                                        style={{
                                            color: "#f7576b",
                                            borderColor: "#f7576b",
                                        }}
                                    >
                                        投稿
                                    </Button>
                                </div>
                            </div>

                            <InputLabel
                                htmlFor="comment"
                                value="コメント"
                                className="mt-8 text-lg"
                            />
                            <TextareaAutosize
                                id="comment"
                                minRows={3}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.story}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="comment"
                            />

                            <InputLabel
                                htmlFor="post"
                                value="投稿方法"
                                className="mt-8 text-lg"
                            />
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
                                    <InputLabel
                                        htmlFor="file"
                                        value="ファイル選択"
                                        className="mt-8 text-lg"
                                    />
                                    <MuiFileInput
                                        value={file}
                                        onChange={handleChangeFile}
                                        variant="standard"
                                        className="w-full"
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
