import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import logo from "../assets/img/icon-light.svg";
import NewChat from "./NewChat";
import CardsChat from "./CardsChat";
import "../css/aside.css";
import Search from "./Search";
import ConfProfile from "./ConfProfile";
import Library from "./Library";
import ChangeModel from "./ChangeModel";

function Aside() {
    const boxRef = useRef(null);
    const confRef = useRef(null);

    const [moved, setMoved] = useState(() => {
        return localStorage.getItem("showAside") === "true";
    });

    useLayoutEffect(() => {
        const element = boxRef.current;
        if (!element) return;

        const width = element.offsetWidth;
        element.style.marginLeft = moved ? "0" : `-${width + 2}px`;
    }, [moved]);

    const handleMove = () => {
        const element = boxRef.current;
        if (!element) return;

        const width = element.offsetWidth;
        const newState = !moved;

        setMoved(newState);
        localStorage.setItem("showAside", newState);

        element.style.transition = "var(--transition)";
        element.style.marginLeft = newState ? "0" : `-${width + 2}px`;
    };

    const closeSidebar = () => {
        const element = boxRef.current;
        if (!element) return;

        const width = element.offsetWidth;

        setMoved(false);
        localStorage.setItem("showAside", false);

        element.style.transition = "var(--transition)";
        element.style.marginLeft = `-${width + 2}px`;
    };

    const { user, setUser } = useUser();
    const [showConf, setShowConf] = useState(false);

    const toggleConf = useCallback(() => {
        setShowConf((prev) => !prev);
    }, []);

    useOutsideClick(confRef, () => {
        if (showConf) setShowConf(false);
    }, showConf);

    useOutsideClick(
        boxRef,
        () => {
            const isMobile = window.innerWidth <= 768;
            if (moved && isMobile) {
                closeSidebar();
            }
        },
        moved
    );

    const handleUpdateAvatar = useCallback(
        (avatarUrl) => {
            setUser((prev) => ({ ...prev, avatar: avatarUrl }));
        },
        [setUser]
    );

    return (
        <div className="hero-aside">
            <aside ref={boxRef}>
                <section className="header-aside">
                    <Link to='/' className="aside-logo" title="GrahamAI">
                        <img className="logo" src={logo} alt="logo" />
                    </Link>

                    <ChangeModel />
                </section>

                <NewChat />

                <Library />

                <Search />

                <CardsChat />

                <section className="ctn-profile">
                    <NavLink to={'/chat/settings/account'} className="profile">
                        <img src={user.avatar} alt={`${user.name || "User"} avatar`} />
                        <div className="info-profile">
                            <h1>{user.name || "User"}</h1>
                            <p>BASIC</p>
                        </div>
                    </NavLink>
                    <i onClick={toggleConf} className="fa-solid fa-ellipsis"></i>
                </section>
            </aside>

            {showConf && (
                <div ref={confRef}>
                    <ConfProfile
                        onUpdateAvatar={handleUpdateAvatar}
                        onClose={() => setShowConf(false)}
                    />
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
