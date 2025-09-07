import React, { useRef, useState } from "react";
import logo from '../assets/img/icon-light.svg'
import MoveElement from "./MoveElement";
import NewChat from "./NewChat";
import CardsChat from "./CardsChat";
import '../css/aside.css'
import Search from "./Search";

function Aside(){
    const boxRef = useRef(true);

    const handleMove = MoveElement(boxRef);

    return(
        <div className="hero-aside">
            <aside ref={boxRef}>
                <a href="#"><img className='logo' src={logo} alt="logo" /></a>
                
                <Search />

                <NewChat />

                <CardsChat />

                <section className='ctn-profile'>
                    <div className="profile">
                        <img src="https://avatars.githubusercontent.com/u/182553526?v=4" alt="img-profile" />
                        <div className="info-profile">
                            <h1>Leonardo Silva</h1>
                            <p>GPT-5</p>
                        </div>
                    </div>
                    <button><i className="fa-solid fa-ellipsis"></i></button>
                </section>
            </aside>
            <button className='.btn-aside' onClick={handleMove}><i className="fa-regular fa-window-maximize fa-rotate-90"></i></button>
        </div>
    )
}

export default Aside