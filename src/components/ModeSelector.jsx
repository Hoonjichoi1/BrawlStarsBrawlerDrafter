
export const ModeSelector = ({ onModeChange, selectedMode }) => {
    
    const handleModeChanger = (e) => {
        onModeChange(e.target.value);
    }

    return (
        <div>
            <select className="ModeSelector"
                onChange={handleModeChanger}>
                <option value="">Select Mode</option>
                <option value="GemGrab">Gem Grab</option>
                <option value="Heist">Heist</option>
                <option value="BrawlBall">Brawl Ball</option>
                <option value="Bounty">Bounty</option>
                <option value="KnockOut">Knock Out</option>
            </select>
            <h3> Selected Mode: {selectedMode} </h3>
        </div>
    )
}
