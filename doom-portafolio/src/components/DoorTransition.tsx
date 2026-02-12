import "../index.css"

type Props = {
    active: boolean;
    phase: "closing" | "opening";
}

export default function DoorTransition({ active, phase }:  Props) { 
    if (!active) return null;

    return (
        <div className={`door-transition ${phase}`}>
            <div className="door left"></div>
            <div className="door right">
            </div>
        </div>
    );
}