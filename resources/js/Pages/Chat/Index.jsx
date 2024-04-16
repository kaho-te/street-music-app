import { useState, useEffect } from "react";
import ChatMessageHeader from "@/Components/ChatMessageHeader";
import ChatMessageFooter from "@/Components/ChatMessageFooter";
import { useForm } from "@inertiajs/react";
import SendIcon from "@mui/icons-material/Send";
import ModalHeader from "@/Components/ModalHeader";

export default function Index(props) {
    // Data
    const userId = props.auth.user.id;
    const userName = props.auth.user.name;
    const [chatMessages, setChatMessages] = useState([]);
    const { data, setData, post } = useForm({
        message: "",
        r_user_id: props.r_user.id,
    });
    // Methods
    const handleMessageChange = (e) => {
        // メッセージ入力したとき

        const message = e.target.value;
        // setChatMessage(message);
        setData("message", message);
    };
    const handlerSubmit = () => {
        // 送信したとき

        const url = route("chat.store");
        // const data = { message: chatMessage };

        post(url, {
            onSuccess() {
                setData("message", ""); // 成功したらメッセージをリセット
            },
        });
    };
    const getChatMessages = () => {
        // チャットメッセージを取得する

        axios
            .get(route("chat.list", { id: props.r_user.id }))
            .then((response) => {
                const chatMessages = response.data.data;
                setChatMessages(chatMessages);
            });
    };

    // Effects
    useEffect(() => {
        // ページを読み込んだ時

        getChatMessages();

        // ブロードキャスト受信
        Echo.private("chat-message").listen("ChatCreated", (e) => {
            console.log(e);
            getChatMessages(); // ブロードキャスト通知が来たら再読込みする
        });
    }, []);

    const formatDate = (dateString) => {
        // const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ja-JP', options).format(date);
    };

    return (
        <div className="h-screen">
            <ModalHeader header={props.r_user.name} />

            {/* メッセージ部分 */}
            <div className="p-4 pt-20 pb-28 h-full bg-gray-100 overflow-y-auto">
                {chatMessages.length > 0 &&
                    chatMessages.map((chatMessage) => (
                        <div
                            key={chatMessage.id}
                            className={`chat-message ${
                                chatMessage.user.id == userId
                                    ? "sent"
                                    : "received"
                            }`}
                        >
                            <div className="message-content">
                                <div className="message-text">
                                    {chatMessage.message}
                                </div>
                            </div>
                            <div className="message-date">
                                    {formatDate(chatMessage.created_at)}
                                </div>
                        </div>
                        // <div key={chatMessage.id} className="bg-white border mb-2 p-3 rounded">
                        //     <ChatMessageHeader name={chatMessage.user.name} />
                        //     <div className="whitespace-pre mt-2">{chatMessage.message}</div>
                        //     <ChatMessageFooter chatMessage={chatMessage}></ChatMessageFooter>
                        // </div>
                    ))}
                {chatMessages.length === 0 && (
                    <div className="text-center">
                        <div className="text-gray-500">
                            まだメッセージはありません
                        </div>
                    </div>
                )}
            </div>

            {/* フォーム部分 */}
            <div className="py-3 fixed bottom-0 w-full flex bg-white">
                <textarea
                    rows="2"
                    className="block p-2.5 w-full text-sm text-gray-900 border border-gray-400 rounded mx-3"
                    value={data.message}
                    onChange={(e) => handleMessageChange(e)}
                    autoFocus
                />
                <button
                    type="button"
                    className="py-2.5 text-sm font-medium text-center text-white bg-[#e26575] rounded-lg w-1/6 mr-3"
                    onClick={handlerSubmit}
                >
                    <SendIcon style={{ color: "white" }} />
                </button>
            </div>
        </div>
    );
}
