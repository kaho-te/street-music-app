import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";
import { Box } from "@mui/material";
import { Link } from "@inertiajs/react";

const Account = () => {
    return (
        <div>
            <Header header="アカウント" />
            <Box className="mx-3 pt-12">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="mt-3"
                >
                    ログアウト
                </Link>
            </Box>

            <SimpleBottomNavigation />
        </div>
    );
};

export default Account;
