import "./MapSelect.css";
import mapData from '../data/mapData.json';
import { useFetchMaps } from '../hooks/useFetchMaps.js';
import { useState } from 'react';
import { classifyMap } from "../util/recommend.js";

const MODES = [
    { value: "GemGrab", strategy: "Gem Grab" },
    { value: "Heist", strategy: "Heist" },
    { value: "BrawlBall", strategy: "Brawl Ball" },
    { value: "Bounty", strategy: "Bounty" },
    { value: "KnockOut", strategy: "Knock Out" },
    { value: "HotZone", strategy: "Hot Zone" },
];

export const MapSelect = ({ selectedMode, onMapChange, selectedMap }) => {
    const apiMaps = useFetchMaps();
    const modeMaps = mapData[selectedMode] || []; // from my data
    const modeMapIds = modeMaps.map(m => m.id);
    const filteredMaps = apiMaps.filter(map => modeMapIds.includes(map.id)); // from api data for map images
    const [selected, setSelected] = useState(null);
    const selectedTags = classifyMap(selectedMap);

    const handleMapSelect = (id) => {
        const found = modeMaps.find(map => map.id === id);
        if (found && !selected) {
            onMapChange({ mode: selectedMode, ...found });
            setSelected(id);
        } else if (found && selected) {
            setSelected(null)
            onMapChange("");
        }
    }

    return (
        <div className='MapSelect'>
            <div className="Map-list">
                {filteredMaps.map((item) => (
                    <div key={item.id}>
                        <img className={`map-image ${selected === item.id ? "selected" : ""}`}
                            onClick={() => handleMapSelect(item.id)}
                            src={item.imageUrl}
                            alt={item.name} />
                        <div className="map-name"> {item.name} </div>
                    </div>
                ))}
            </div>
            {selectedMap &&
                <div className="Map-analysis">
                    <h3>Map analysis of "{`${selectedMap.name}`}"</h3>
                    <div className="map-tags"> {selectedTags && selectedTags.map(tag => "#" + `${tag}` + " ")} </div>
                    <p> 🎮 Game Mode : {selectedMap.mode} ⇨ {MODES.find(m => m.value === selectedMap.mode)?.strategy}</p>
                    <p> 🌱 Bush Coverage: {(selectedMap.bush / 693 * 100).toFixed(1)}% = {selectedMap.bush} units out of 693 units</p>
                    <p> 🪨 Wall Coverage: {(selectedMap.wall_hard + selectedMap.wall_soft / 693 * 100).toFixed(1)}% = {(selectedMap.wall_hard + selectedMap.wall_soft).toFixed(1)} units out of 693 units</p>
                    <p> 💧 Water Coverage: {(selectedMap.water / 693 * 100).toFixed(1)}% = {selectedMap.water} units out of 693 units</p>
                </div>
            }
        </div>
    )
}
