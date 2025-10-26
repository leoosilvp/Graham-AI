import React, { useRef, useState, useCallback } from "react";
import logo from "../assets/img/icon-light.svg";
import MoveElement from "./MoveElement";
import NewChat from "./NewChat";
import CardsChat from "./CardsChat";
import "../css/aside.css";
import Search from "./Search";
import ConfProfile from "./ConfProfile";
import Library from "./Library";
import ChangeModel from "./ChangeModel";
import { useUser } from "../hooks/useUser";
import { useOutsideClick } from "../hooks/useOutsideClick";

function Aside() {
    const boxRef = useRef(null);
    const confRef = useRef(null);

    const handleMove = MoveElement ? MoveElement(boxRef) : () => { };

    const { user, setUser } = useUser();

    const [showConf, setShowConf] = useState(false);

    const toggleConf = useCallback(() => {
        setShowConf((prev) => !prev);
    }, []);

    useOutsideClick(confRef, () => {
        if (showConf) setShowConf(false);
    }, showConf);

    const handleUpdateAvatar = useCallback((avatarUrl) => {
        setUser((prev) => ({ ...prev, avatar: avatarUrl }));
    }, [setUser]);

    return (
        <div className="hero-aside">
            <aside ref={boxRef}>
                <section className="header-aside">
                    <a href="" className="aside-logo" title="GrahamAI">
                        <img className="logo" src={logo} alt="logo" />
                    </a>

                    <ChangeModel />
                </section>

                <NewChat />

                <Library />

                <Search />

                <CardsChat />

                <section className="ctn-profile">
                    <div className="profile">
                        <img src={user.avatar} alt={`${user.name || "User"} avatar`} />
                        <div className="info-profile">
                            <h1>{user.name || "User"}</h1>
                            <p>BASIC</p>
                        </div>
                    </div>
                    <i onClick={toggleConf} className="fa-solid fa-ellipsis"></i>
                </section>
            </aside>

            {showConf && (
                <div ref={confRef}>
                    <ConfProfile onUpdateAvatar={handleUpdateAvatar} onClose={() => setShowConf(false)} />
                </div>
            )}

            <button
                className="btn-aside"
                onClick={handleMove}
                title="Mover barra lateral"
            >
                <i className="fa-solid fa-bars-staggered"></i>
            </button>
        </div>
    );
}

export default Aside;
