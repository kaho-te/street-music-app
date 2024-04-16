import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { Link, useForm, usePage } from "@inertiajs/react";
import ModalHeader from "@/Components/ModalHeader";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const getCurrentDate = (props) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();
    return `${year}${month}${date}${hour}${minute}${seconds}`;
};

const AddMusic = (props) => {
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");
    const [recordings, setRecordings] = useState([]);
    const [radio, setRadio] = useState("record");

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState();

    const { data, setData, post } = useForm({
        // id: "",
        // name: "",
        // icon: "",
        story: "",
        music: "",
        post_code: "",
        address: "",
        latitude: props.position.lat,
        longitude: props.position.lng,
    });

    const apiKey = usePage().props.settings.map_api_key;

    const handleChangeFile = (newfile) => {
        // file を参照するための一時的なURLを作成
        setFile(newfile);
        const url = URL.createObjectURL(newfile);

        setFileUrl(url);
        setData("music", newfile);
        // console.log("setFile");
    };

    // 録音
    const RecButton = ({ isRecording, stopCallback, startCallback }) => (
        <button
            className="rounded-full w-20 h-20 shadow-lg bg-[#e26575] hover:bg-[#f0b5bd] duration-300 transition drop-shadow-md active:translate-y-3"
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
                audio: true,
                video: false,
            });
            const newRecorder = new RecordRTC(stream.clone(), {
                type: "audio",
                recorderType: StereoAudioRecorder,
                mimeType: "audio/wav",
                autoGainControl: false,
            });
            newRecorder.startRecording();
            setRecorder(newRecorder);
            setIsRecording(true);

            // onStart();
        } catch (err) {
            if (err instanceof Error) {
                setError("録音の開始に失敗しました: " + err.message);
            }
        }
    };

    // 録音の停止
    const stopRecording = () => {
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

    // コンポーネントのアンマウント時にリソースを解放
    useEffect(() => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}&key=${apiKey}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.results.length > 0) {
                    const address = data.results[0].formatted_address;
                    setData("address", address);
                    // console.log(address); // 逆ジオコーディングの結果として取得した住所
                } else {
                    console.log("No results found");
                }
            })
            .catch((error) => {
                console.log("Error:", error);
            });
        return () => {
            if (recorder) {
                recorder.destroy();
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFile();
        setFileUrl();
        post(route("posts.store"));
    };

    const handleRadioChange = (e) => {
        setRadio(e.target.value);
    };

    return (
        <>
            <Box
                component="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ModalHeader header="音楽を投稿する" />
                <div className="px-3 pt-12">
                    <InputLabel
                        htmlFor="address"
                        value="設置場所"
                        className="mt-8 text-lg"
                    />
                    <TextareaAutosize
                        id="address"
                        minRows={3}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        required
                        isFocused
                        autoComplete="address"
                    />
                    <InputLabel
                        htmlFor="story"
                        value="ストーリー"
                        className="mt-8 text-lg"
                    />
                    <TextareaAutosize
                        id="story"
                        minRows={3}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.story}
                        onChange={(e) => setData("story", e.target.value)}
                        required
                        isFocused
                        autoComplete="story"
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
                            {/* 録音コンポーネント */}
                            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center z-50 w-375 py-16">
                                <RecButton
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
                                required
                                className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
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
                        </>
                    )}

                    <div className="mt-3">
                        <audio controls={true} src={fileUrl}></audio>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default AddMusic;
