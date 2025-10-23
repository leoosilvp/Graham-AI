import { useState, useEffect, useRef } from 'react';
import '../css/changeModel.css';

function ChangeModel() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    // Fecha o menu se clicar fora
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className='change-model' ref={ref}>
            <button className='active-model' onClick={toggleMenu}>
                Modelo <i className={`fa-solid fa-chevron-${isOpen ? 'left' : 'right'}`}></i>
            </button>

            {isOpen && (
                <article className='options-model'>
                    <button onClick={() => window.location.href='https://graham-ai-page.vercel.app/'}>
                        <section className='ctn-desc-model'>
                            <i className='fa-solid fa-wand-magic-sparkles'></i>
                            <article className='desc-model'>
                                <h1>Graham PRO</h1>
                                <h2>A inteligência evoluiu. E agora, vai além.</h2>
                            </article>
                        </section>
                        <a href="https://graham-ai-page.vercel.app/">
                            <i className='fa-regular fa-chess-queen'></i> Atualizar
                        </a>
                    </button>

                    <button className='active' onClick={closeMenu}>
                        <section className='ctn-desc-model'>
                            <i className='fa-solid fa-microchip'></i>
                            <article className='desc-model'>
                                <h1>Graham BASIC</h1>
                                <h2>Ideal para as demandas do dia a dia.</h2>
                            </article>
                        </section>
                        <i className='fa-solid fa-check'></i>
                    </button>
                </article>
            )}
        </section>
    );
}

export default ChangeModel;
