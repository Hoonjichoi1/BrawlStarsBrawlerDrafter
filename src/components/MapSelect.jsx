import "./MapSelect.css";
import mapData from '../data/mapData.json';
import { useFetchMaps } from '../hooks/useFetchMaps.js';
import { useState } from 'react';

export const MapSelect = ({ selectedMode, onMapChange }) => {
    const apiMaps = useFetchMaps();
    const modeMaps = mapData[selectedMode] || {}; // from my data
    const modeMapIds = Object.values(modeMaps).map(m => m.id);
    const filteredMaps = apiMaps.filter(map => modeMapIds.includes(map.id)); // from api data for map images
    const [selected, setSelected] = useState(null);


    const handleMapSelect = (id) => {
        onMapChange(Object.entries(modeMaps).find(([name, map]) => map.id === id ? { name: map } : null));
        setSelected(id);
    }

    return (
        <div className='MapSelect'>
            {filteredMaps.map((item) => (
                <img className={`map-image ${selected === item.id ? "selected" : ""}`}
                    onClick={() => handleMapSelect(item.id)}
                    width="300"
                    key={item.id}
                    src={item.imageUrl}
                    alt={item.name} />))}
        </div>
    )
}
