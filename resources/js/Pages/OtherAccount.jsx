import React from "react";
import { Box, Button } from "@mui/material";
import { Link, router, usePage } from "@inertiajs/react";
import ModalHeader from "@/Components/ModalHeader";
import { useState } from "react";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

const OtherAccount = (props) => {
    const user = props.account;
    const account = props.account.account;
    const storagePath = "../storage/audio/";
    const [posts, setPosts] = useState(props.posts);

    const handleLike = (post) => {
        if (post.isLike==1) {
            post(route("like.destroy", post), {
                preserveScroll: true,
                onSuccess: () => {
                    // setPosts((prev) => ({
                    //     ...prev,
                    //     liked_count: prev.liked_count - 1,
                    // }));
                },
            });
        } else {
            post(route("like.store", post), {
                onSuccess: () => {
                    // setPostData((prev) => ({
                    //     ...prev,
                    //     liked_count: prev.liked_count + 1,
                    // }));
                },
            });
        }
    };

    return (
        <div>
            <ModalHeader header="プロフィール" />
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
                            <th className="text-left w-28 py-3">
                                プロフィール
                            </th>
                            <td className="whitespace-pre-wrap">
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
                    <div className="w-1/3 py-3">いいね</div>
                </div>
                {posts.map((post, index) => (
                    <div
                        className="mx-4 border-dotted border-b-2 border-gray-400"
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

                            <div className="mt-2">{post.address}</div>
                            <div className="mt-2">{post.story}</div>
                            <audio
                                className="mt-2 mb-4 mx-auto"
                                controls
                                src={
                                    storagePath +
                                    post.user_id +
                                    "/" +
                                    post.music
                                }
                            ></audio>
                            <div className="flex justify-around mt-2 ml-2 mr-8">
                                <IconButton type="button" onClick={() => handleLike(post)}>
                                    {post.isLike == 1 ? (
                                        <FavoriteIcon
                                            style={{ color: "#eb3495" }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                    <div className="ml-1 text-lg">
                                        {post.liked_count}
                                    </div>
                                </IconButton>

                                <IconButton
                                    type="button"
                                    // onClick={handleModalOpen}
                                >
                                    <LyricsRoundedIcon />
                                    <div className="ml-1 text-lg">
                                        {post.comments_count}
                                    </div>
                                </IconButton>
                            </div>
                        </Link>
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default OtherAccount;
