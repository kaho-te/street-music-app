import SimpleBottomNavigation from "@/Components/BottomNavigation";
import React from "react";
import Header from "@/Components/Header";
import { Box, Button } from "@mui/material";
import { Link, router, usePage } from "@inertiajs/react";

const Account = () => {
    const auth = usePage().props.auth;
    const user = auth.user;

    return (
        <div>
            <Header header="Account" />
            <Box className="mx-3 pt-12">
                <div className="text-center">
                    <img
                        className="mx-auto my-3 w-32"
                        style={{ borderRadius: "50%" }}
                        src={`../storage/image/${user.account.icon}`}
                    />
                    <Button
                        variant="outlined"
                        onClick={() =>
                            router.visit(route("profile.edit"), {
                                method: "get",
                            })
                        }
                        style={{
                            color: "#f7576b",
                            borderColor: "#f7576b",
                        }}
                    >
                        プロフィールを編集
                    </Button>
                </div>
                <table className="mt-5">
                    <tbody>
                        <tr className="">
                            <th className="text-left w-28 py-3">名前</th>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <th className="text-left w-28 py-3">Email</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th className="text-left align-top w-28 py-3">
                                プロフィール
                            </th>
                            <td className="whitespace-pre-wrap py-3">{user.account.profile}</td>
                        </tr>
                    </tbody>
                </table>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="mt-8 font-bold"
                    style={{
                        color: "#f7576b",
                    }}
                >
                    ログアウト
                </Link>
            </Box>

            <SimpleBottomNavigation />
        </div>
    );
};

export default Account;
