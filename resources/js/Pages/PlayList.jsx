import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";

const PlayList = (props) => {
    const storagePath = "../storage/audio/";
    const favoriteLists = props.favorite;
    return (
        <div>
            <Header header="お気に入り" />
            <div className="pt-12">
                {favoriteLists.map((favorite, index) => (
                    <div className="mx-3 border-dotted border-b-2 border-gray-400">
                    <div className="my-2 flex items-center">
                        <img
                            className="mr-2 w-12 h-12"
                            style={{ borderRadius: '50%' }}
                            src={`../storage/image/${favorite.user.account.icon}`}
                            alt="アイコン"
                        />
                        <div>
                            <div>{favorite.user.name}</div>
                            <div>{favorite.created_at}</div>
                        </div>
                    </div>

                        <div>{favorite.address}</div>
                        <div>{favorite.story}</div>
                        <audio
                            className="my-2"
                            controls
                            src={
                                storagePath +
                                favorite.user_id +
                                "/" +
                                favorite.music
                            }
                        ></audio>
                        {/* <div className="flex justify-around my-3 mx-3">
                    <IconButton onClick={handleLike}>
                        {props.isLike ? (
                            <FavoriteIcon style={{ color: "#eb3495" }} />
                        ) : (
                            <FavoriteBorderIcon/>
                        )}
                    </IconButton>
                    <IconButton onClick={handleModalOpen}>
                        <LyricsRoundedIcon  />
                    </IconButton>
                </div> */}
                    </div>
                ))}
            </div>
            <SimpleBottomNavigation />
        </div>
    );
};

export default PlayList;
