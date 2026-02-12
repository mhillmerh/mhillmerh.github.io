import { useEffect, useRef, useState } from "react";
import { techlist } from "../components/TechData";
import { sounds } from "../components/SoundManager";

import "../index.css"

type Props = {
    onBack: () => void;
};

export default function TechScreen ({ onBack }: Props) {
    const [selected, setSelected] = useState(0);
    const [showPanel, setShowPanel] = useState(false);

    useEffect (() => {  
        if (!showPanel) {
            sounds.playMove();
        }
            const handleEsc = (e: KeyboardEvent) => {
                e.preventDefault();          
                if (showPanel) {
                    if (e.key === "Escape") {
                        sounds.playSelect();
                        setShowPanel(false);
                    }
                    return;
                }

                const grid = document.querySelector(".tech-grid");
                if (!grid) return;

                const style = window.getComputedStyle(grid);
                const columns = style.gridTemplateColumns.split(" ").length;

                if (e.key === "ArrowRight") {
                    setSelected((prev) => {       
                        return (prev + 1) % techlist.length;
                    });
                }
                
                if (e.key === "ArrowLeft") {
                    setSelected((prev) => {
                        return prev === 0 ? techlist.length -1 : prev - 1;
                    });        
                }

                if (e.key === "ArrowDown") {
                    setSelected((prev) => {      
                        return (prev + columns) % techlist.length;
                    });
                }

                if (e.key === "ArrowUp") {
                    setSelected((prev) => {                
                        return prev - columns < 0 ? techlist.length + (prev - columns) : prev - columns
                    });
                }

                if (e.key === "Enter") {
                    sounds.playSelect();
                    setShowPanel(true);
                }

                if (e.key === "Escape") {
                    sounds.playSelect();
                    onBack();
                };
            };
            window.addEventListener("keydown", handleEsc);
            return () => window.removeEventListener("keydown", handleEsc);
        }, [selected, onBack, showPanel])

    return (
        <div className="tech-screen">
            <h1 className="tech-title">TECH ARSENAL</h1>
            
                <div className="tech-grid">
                    {techlist.map((tech, index)=> (
                        <div
                            key={tech.name}
                            className={`tech-card ${selected === index ? "active": ""}`}
                            onMouseEnter={() => {
                                if (selected !== index) {
                                    setSelected(index);
                                }
                            }}
                        >
                            <img src={tech.icon} alt={tech.name}/>
                            <p>{tech.name}</p>
                            
                        </div>
                    ))}
                </div>
                {showPanel && (
                    <>
                        <div className="tech-overlay" onClick={() => setShowPanel(false)}></div>
                        <aside className="tech-panel popup" onClick={(e) => e.stopPropagation()}>
                            <h2>SELECTED TECH</h2>
                            <div className="tech-panel-icon">
                                <img src={techlist[selected].icon} alt={techlist[selected].name} />
                            </div>
                            <h3 className="panel-name">{techlist[selected].name}</h3>
                            <p className="panel-level">Level: {techlist[selected].level}</p>
                            <p className="panel-desc">{techlist[selected].description}</p>
                        </aside>
                    </>
                )}
        
            
            <p className="tech-back" onMouseEnter={() => sounds.playHover()} 
                        onClick={() => { 
                            sounds.playSelect();
                            onBack();
                        }}>Volver</p>
            <p className="tech-hint"> ← ↑ ↓ →  Para moverte • Enter para elegir • Esc para volver</p> 
        </div>
    );
}
