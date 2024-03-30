import { Link, useForm } from "@inertiajs/react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const EditMenu = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorEl = useRef(null);
    const { post } = useForm({});

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClose = () => {
        setMenuOpen(false);
    };

    const handleDelete = () => {
        if (props.target === "post") {
            post(route("post.destroy", props.id), {
                onBefore: () => confirm("本当に削除しますか?"),
            });
        } else if (props.target === "comment") {
            post(
                route("comment.destroy", props.id),
                {
                    onBefore: () => confirm("本当に削除しますか?"),
                    onSuccess: () => {
                        props.setPostData(prev => ({...prev, comments_count: prev.comments_count - 1}));
                    }
                }
            );
        }
    };

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <Menu
                id="menu-app-bar"
                anchorEl={anchorEl.current}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={menuOpen}
                onClose={handleClose}
            >
                {/* <MenuItem>
            <Link href="/" underline="none">
                編集
            </Link>
        </MenuItem> */}
                <MenuItem onClick={handleDelete}>
                    {/* <Link href={route('post.destroy', postData.id)} underline="none">
                    削除
                </Link> */}
                    削除
                </MenuItem>
            </Menu>
            <IconButton type="button" ref={anchorEl} onClick={handleMenu}>
                <MoreHorizIcon />
            </IconButton>
        </Box>
    );
};

export default EditMenu;
