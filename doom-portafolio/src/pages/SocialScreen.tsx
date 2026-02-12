import { useEffect, useState } from "react";
import { sounds } from "../components/SoundManager";

import "../index.css";

type Props = {
    onBack: () => void;
};

const channels = [
    {
        freq: "88.4MHz",
        name: "GITHUB NODE",
        value: "https://github.com/mhillmerh",
        type: "link",
    },
    {
        freq: "101.1 MHz",
        name: "LINKEDIN RELAY",
        value: "https://www.linkedin.com/in/maximilianohillmer/",
        type: "link",
    },
    {
        freq: "66.6 MHz",
        name: "EMAIL CHANNEL",
        value: "m.hillmerh@gmail.com",
        type: "email",
    },
];

export default function SocialScreen({onBack}: Props) {
    const [selected, setSelected] = useState(0);
    const [activeChannel, setActiveChannel] = useState<number | null>(null);

    const [terminalText, setTerminalText] = useState("");
    const [typingDone, setTypingDone] = useState(false);

    const [copied, setCopied] = useState(false);
    const [cursorOn, setCursorOn] = useState(true);

    useEffect(() => {
        const blink = setInterval(() => {
            setCursorOn((prev) => !prev);
        }, 450);
        return () => clearInterval(blink);
    }, []);

    function startTerminal(index: number) {
        const channel = channels[index];

        const lines = [
            "> Establishing encrypted connection...",
            `> Channel Locked: ${channel.name}`,
            "> Authenticating user credentials...",
            "> Access granted....",
            ".................................",
            "> SIGNAL ACQUIRED:",
            channel.value,
            ".................................",
            "> READY TO TRANSMIT.",
            "> PRESS ESC TO BACK..."
        ];

        setTerminalText("");
        setTypingDone(false);
        sounds.playModem();

        let i = 0;

        const interval = setInterval(() => {
            setTerminalText((prev) => prev + "\n" + lines[i]);
            i++;

            if (i >= lines.length)  {
                clearInterval(interval);
                sounds.playModem();
                setTypingDone(true);
                sounds.stopModem();
            }
        }, 800);
    }

    function openChannel(index:number) {
        const channel = channels[index];

        if (channel.type === "link") {
            window.open(channel.value, "_blank");
        }
        if (channel.type === "email") {
            window.open(`mailto:${channel.value}`);
        }
    }

    async function copyToClipboard() {
        if (activeChannel === null) return;

        const value =channels[activeChannel].value;
        await navigator.clipboard.writeText(value);

        sounds.playSelect();
        setCopied(true);

        setTimeout(() =>setCopied(false), 1500);
    }

    useEffect(() => {
        const handleKeys = (e:KeyboardEvent) => {
            if (activeChannel !== null) {
                if (e.key === "Escape") {
                    sounds.playSelect();
                    setActiveChannel(null);
                }
                
            

                if (e.key === "Enter") {
                    sounds.playSelect();
                    openChannel(activeChannel);
                }

                if (e.key === "c") {
                    sounds.playSelect();
                    copyToClipboard();
                }

                return;
            }

            if (e.key === "ArrowUp") {
                setSelected((prev) => 
                    prev === 0 ? channels.length -1 : prev -1
                );
                sounds.playMove();
            }

            if (e.key === "ArrowDown") {
                setSelected((prev) => 
                    prev === channels.length -1 ? 0 :prev + 1
                );
                sounds.playMove();
            }

            if (e.key === "Enter") {
                sounds.playSelect();
                setActiveChannel(selected);
                startTerminal(selected);
            }

            if (e.key === "Escape") {
                sounds.playSelect();
                onBack();
            }
            
        };
        window.addEventListener("keydown",handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [selected, activeChannel, typingDone]);

    return (
        <div className="social-screen">
            <div className="crt-overlay"></div>
            <h1 className="social-title">COMMUNICATION UPLINK</h1>
            <div className="social-layout">
                <aside className="social-freq">
                    {channels.map((c, index) => (
                        <div key={c.name}
                            className= {`freq-item ${selected === index ? "active" : ""}`}
                            onMouseEnter={() => {
                                setSelected(index);
                                sounds.playHover();
                            }}
                            onClick={() => {
                                sounds.playSelect();
                                setActiveChannel(index);
                                startTerminal(index);
                            }}>
                            <span className="freq-code">{c.freq}</span>
                            <span className="freq-name">{c.name}</span>   
                        </div>
                    ))}
                </aside>
                <section className="social-terminal">
                    {activeChannel === null ? (
                        <p className="terminal-idle">
                            {"> Select a frequency channel..."}
                        </p>
                    ) : (
                        <>
                        <pre className="terminal-text">{terminalText}{typingDone && (
                            <span className="cursor">{cursorOn ? "_" : " "}</span>
                            )}
                        </pre>
                        {typingDone && (
                            <div className="terminal-actions">
                            <button onClick={() => openChannel(activeChannel)} 
                            className="doom-btn"> OPEN LINK (ENTER)</button>
                            <button onClick={copyToClipboard} className="doom-btn">
                                COPY (C)
                            </button>
                        </div>
                        )}
                        
                        {copied && (
                            <p className="copied-msg">
                                {"> COPIES TO BUFFER."}
                            </p>
                        )}
                        
                        </>
                    )}
                </section>
            </div>
            <p className="tech-back" onClick={onBack}>Volver</p>
            <p className="social-hint"> ↑ ↓ para moverse • Enter para elegir • Esc para volver</p> 
        </div>
    );
}