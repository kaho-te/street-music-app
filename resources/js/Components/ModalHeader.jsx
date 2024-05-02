import React from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Box, IconButton } from "@mui/material";

const ModalHeader = (props) => {
    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="fixed z-10 py-3 w-full flex items-center justify-center bg-[#FFF9F6]">
            <Box className="absolute left-0">
                <IconButton type="button" onClick={handleBack}>
                    <NavigateBeforeIcon fontSize="large" style={{ color: '#9B1414' }} />
                </IconButton>
            </Box>

            <img src={`../../storage/image/withmelody_logo.jpeg`} alt="" className="w-10 mr-2"/>
            <div className="text-[#9B1414] font-bold text-xl font-serif">{props.header}</div>
        </div>
    );
};

export default ModalHeader;
