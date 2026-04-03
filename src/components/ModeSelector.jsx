import "./ModeSelector.css";

const MODES = [
    { value: "GemGrab", label: "Gem Grab" },
    { value: "Heist", label: "Heist" },
    { value: "BrawlBall", label: "Brawl Ball" },
    { value: "Bounty", label: "Bounty" },
    { value: "KnockOut", label: "Knock Out" },
    { value: "HotZone", label: "Hot Zone" },
];

export const ModeSelector = ({ onModeChange, selectedMode }) => {

    return (
        <div className="ModeSelector">
            <p className="instruction">SELECT THE GAME MODE</p>
            <div className="mode-row">
                {MODES.map(({ value, label }) => (
                    <button
                        key={value}
                        className={`mode-button ${selectedMode === value ? 'active' : ''}`}
                        onClick={() => onModeChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}
