import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { PageData } from "../Data/PageData";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { useLocation } from "react-router-dom";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

export default function SimpleBottomNavigation(props) {

    // アクセス時のURLを解析して、適切なナビゲーションボタンをアクティブにする。
    const [value, setValue] = useState(window.location.pathname.slice(1));

    const TabBarButton = styled(BottomNavigationAction)({
        color: 'gray',
        '&.Mui-selected': {
          color: '#e26575',
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
                    label="ホーム"
                    icon={<HomeIcon />}
                    onClick={() => router.visit(route("posts.index"),{method:"get"})}
                />
                <TabBarButton
                    value="favoritelist"
                    label="お気に入り"
                    icon={<QueueMusicIcon/>}
                    onClick={() => router.visit(route("like.show"),{method:"get"})}
                />
                <TabBarButton
                    value="account"
                    label="アカウント"
                    icon={<PersonIcon />}
                    onClick={() => router.visit(route("account.show"),{method:"get"})}
                />
            </BottomNavigation>
        </>
    );
}
