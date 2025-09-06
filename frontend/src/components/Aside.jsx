import React, { useRef, useState } from "react";
import logo from '../assets/img/icon-light.svg'
import MoveElement from "./MoveElement";
import '../css/aside.css'

function Aside(){
    const boxRef = useRef(true);

    const handleMove = MoveElement(boxRef);

    return(
        <div className="hero-aside">
            <aside ref={boxRef}>
                <a href="#"><img className='logo' src={logo} alt="logo" /></a>
                <article className='search-chat'>
                    <label htmlFor="search-chat"><i class="fa-solid fa-magnifying-glass"></i>Procurar chats</label>
                    <input id='search-chat' type="text" placeholder='Buscar conversas..'/>
                </article>

                <article className='new-chat'>
                    <h2><i class="fa-regular fa-pen-to-square"></i>Novo chat</h2>
                    <button>New chat!<i class="fa-solid fa-comments"></i></button>
                </article>

                <section className='ctn-chats'>
                    <h1>Your chats</h1>
                    <section className='chats'>
                        <article className='card-chat'>
                            <section className='title-card'>
                                <i class="fa-solid fa-comments"></i>
                                <h1>Chat atual!</h1>
                            </section>
                            <button><i class="fa-solid fa-ellipsis"></i></button>
                        </article>

                    </section>
                </section>

                <section className='ctn-profile'>
                    <div className="profile">
                        <img src="https://avatars.githubusercontent.com/u/182553526?v=4" alt="img-profile" />
                        <div className="info-profile">
                            <h1>Leonardo Silva</h1>
                            <p>GPT-5 nano</p>
                        </div>
                    </div>
                    <button><i class="fa-solid fa-ellipsis"></i></button>
                </section>
            </aside>
            <button className='.btn-aside' onClick={handleMove}><i class="fa-regular fa-window-maximize fa-rotate-90"></i></button>
        </div>
    )
}

export default Aside