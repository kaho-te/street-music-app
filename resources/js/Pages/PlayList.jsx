import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";
import { Link } from "@inertiajs/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const PlayList = (props) => {
    const storagePath = "../storage/audio/";
    const favoriteLists = props.favorite;
    return (
        <div>
            <Header header="Favorite List" />
            <div className="pt-12">
                {favoriteLists.map((favorite, index) => (
                    <div
                        className="mx-4  border-b border-[#D0CDCD]"
                        key={favorite.id}
                    >
                        <Link
                            href={route("post.show", favorite.id)}
                            underline="none"
                        >
                            <div className="mt-4 flex items-center">
                                <img
                                    className="mr-2 w-12 h-12"
                                    style={{ borderRadius: "50%" }}
                                    src={`../storage/image/${favorite.user.account.icon}`}
                                    alt="アイコン"
                                />
                                <div>
                                    <div className="font-bold">
                                        {favorite.user.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {favorite.created_at}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-2">{favorite.address}</div> */}
                            <div className="mt-2 whitespace-pre-wrap">
                                {favorite.story}
                            </div>
                            <div className="flex items-end">
                                <audio
                                    className="mt-2 mb-4 w-2/3"
                                    controls
                                    controlsList="nodownload"
                                    src={
                                        storagePath +
                                        favorite.user_id +
                                        "/" +
                                        favorite.music
                                    }
                                ></audio>
                                <div className="flex mt-2 ml-2 mb-4">
                                    {props.isLike ? (
                                        <FavoriteIcon
                                            style={{ color: "#eb3495" }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon />
                                    )}
                                    <div className="ml-1 text-lg">
                                        {favorite.liked_count}
                                    </div>

                                    <MusicNoteIcon />
                                    <div className="ml-1 text-lg">
                                        {favorite.comments_count}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <SimpleBottomNavigation />
        </div>
    );
};

export default PlayList;
