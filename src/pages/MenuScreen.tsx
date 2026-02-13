import { useEffect, useState } from "react";
import { sounds } from "../components/SoundManager";
import "/src/index.css";

const menuItems = [
    { label: "Acerca de mí", screen: "about" },
    { label: "Certificaciones", screen: "certifications" },
    { label: "Proyectos", screen: "projects" },
    { label: "Redes Sociales", screen: "social" },
    { label: "Tecnologías", screen: "tech" },
    { label: "Arcade", screen: "arcade" },
];

export default function MenuScreen( {
    onSelect,
}: {
    onSelect: (screen: string) => void;
}) {
    const [selected , setSelected] = useState(0);
    const [transition, setTransition] = useState(false);
    
    function handleSelect() {
        if (transition) return;
        setTransition(true);

        sounds.playDoor();

        setTimeout(() => {
            console.log("cargar sección", onSelect(menuItems[selected].screen));

        }, 2200);
    }

    useEffect(() => {
        if (!transition) {
            sounds.playHover();
        }
        const handlekeyDown = (e: KeyboardEvent) => {
            if (transition) return;

            if (e.key === "ArrowUp") {
                setSelected((prev) => 
                    prev === 0 ? menuItems.length -1 : prev -1
                );
            }

            if (e.key === "ArrowDown") {
                setSelected((prev) =>
                    prev === menuItems.length -1 ? 0 :prev + 1
                );
            }

            if (e.key === "Enter") {
                handleSelect();
            }

            
        };

        window.addEventListener("keydown", handlekeyDown);
        return () => window.removeEventListener("keydown", handlekeyDown);
    }, [selected, transition]);
    

    return(
        <>
            
            <main className="menu-screen">
                <h2 className="menu-title">{">> Bienvenido <<"}</h2>

                <ul className="menu-list">
                    {menuItems.map((item, index) => (
                        <li key={item.screen}
                            className={`menu-item ${selected === index ? "active" : ""}`}
                            onMouseEnter={() => {
                                setSelected(index);
                                sounds.playHover();
                            }}
                            onClick={handleSelect}>
                            {item.label}
                        </li>
                    ))}
                </ul>
                <p className="menu-hint"> 
                    ↑ ↓ para moverse • Enter para elegir
                </p>
            </main>
        </>
    );
}