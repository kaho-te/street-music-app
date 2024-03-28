import React from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Box, Button, IconButton } from "@mui/material";

const ModalHeader = (props) => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="fixed top-0 py-3 w-full flex items-center justify-center bg-pink-200 z-10">
            <Box className="absolute left-0">
                <IconButton type="button" onClick={handleBack}>
                    <NavigateBeforeIcon fontSize="large" />
                </IconButton>
            </Box>

            <div className="">{props.header}</div>
            {props.header === "音楽を設置する" && (
                <div className="mr-3 absolute right-0">
                    <Button type={"submit"} variant="outlined" color="inherit">
                        登録
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ModalHeader;
