import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";
import { Box } from "@mui/material";
import { Link, usePage } from "@inertiajs/react";

const Account = () => {
    const auth = usePage().props.auth;
    const user = auth.user;

    return (
        <div>
            <Header header="アカウント" />
            <Box className="mx-3 pt-12">
                <div className="text-center">
                    <img
                        className="mx-auto my-3 w-32"
                        style={{ borderRadius: "50%" }}
                        src={`../storage/image/${user.account.icon}`}
                    />
                    <Link href={route("profile.edit")}>
                        プロフィールを編集する
                    </Link>
                </div>
                <table className="mt-5">
                    <tbody>
                        <tr>
                            <th className="text-left w-28">名前</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th className="text-left w-28">Email</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th className="text-left w-28">プロフィール</th>
                            <td>{user.account.profile}</td>
                        </tr>
                    </tbody>
                </table>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="mt-8"
                >
                    ログアウト
                </Link>
            </Box>

            <SimpleBottomNavigation />
        </div>
    );
};

export default Account;
