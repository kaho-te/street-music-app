import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import { Link } from "@inertiajs/react";
import ModalHeader from "@/Components/ModalHeader";
import Header from "@/Components/Header";

const ResultList = (props) => {
    const storagePath = "../../storage/audio/";
    const resultLists = props.results;
    const search_flg = props.search_flg;
    const category = props.category;
    let search;
    if (search_flg == 1) {
        search = props.search.name;
    }
    return (
        <div>
            {search_flg == 1 ? (
                <ModalHeader header="Search Results" />
            ) : (
                <Header header="Favorite List" />
            )}
            <div className="pt-16">
                {search_flg == 1 && (
                    <div className="mx-4 mt-4 font-bold text-xl text-[#9B1414]  font-serif">
                        {category + " " + search}
                    </div>
                )}
                {resultLists.map((result, index) => (
                    <div
                        className="mx-4 py-4 border-b border-[#D0CDCD]"
                        key={result.id}
                    >
                        <Link
                            href={route("post.show", result.id)}
                            underline="none"
                        >
                            <div className="mt-4 flex items-center">
                                <img
                                    className="mr-2 w-12 h-12"
                                    style={{ borderRadius: "50%" }}
                                    src={`../../storage/image/${result.user.account.icon}`}
                                    alt="アイコン"
                                />
                                <div>
                                    <div className="font-bold">
                                        {result.user.name}
                                    </div>
                                    <div className="text-gray-500">
                                        {result.created_at}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-2">{result.address}</div> */}
                            <div>
                                <div className="mt-2 whitespace-pre-wrap">
                                    {result.story}
                                </div>
                                <div className="flex items-end">
                                    <audio
                                        className="mt-2 mb-4 w-2/3"
                                        controls
                                        controlsList="nodownload"
                                        src={
                                            storagePath +
                                            result.user_id +
                                            "/" +
                                            result.music
                                        }
                                    ></audio>
                                    <div className="flex mt-2 ml-6 mb-4">
                                        <div className="flex items-center">
                                            {result.isLike == 1 ? (
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
                                                {result.liked_count}
                                            </div>
                                        </div>
                                        <div className="flex items-center ml-3">
                                            <img
                                                className="w-8 h-6"
                                                src={`../../storage/image/hHeart_off.png`}
                                                alt="セッション数"
                                            />
                                            <div className="text-base text-[#0000008a]">
                                                {result.comments_count}
                                            </div>
                                        </div>
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

export default ResultList;
