import "./MapSelect.css";
import mapData from '../data/mapData.json';
import { useFetchMaps } from '../hooks/useFetchMaps.js';
import { useState } from 'react';

export const MapSelect = ({ selectedMode, onMapChange }) => {
    const apiMaps = useFetchMaps();
    const modeMaps = mapData[selectedMode] || []; // from my data
    const modeMapIds = modeMaps.map(m => m.id);
    const filteredMaps = apiMaps.filter(map => modeMapIds.includes(map.id)); // from api data for map images
    const [selected, setSelected] = useState(null);


    const handleMapSelect = (id) => {
        onMapChange(modeMaps.find(map => map.id === id));
        setSelected(id);
    }


    return (
        <div className='MapSelect'>
            {filteredMaps.map((item) => (
                <div key={item.id}>
                    <img className={`map-image ${selected === item.id ? "selected" : ""}`}
                        onClick={() => handleMapSelect(item.id)}
                        src={item.imageUrl}
                        alt={item.name} />
                    <div className="map-name"> {item.name} </div>
                </div>
            ))}
            <div className="map-analysis">
                Map Analysis
                {/* {` ${selectedMap.name}`} */}

            </div>
        </div>
    )
}
