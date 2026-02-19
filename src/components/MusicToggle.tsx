import { useState } from "react";
import { sounds } from "./SoundManager";

export default function MusicToggle() {
    const [muted, setMuted] = useState(sounds.isMuted());

    return (
        <button className="music-toggle"
            onClick={() => setMuted(sounds.toggleMute())}
    >
        {muted ? "🔇 OFF" : "🔊 ON"}
    </button>
    );
}