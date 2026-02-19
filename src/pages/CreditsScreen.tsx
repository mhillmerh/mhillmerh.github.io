import { useEffect, useState } from "react";
import { sounds } from "../components/SoundManager";

import "../index.css";

type Props = {
    onBack: () => void;
};

export default function CreditsScreen({onBack} : Props) {
    const [secret, setSecret] = useState("");
    const [showBack, setShowBack] = useState(false);

    useEffect(() => {
        const handlekey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                sounds.playSelect();
                onBack();
            }
            setSecret((prev) => (prev + e.key.toLocaleLowerCase()).slice(-5));
        };

        window.addEventListener("keydown", handlekey);
        return () => window.removeEventListener("keydown", handlekey);
    }, [onBack]);

    useEffect(() => {
        if (secret === "iddqd") {
            alert ("🔥 GOD MODE ACTIVATED 🔥");
            sounds.playSelect();
        }

        if (secret === "idkfa") {
            alert("💀 ALL WEAPONS UNLOCKED 💀");
            sounds.playSelect();
        }
    }, [secret]);

    useEffect(() => {
        sounds.playCreditsMusic();
        return () => {
            sounds.playTheme();
        };
    },[]);

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Credits finished ooo")
            setShowBack(true);
        },32000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="credits-screen">
            <h1 className="credits-title">CREDITOS</h1>
            <div className="credits-scroll">
                <div className="credits-section">
                    <p className="credits-header">=== Doom Portfolio ===</p>
                </div>
                <div className="credits-section">
                    <p className="credits-label">Developer:</p>
                    <p className="credits-highlight">Maximiliano Hillmer</p>
                </div>
                <div className="credits-section">
                    <p className="credits-label">Built With:</p>
                    <p>React + TypeScript</p>
                    <p>Vite + GitHub Pages</p>
                    <p>Custom Arcade UI</p>
                    <p>Doom Sound FX System</p>
                </div>
                <div className="credits-section">
                    <p className="credits-label">Hours Invested:</p>
                    <p className="credits-highlight">100+ hours</p>
                </div>
                <div className="credits-section">
                    <p className="credits-label">Agradecimientos especiales</p>
                    <p>Mi Esposa</p>
                    <p>Internet</p>
                    <p>w3School</p>
                    <p>Chocolate</p>
                    <p>Papitas</p>
                    <p>michis</p>
                    <p>Chatgpt para el css y bugs</p>
                </div>
                <div className="credits-section">
                    <p className="achievement">🏆 ACHIEVEMENT UNLOCKED 🏆</p>
                    <p className="credits-highlight">PORTFOLIO SHIPPED</p>
                </div>
                <div className="credits-section">
                    <p>Gracias por tu tiempo...</p>
                    <p>Presione ESC para salir...</p>
                </div>  
                <div className="credits-section">
                    <p className="credits-footer-hint">(Intenta con IDDQD o IDKFA  👀)</p>
                </div>  
                {showBack && (
                <div className="credits-back-fixed">
                    <p className="credits-back" onMouseEnter={() => sounds.playHover()} 
                                        onClick={() => { 
                                            sounds.playSelect();
                                            onBack();
                                        }}>Volver</p>
                    <p className="credits-hint">• Esc para volver</p> 
                </div>  
                )} 
            </div>          
        </div>
    );
}
