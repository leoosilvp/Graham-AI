import React, { useRef, useState, useEffect, useCallback } from "react";
import logo from "../assets/img/icon-light.svg";
import MoveElement from "./MoveElement";
import NewChat from "./NewChat";
import CardsChat from "./CardsChat";
import "../css/aside.css";
import Search from "./Search";
import ConfProfile from "./ConfProfile";
import Library from "./Library";

function Aside() {
    const boxRef = useRef(null);
    const confRef = useRef(null);
    const handleMove = MoveElement(boxRef);

    const [user, setUser] = useState({
        avatar: "https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg",
        name: "User",
        login: ""
    });

    const [showConf, setShowConf] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("grahamUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleConf = useCallback(() => {
        setShowConf(prev => !prev);
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                showConf &&
                confRef.current &&
                !confRef.current.contains(e.target) &&
                !e.target.closest(".btn-profile")
            ) {
                setShowConf(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showConf]);

    return (
        <div className="hero-aside">
            <aside ref={boxRef}>
                <a href="" className="aside-logo">
                    <img className="logo" src={logo} alt="logo" />
                </a>
                
                <NewChat />

                <Library />

                <Search />

                <CardsChat />

                <section className="ctn-profile">
                    <div className="profile">
                        <img src={user.avatar} alt="img-profile" />
                        <div className="info-profile">
                            <h1>{user.name || "User"}</h1>
                            <p>BASIC</p>
                        </div>
                    </div>
                    <i onClick={toggleConf} className="fa-solid fa-ellipsis btn-profile"></i>
                </section>
            </aside>

            {showConf && (
                <div ref={confRef} className="ctn-conf-profile">
                    <ConfProfile />
                </div>
            )}

            <button className="btn-aside" onClick={handleMove}>
                <i className="fa-solid fa-bars-staggered"></i>
            </button>
        </div>
    );
}

export default Aside;
