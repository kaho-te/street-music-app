import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";
import { Link } from "@inertiajs/react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { router } from "@inertiajs/react";

const Timeline = (props) => {
    console.log(props);
    const storagePath = "../storage/audio/";
    const posts = props.posts;

    function handleAddPost() {
        router.get(route("posts.create"));
    }

    return (
        <div>
            <Header header="ホーム" />
            <div className="pt-12">
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

                            {/* <div className="mt-2">{post.address}</div> */}
                            <div className="flex mt-3">
                                {post.instrument && (                                  
                                        <div>{post.instrument.name}</div>
                                )}
                                {post.genre && (                                  
                                        <div className="ml-3">{post.genre.name}</div>
                                )}
                            </div>
                            <div className="mt-2 whitespace-pre-wrap">{post.story}</div>
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
                        </Link>
                    </div>
                ))}
            </div>
            <SimpleBottomNavigation />
            <Button
                style={{
                    borderRadius: 50,
                    minWidth: 50,
                    width: 50,
                    height: 50,
                    position: "fixed",
                    bottom: 70,
                    right: 30,
                    background: "white",
                    boxShadow: "0px 3px 7px 0px #9E9E9E",
                }}
                className="add-button"
                onClick={handleAddPost}
            >
                <AddIcon style={{ fontSize: 28, color: "#e26575" }} />
            </Button>
        </div>
    );
};

export default Timeline;
