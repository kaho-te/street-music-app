import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";
import { Link } from "@inertiajs/react";
import AddIcon from "@mui/icons-material/Add";
import { router } from "@inertiajs/react";

const Home = (props) => {
    const storagePath = "../storage/audio/";
    const posts = props.posts;
    const instruments = props.instruments;
    const genres = props.genres;

    function handleAddPost() {
        router.get(route("posts.create"));
    }

    return (
        <div>
            <Header header="With Melody" />
            <div className="pt-20 h-screen">
                {/* 楽器を選ぶ */}
                <div className="mx-4 mb-4 font-bold text-xl text-[#9B1414] font-serif">
                    Instrument
                </div>
                <div className="flex overflow-x-auto w-full">
                    {instruments.map((inst, index) => (
                        <Link
                            href={route("post.search", {
                                categoryId: 1,
                                searchId: inst.id,
                            })}
                            underline="none"
                            key={inst.id}
                        >
                            <div className="flex-shrink-0 mx-2 w-52 h-32 rounded-xl shadow-md">
                                <img
                                    src={`../storage/image/${inst.img}`}
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                />
                            </div>
                            <div className="ml-4 mb-2 font-serif">
                                {inst.name}
                            </div>
                        </Link>
                    ))}
                    <div
                        className="flex-shrink-0 mx-2 w-52 h-32 rounded-xl bg-[#D0B8C4] shadow-md flex flex-col justify-center items-center"
                        onClick={handleAddPost}
                    >
                        <div
                            style={{
                                borderRadius: 50,
                                minWidth: 48,
                                width: 48,
                                height: 48,
                                background: "#F7DFDF",
                                // boxShadow: "0px 3px 7px 0px #9E9E9E",
                            }}
                            className="add-button mx-auto mt-4 flex justify-center items-center"
                            onClick={handleAddPost}
                        >
                            <AddIcon
                                style={{ fontSize: 28, color: "#261818" }}
                            />
                        </div>
                        <div className="text-[#261818] mt-2">
                            音楽を投稿しよう
                        </div>
                    </div>
                </div>
                {/* ジャンルを選ぶ */}
                <div className="mx-4 mt-6 mb-4 font-bold text-xl text-[#9B1414] font-serif">
                    Genre
                </div>
                <div className="flex overflow-x-auto w-full">
                    {genres.map((genre, index) => (
                        <Link
                            href={route("post.search", {
                                categoryId: 2,
                                searchId: genre.id,
                            })}
                            underline="none"
                            key={genre.id}
                        >
                            <div key={genre.id}>
                                <div className="flex-shrink-0 mx-2 w-32 h-36 rounded-xl shadow-md">
                                    <img
                                        src={`../storage/image/${genre.img}`}
                                        alt=""
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                </div>
                                <div className="ml-4 mb-2 font-serif">
                                    {genre.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="pb-8">
                    <div className="mx-4 mt-6 font-bold text-xl text-[#9B1414] font-serif">
                        pickup
                    </div>
                    {posts.map((post, index) => (
                        <div
                            className="mx-4 py-4 border-b border-[#D0CDCD]"
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
                                        {/* <div className="font-bold">
                                        {post.user.name}
                                    </div> */}
                                        <div className="text-gray-500">
                                            {post.created_at}
                                        </div>
                                        <div className="mt-2 whitespace-pre-wrap">
                                            {post.story}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="mt-2">{post.address}</div> */}
                                {/* <div className="flex mt-3">
                                {post.instrument && (                                  
                                        <div>{post.instrument.name}</div>
                                )}
                                {post.genre && (                                  
                                        <div className="ml-3">{post.genre.name}</div>
                                )}
                            </div> */}
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
                                            {/* <FavoriteBorderIcon /> */}
                                            <img
                                                className="w-8"
                                                src={`../storage/image/star_off.png`}
                                                alt="お気に入り"
                                            />
                                            <div className="text-base text-[#0000008a]">
                                                {post.liked_count}
                                            </div>
                                        </div>

                                        <div className="flex items-center ml-3">
                                            {/* <MusicNoteIcon /> */}
                                            <img
                                                className="w-8 h-6"
                                                src={`../storage/image/hHeart_off.png`}
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
                </div>
                {/* リクエスト楽器を選ぶ */}
                <div className="mx-4 mb-4 font-bold text-xl text-[#9B1414] font-serif">
                    Request
                </div>
                <div className="flex overflow-x-auto w-full pb-20">
                    {instruments.map((inst, index) => (
                        <Link
                            href={route("post.search", {
                                categoryId: 3,
                                searchId: inst.id,
                            })}
                            underline="none"
                            key={inst.id}
                        >
                            <div className="flex-shrink-0 mx-2 w-52 h-32 rounded-xl shadow-md">
                                <img
                                    src={`../storage/image/${inst.img}`}
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                />
                            </div>
                            <div className="ml-4 mb-2 font-serif">
                                {inst.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <SimpleBottomNavigation />
        </div>
    );
};

export default Home;
