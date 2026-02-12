import React, { useEffect, useRef, useState } from "react";
import { sounds } from "../components/SoundManager";
import profilePic from "../assets/images/foto.png";
import "/src/index.css";

type Props = {
    onBack: () => void;
};

export default function AboutScreen({onBack}: Props) {

    useEffect (() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                sounds.playSelect();
                onBack();
            } 
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onBack])


    return (
        <main className="about-screen">
            <h2 className="about-title">{">> Acerca de mí <<"}</h2>

            <div className="about-card horizontal">
                <div className="about-photo-wrapper">
                    <img src={profilePic} alt="Foto de Maximiliano" className="about-photo" />
                    <div className="doom-stats">
                        <p><span>Title:</span> Ingeniero Informático</p>
                        <p><span>Institution:</span> Duoc UC</p>
                        <p><span>Level:</span> Junior Developer</p>
                    
                        <div className="stat-bar">
                            <div className="stat-label">EXP</div>
                            <div className="bar-bg">  
                                <div className="bar-fill exp"></div>
                            </div>
                        </div>

                        <div className="stat-bar">
                            <div className="stat-label">SKILLS</div>
                                <div className="bar-bg">
                                    <div className="bar-fill skill"></div>
                                </div>         
                        </div>

                        <p><span>Class:</span> FullStack Explorer</p>
                        <p><span>Mission:</span> Build software</p>
                        <p><span>Arsenal:</span></p>
                        <div className="arsenal-row">
                            <span className="arsenal-item">⌨️</span>
                            <span className="arsenal-item">☕</span>
                            <span className="arsenal-item">🍣</span>
                            <span className="arsenal-item">🍕</span>
                        </div>
                        <p className="arsenal-text">
                            Code • Focus • Sushi Nights • Pizza Mode 
                        </p>
                    </div>
                </div>

                <div className="about-info">
                    <p>
                        Soy <span>Maximiliano Hillmer</span>, Ingeniero en Informática,
                        apasionado por el desarrollo de aplicaciones web, automatizaciones y 
                        ciberseguridad.
                    </p>

                    <p>
                        Me encanta aprender construyendo proyectos reales, explorar nuevas
                        tecnologías y crear soluciones con estilo <span>retro-gaming.</span>
                    </p>

                    <p>
                        En mi tiempo libre disfruto de los <span>wargaming, juegos de mesa y estar con
                            mi famila</span> También aprovecho para aprender sobre nuevas tecnologías
                    </p>

                    <p>
                        Esta es la versión 2.0 de mi portafolio, en la cual utilice por primera vez
                        <span> REACT</span>. Para luego utilizar Node y TypeScript.
                    </p>
                </div>
            </div>

            <p className="about-back" onMouseEnter={() => sounds.playHover} onClick={() => {
                sounds.playSelect();
                onBack();
                }}> Volver</p>  

            <p className="about-hint">Esc para volver</p>        
        </main>
    )
}