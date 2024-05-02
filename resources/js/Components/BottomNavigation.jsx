import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { router } from "@inertiajs/react";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import MapIcon from '@mui/icons-material/Map';

export default function SimpleBottomNavigation(props) {
    // アクセス時のURLを解析して、適切なナビゲーションボタンをアクティブにする。
    const [value, setValue] = useState(window.location.pathname.slice(1));

    const TabBarButton = styled(BottomNavigationAction)({
        color: "gray",
        backgroundColor: "#FFF9F6",
        "&.Mui-selected": {
            color: "#e26575",
        },
    });

    return (
        <>
            <BottomNavigation
                value={value}
                onChange={async (event, newValue) => {
                    setValue(newValue);
                }}
                showLabels={true}
                className="fixed left-0 bottom-0 w-full"
            >
                <TabBarButton
                    value="posts"
                    label="Home"
                    icon={<HomeIcon />}
                    onClick={() =>
                        router.visit(route("posts.index"), { method: "get" })
                    }
                />
                <TabBarButton
                    value="favoritelist"
                    label="Favorite"
                    icon={<QueueMusicIcon />}
                    onClick={() =>
                        router.visit(route("like.show"), { method: "get" })
                    }
                />
                {/* <TabBarButton
                    value="chat"
                    label="メッセージ"
                    icon={<MailOutlineIcon />}
                    onClick={() =>
                        // router.visit(route("chat.index"), { method: "get" })
                        console.log("メッセージ")
                    }
                /> */}
                <TabBarButton
                    value="account"
                    label="Account"
                    icon={<PersonIcon />}
                    onClick={() =>
                        router.visit(route("account.show"), { method: "get" })
                    }
                />
                {/* <TabBarButton
                    value="streetmap"
                    label="MAP"
                    icon={<MapIcon />}
                    onClick={() =>
                        router.visit(route("post.map"), { method: "get" })
                    }
                /> */}
            </BottomNavigation>
        </>
    );
}
