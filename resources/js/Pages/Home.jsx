import React, { useEffect, useRef, useState } from "react";
import "../../css/app.css";
import {
    GoogleMap,
    LoadScript,
    Marker,
} from "@react-google-maps/api";
import SimpleBottomNavigation from "../Components/BottomNavigation";
import { Button, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { router, usePage } from "@inertiajs/react";
import AddMusic from "./AddMusic";
import Header from "@/Components/Header";

const Home = (props) => {
    const containerStyle = {
        width: "100%",
        height: "100vh",
    };

    const options = {
        disableDefaultUI: true,
    };

    const [marker, setMarker] = useState(null);

    const [isAvailable, setAvailable] = useState(false);
    const [position, setPosition] = useState(null);

    // useEffectが実行されているかどうかを判定
    const isFirstRef = useRef(true);

    // 星形のアイコンを作成
    const icon = {
        url: "https://maps.google.com/mapfiles/kml/pal4/icon47.png", // 現在地アイコンのURL
    };

    const apiKey = usePage().props.settings.map_api_key;
    /*
     * ページ描画時にGeolocation APIが使えるかどうかをチェックしています
     * もし使えなければその旨のエラーメッセージを表示させます
     */
    useEffect(() => {
        isFirstRef.current = false;
        if ("geolocation" in navigator) {
            setAvailable(true);
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ lat: latitude, lng: longitude });
        });
    }, [isFirstRef]);


    function handleMapClick(event) {
        setMarker({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        });
    }

    function handleAddMusic() {
        router.get(route("posts.create", position));
    }

    const handleMarkerClick = (post) => {
        // router.visit(route("playmusic", post.id));
        router.get(route('post.show', post.id));
    }

    return (
        <>
        <Header header="音楽MAP"/>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    center={position}
                    zoom={17}
                    options={options}
                    mapContainerStyle={containerStyle}
                    // onClick={handleMapClick}
                >
                    {/* <Marker
                        icon={icon}
                        position={position}
                    /> */}

                    {props.posts.map((post, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: Number(post.latitude),
                                lng: Number(post.longitude),
                            }}
                            onClick={() => handleMarkerClick(post)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <SimpleBottomNavigation />
            <Button
                style={{
                    borderRadius: 50,
                    minWidth: 50,
                    width: 50,
                    height: 50,
                    position: "fixed",
                    bottom: 70,
                    right: 30,
                    background: "white",
                    boxShadow: "0px 3px 7px 0px #9E9E9E",
                }}
                className="add-button"
                onClick={handleAddMusic}
            >
                <AddIcon style={{ fontSize: 28 }} className="text-primary" />
            </Button>
        </>
    );
};

export default Home;
