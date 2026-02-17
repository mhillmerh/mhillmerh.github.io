import { useEffect, useState } from "react";
import { projects } from "../components/ProjectData";
import { sounds } from "../components/SoundManager";

import "../index.css";

type Props = {
    onBack: () => void;
}

export default function ProjectScreen({onBack}: Props) {
    const [selected, setSelected] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const currentProject = projects[selected];

    useEffect(() => {
        const handlekeys = (e: KeyboardEvent) =>{
            if (!showPopup){
                sounds.playMove();
            }
            if (showPopup) {
                if (e.key === "Escape") {
                    sounds.playSelect();
                    setShowPopup(false);
                }
                return;
            }

            if (e.key === "ArrowRight") {
                setSelected((prev) => (prev + 1) % projects.length);
            }

            if (e.key === "ArrowLeft") {
                setSelected((prev) => prev === 0 ? projects.length -1 : prev -1);
            }

            if (e.key === "Enter") {
                sounds.playSelect();
                setShowPopup(true);
            }

            if (e.key === "Escape") {
                sounds.playSelect();
                onBack();
            }
        };
        window.addEventListener("keydown", handlekeys);
        return () => window.removeEventListener("keydown", handlekeys);
    }, [showPopup, onBack]);

    return (
        <div className="project-screen">
            <h1 className="project-title">PROJECTS</h1>
            <div className="project-grid">
                {projects.map((proj, index) => (
                    <div className={`project-card ${selected === index ? "active" : ""}`}
                        onMouseEnter={() => setSelected(index)}
                        onClick={() => {
                            sounds.playSelect();
                            setSelected(index);
                            setShowPopup(true);
                        }}
                        >
                            <h2 className="project-name">{proj.name}</h2>
                            <img src={proj.image} alt={proj.name} />
                            <p className="project-status">{proj.locked ? " 🔒 LOCKED" : proj.status}</p>
                    </div>
                ))}
            </div>
            {showPopup && (
                <>
                    <div className="project-overlay"
                        onClick={() => setShowPopup(false)}>
                    </div>
                    <aside className="project-popup popup"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="popup-title">{currentProject.name}</h2>
                        <img className="popup-image" src={currentProject.image} alt={currentProject.name} />
                        <p className="popup-desc">{currentProject.description}</p>

                        <p className="popup-tech"><strong>Tech:</strong>{" "}{currentProject.tech.join(" • ")}</p>

                        {currentProject.locked ? (
                            <p className="popup-locked">🚧 Project Currently in development...</p>

                        ) : (
                            <a className="popup-link" href={currentProject.url} target="_blank">🔗 Open GitHub Repository</a>
                        )}
                        <p className="popup-close" onClick={() => 
                            setShowPopup(false)}> ESC to Close</p>
                    </aside>

                </>
            )}




            <p className="project-back" onMouseEnter={() => sounds.playHover()} 
                                    onClick={() => { 
                                        sounds.playSelect();
                                        onBack();
                                    }}>Volver</p>
            <p className="project-controls"> ← →  Para moverte • Enter para elegir • Esc para volver</p> 
        </div>
    )

}