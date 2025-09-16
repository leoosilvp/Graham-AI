import React, { useRef, useState, useEffect } from "react";
import logo from '../assets/img/icon-light.svg'
import MoveElement from "./MoveElement";
import NewChat from "./NewChat";
import CardsChat from "./CardsChat";
import '../css/aside.css'
import Search from "./Search";

function Aside() {
    const boxRef = useRef(true);
    const handleMove = MoveElement(boxRef);

    const [user, setUser] = useState({
        avatar: "https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg", // imagem padrão
        name: "User",
        login: ""
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('grahamUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("grahamUser");
        window.location.reload();
        setUser({
            avatar: "https://img.freepik.com/vetores-premium/icone-de-perfil-de-avatar-padrao-imagem-de-usuario-de-midia-social-icone-de-avatar-cinza-silhueta-de-perfil-em-branco-ilustracao-vetorial_561158-3407.jpg",
            name: "User",
            login: ""
        });
    };

    return (
        <div className="hero-aside">
            <aside ref={boxRef}>
                <a href="#"><img className='logo' src={logo} alt="logo" /></a>
                
                <Search />

                <NewChat />

                <CardsChat />

                <section className='ctn-profile'>
                    <div className="profile">
                        <img src={user.avatar} alt="img-profile" />
                        <div className="info-profile">
                            <h1>{user.name || "User"}</h1>
                            <p>GPT - 5</p>
                        </div>
                    </div>
                    <button onClick={handleLogout}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </section>
            </aside>
            <button className='.btn-aside' onClick={handleMove}>
                <i className="fa-regular fa-window-maximize fa-rotate-90"></i>
            </button>
        </div>
    )
}

export default Aside;
