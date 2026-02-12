import { useEffect, useRef, useState} from "react";
import logo from "../assets/images/portafolio.png";

import hoverSound from "../assets/sounds/doom_chat.wav";
import shotSound from "../assets/sounds/doom_shot.wav";
import doorSound from "../assets/sounds/doom_door.wav"

type Props = {
    onStart: () => void;
};

export default function StartScreen( {onStart }: Props) {
    const started = useRef(false);

    const hoverAudio = useRef(new Audio(hoverSound));
    hoverAudio.current.volume =0.6;

    const shotAudio = useRef(new Audio(shotSound));
    shotAudio.current.volume = 0.8;

    const doorAudio = useRef(new Audio(doorSound));
    doorAudio.current.volume = 0.8;

    const playHover = () => {
        if (started.current) return;

        hoverAudio.current.currentTime = 0;
        hoverAudio.current.play();
    };
    const playStart = () => {
        if (started.current) return;
        started.current = true;

        shotAudio.current.currentTime = 0;
        shotAudio.current.play();

        setTimeout (() => {
            onStart();
            doorAudio.current.currentTime = 0;
            doorAudio.current.play();
        }, 1000);
        
    };

    useEffect(() => {
        const handlekey = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                playStart();
            }
        };

        window.addEventListener("keydown", handlekey);

        return () => window.removeEventListener("keydown", handlekey);
    }, []);

    return(
        <>
            <div className="start-screen">
                <div className="start-content">
                    <img
                        src= {logo}
                        alt="Doom Portafolio Logo"
                        className="doom-logo"
                        />
                    <p className="press-start" 
                        onMouseEnter={playHover}
                        onClick={playStart}>
                        PRESS START
                    </p>
                    <p className="hint">Enter o Space para comenzar</p>
                </div>
            </div>
        </>
        
    )
}