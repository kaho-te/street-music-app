import React from "react";
import { Box, Button } from "@mui/material";
import { Link, router } from "@inertiajs/react";
import ModalHeader from "@/Components/ModalHeader";
import { useState } from "react";

const OtherAccount = (props) => {
    const user = props.account;
    const account = props.account.account;
    const storagePath = "../storage/audio/";
    const [posts, setPosts] = useState(props.posts);

    return (
        <div>
            <ModalHeader header="Profile" />
            <Box className="mx-3 pt-12">
                <div className="text-center">
                    <img
                        className="mx-auto my-3 w-32"
                        style={{ borderRadius: "50%" }}
                        src={`../storage/image/${account.icon}`}
                    />
                    <Button
                        variant="outlined"
                        onClick={() =>
                            router.visit(route("chat.index", user.id), {
                                method: "get",
                            })
                        }
                        style={{
                            color: "#f7576b",
                            borderColor: "#f7576b",
                        }}
                    >
                        メッセージを送る
                    </Button>
                </div>
                <table className="mt-5">
                    <tbody>
                        <tr className="">
                            <th className="text-left w-28 py-3">名前</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th className="text-left align-top w-28 py-3">
                                プロフィール
                            </th>
                            <td className="whitespace-pre-wrap py-3">
                                {account.profile}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <Box className="mt-8">
                <div className="flex justify-around font-bold text-center border-b-2 border-gray-200">
                    <div className="w-1/3 py-3 border-b-2 border-red-400">
                        投稿
                    </div>
                    <div className="w-1/3 py-3">お気に入り</div>
                </div>
                {posts.map((post, index) => (
                    <div
                        className="mx-4 border-b border-[#D0CDCD]"
                        key={post.id}
                    >
                        <Link
                            href={route("post.show", post.id)}
                            underline="none"
                        >
                            <div className="mt-4 flex items-center">
                                <img
                                    className="mr-2 w-12 h-12"
                                    style={{ borderRadius: "50%" }}
                                    src={`../storage/image/${post.user.account.icon}`}
                                    alt="アイコン"
                                />
                                <div>
                                    <div className="font-bold">
                                        {post.user.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {post.created_at}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-2">{post.address}</div> */}
                            <div className="mt-2 whitespace-pre-wrap">
                                {post.story}
                            </div>
                            <div className="flex items-end">
                                <audio
                                    className="mt-2 mb-4 w-2/3"
                                    controls
                                    controlsList="nodownload"
                                    src={
                                        storagePath +
                                        post.user_id +
                                        "/" +
                                        post.music
                                    }
                                ></audio>
                                <div className="flex mt-2 ml-4 mb-4">
                                        <div className="flex items-center">
                                            {post.isLike == 1 ? (
                                                <img
                                                    className="w-8"
                                                    src={`../../storage/image/star_on.png`}
                                                    alt="お気に入り"
                                                />
                                            ) : (
                                                <img
                                                    className="w-8"
                                                    src={`../../storage/image/star_off.png`}
                                                    alt="お気に入り"
                                                />
                                            )}
                                            <div className="text-base text-[#0000008a]">
                                                {post.liked_count}
                                            </div>
                                        </div>
                                        <div className="flex items-center ml-3">
                                            <img
                                                className="w-8 h-6"
                                                src={`../../storage/image/hHeart_off.png`}
                                                alt="セッション数"
                                            />
                                            <div className="text-base text-[#0000008a]">
                                                {post.comments_count}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default OtherAccount;
