import "./MapSelect.css";
import mapData from '../data/mapData.json';
import { useFetchMaps } from '../hooks/useFetchMaps.js';
import { useState } from 'react';
import { classifyMap } from '../util/mapTagger.js';

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
    const selectedTags = classifyMap(selectedMode, selectedMap);

    console.log("selectedTags", selectedTags);
    console.log("selectedMap", selectedMap);

    const handleMapSelect = (id) => {
        const found = modeMaps.find(map => map.id === id);
        console.log("found", found);
        console.log("selectedMap", selectedMap);
        if (selectedMap.id === found.id && selected) {
            setSelected(null)
            onMapChange("");
        } else {
            onMapChange({ mode: selectedMode, ...found });
            setSelected(id);
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
                        <div className={`map-name ${selected === item.id ? "selected" : ""}`}> {item.name} </div>
                    </div>
                ))}
            </div>
            {selectedMap &&
                <div className="Map-analysis">
                    <h3>Map Analysis of "{`${selectedMap.name}`}"</h3>
                    <div className="map-tags"> {selectedTags && Object.keys(selectedTags).map(tag => "#" + `${tag}` + " ")} </div>
                    <p> 🎮 Game Mode : {selectedMap.mode} ⇨ {MODES.find(m => m.value === selectedMap.mode)?.strategy}</p>
                    <p> 🌱 Bush Coverage: {(selectedMap.terrain.bush)}%</p>
                    <p> 🪨 Wall Coverage: {(selectedMap.terrain.wall_total)}% </p>
                    <p> 💧 Water Coverage: {(selectedMap.terrain.water)}%</p>
                </div>
            }
        </div>
    )
}
