import { useEffect, useRef } from "react";
import { sounds } from "../components/SoundManager";
import logo from "../assets/images/portafolio.png";

type Props = {
    onStart: () => void;
};

export default function StartScreen( {onStart }: Props) {
    const started = useRef(false);

    const playHover = () => {
        if (started.current) return;

        sounds.playHover();
    };
    const playStart = () => {
        if (started.current) return;
        started.current = true;

        sounds.playStart();

        setTimeout (() => {
            onStart();
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