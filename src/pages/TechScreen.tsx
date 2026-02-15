import React, { useEffect, useState, useRef } from "react";
import { techlist } from "../components/TechData";
import { sounds } from "../components/SoundManager";

import "../index.css"

type Props = {
    onBack: () => void;
};

const items_per_page = 12;

export default function TechScreen ({ onBack }: Props) {
    const [selected, setSelected] = useState(0);
    const [showPanel, setShowPanel] = useState(false);
    
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(techlist.length / items_per_page);

    const startIndex = page * items_per_page;
    const currentItems = techlist.slice(startIndex, startIndex + items_per_page);

    const realIndex = startIndex + selected;

    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    function nextPage() {
        sounds.playMove();
        setPage((prev) => (prev + 1) % totalPages);
        setSelected(0);
    }

    function prevPage() {
        sounds.playMove();
        setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
        setSelected(0);
    }

    function handleTouchStart(e:React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX;
    }

    function handleTouchMove(e:React.TouchEvent) {
        touchEndX.current = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (!touchStartX.current || !touchEndX.current) return;

        const diff = touchStartX.current - touchEndX.current;

        if (diff > 60) nextPage();
        if (diff < -60) prevPage();

        touchStartX.current = null;
        touchEndX.current = null;
    }

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

                const columns = 3;

                if (e.key === "ArrowRight") {
                    setSelected((prev) => {       
                        return (prev + 1) % currentItems.length;
                    });
                }
                
                if (e.key === "ArrowLeft") {
                    setSelected((prev) => {
                        return prev === 0 ? currentItems.length -1 : prev - 1;
                    });        
                }

                if (e.key === "ArrowDown") {
                    setSelected((prev) => {      
                        return (prev + columns) % currentItems.length;
                    });
                }

                if (e.key === "ArrowUp") {
                    setSelected((prev) => {                
                        return prev - columns < 0 ? currentItems.length + (prev - columns) : prev - columns
                    });
                }

                if (e.key === "Enter") {
                    sounds.playSelect();
                    setShowPanel(true);
                }

                if (e.key === "Escape") {
                    sounds.playSelect();
                    onBack();
                }

                if (e.key === "e") {
                    prevPage();
                }

                if (e.key === "q") {
                    nextPage();
                }
            };
            window.addEventListener("keydown", handleEsc);
            return () => window.removeEventListener("keydown", handleEsc);
        }, [selected, onBack, showPanel])

    return (
        <div className="tech-screen">
            <h1 className="tech-title">TECH ARSENAL</h1>
                <div className="tech-carousel-zone"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                    <div className="tech-grid tech-carousel">
                        {currentItems.map((tech, index)=> (
                            <div
                                key={tech.name}
                                className={`tech-card ${selected === index ? "active": ""}`}
                                onMouseEnter={() => {
                                    if (selected !== index) {
                                        setSelected(index);
                                    }
                                }}
                                onClick={() => {
                                    sounds.playSelect();
                                    setSelected(index);
                                    if (!showPanel) {
                                        setShowPanel(true) 
                                    };
                                }}
                            >
                                <img src={tech.icon} alt={tech.name}/>
                                <p>{tech.name}</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
                {showPanel && (
                    <>
                        <div className="tech-overlay" onClick={() => setShowPanel(false)}></div>
                        <aside className="tech-panel popup" onClick={(e) => e.stopPropagation()}>
                            <h2>SELECTED TECH</h2>
                            <div className="tech-panel-icon">
                                <img src={techlist[realIndex].icon} alt={techlist[selected].name} />
                            </div>
                            <h3 className="panel-name">{techlist[realIndex].name}</h3>
                            <p className="panel-level">Level: {techlist[realIndex].level}</p>
                            <p className="panel-desc">{techlist[realIndex].description}</p>
                        </aside>
                    </>
                )}
        
            
            <p className="tech-back" onMouseEnter={() => sounds.playHover()} 
                        onClick={() => { 
                            sounds.playSelect();
                            onBack();
                        }}>Volver</p>
            <p className="tech-hint"> ← ↑ ↓ →  Para moverte • Enter para elegir • Esc para volver</p> 
            <div className="tech-bullet">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <span key={i} className= {`bullet ${page === i ? "active" : ""}`}>●</span>
                    ))}
            </div>
        </div>
    );
}
