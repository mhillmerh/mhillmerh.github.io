import { useEffect, useState } from "react";
import { certList } from "../components/CartData";
import { sounds } from "../components/SoundManager";

import "../index.css";

type Props = {
    onBack: () => void;
};

export default function CertificationsScreen({ onBack} : Props) {
    const [selected, setSelected] = useState(0);
    const [popupOpen, setPopupOpen] = useState(false);
    
    const currentCert = certList[selected];

    useEffect(() => {
        if (!popupOpen) {
                sounds.playMove();
            }
        function handleKey(e: KeyboardEvent) {
            e.preventDefault();

            if (popupOpen) {
                if (e.key === "Escape") {
                    sounds.playSelect();
                    setPopupOpen(false);
                }
                return;
            }

            if (e.key === "ArrowRight") {
                setSelected((prev) => (prev + 1) % certList.length);
            }

            if (e.key === "ArrowLeft") {
                setSelected((prev) => prev === 0 ? certList.length -1 : prev -1)
            }

            if (e.key === "Enter") {
                sounds.playSelect();
                setPopupOpen(true);
            }

            if (e.key === "Escape") {
                sounds.playSelect();
                onBack();
            }
        }

        window.addEventListener("keydown",handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [popupOpen, onBack]);

    return (
        <div className="cert-screen">
            <h1 className="cert-title">ACHIEVEMENT UNLOCKED</h1>

            <div className="cert-grid"> {certList.map((cert, index) => (
                <div key={cert.code}
                    className= {`cert-card ${selected === index ? "active": ""} 
                    ${cert.unlocked ? "" : "locked"}`}
                    onMouseEnter={() => setSelected(index)}
                    onClick={() => {
                        sounds.playSelect();
                        setSelected(index);
                        setPopupOpen(true);
                    }}>
                        <img src={cert.badge} alt={cert.code} />
                        <h2 className="cert-name">{cert.name}</h2>
                        <p className="cert-code">{cert.code}</p>
                        {cert.unlocked && (
                            <span className="cert-status">✔ Certification Acquired</span>
                        )}

                        {!cert.unlocked && (
                            <span className="cert-locked">🔒 Locked</span>
                        )}
                </div>    
            ))}
            </div>
            {popupOpen && (
                <>
                    <div className="cert-overlay" onClick={() => setPopupOpen(false)}></div>
                    <aside className="cert-panel popup">
                        <h2>{currentCert.unlocked ? "CERTIFICATION UNLOCKED" : "IN PROGRESS..."}</h2>
                        <img src={currentCert.badge} alt={currentCert.code} className="cert-panel-badge"/>
                        <h3 className="cert-name">{currentCert.name}</h3>

                        <p className="cert-desc">{currentCert.description}</p>

                        {currentCert.unlocked ? (
                            <>
                                <p className="cert-skill">XP GAINED: <span>+{currentCert.xp}</span></p>
                                <p className="cert-level">Rarity: <span>{currentCert.rarity}</span></p>

                                {currentCert.url && (
                                    <a href={currentCert.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cert-link">View Validation →</a>
                                )}
                            </>
                        ) : (
                            <p>Status: Grinding XP...</p>
                        )}
                        <p className="cert-hint">Press ESC to close</p>
                    </aside>
                
                </>
            )}

            <p className="cert-back" onMouseEnter={() => sounds.playHover()} 
                                    onClick={() => { 
                                        sounds.playSelect();
                                        onBack();
                                    }}>Volver</p>
            <p className="cert-controls"> ← →  Para moverte • Enter para elegir • Esc para volver</p> 
        </div>
    )
}