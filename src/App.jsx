import './App.css'
import { recommendBrawler } from './util/recommend.js';
import { BrawlerList } from './components/BrawlerList.jsx';
import { MapSelect } from './components/MapSelect.jsx';
import { ModeSelector } from './components/ModeSelector.jsx';
import { useState, useEffect } from 'react';
import mapData from './data/mapData.json';

function App() {
    const [selectedMap, setSelectedMap] = useState(null);
    const [selectedMode, setSelectedMode] = useState("");
    const [maps, setMaps] = useState([]);

    const onModeChange = (mode) => {
        setSelectedMode(mode);
    }

    useEffect(() => {
        const fetchMaps = async () => {
            const res = await fetch("https://api.brawlify.com/v1/maps");
            const data = await res.json();

            const validId = Object.values(mapData).flatMap(maps => Object.values(maps)).map(m => m.id);
            const filteredData = data.list.filter((item) => validId.includes(item.id));

            setMaps(filteredData);
            console.log("Fetched maps:", filteredData);
        }
        fetchMaps();
    }, []);

    return (
        <>
            <ModeSelector
                onModeChange={onModeChange}
                selectedMode={selectedMode}>
            </ModeSelector>
            <MapSelect
                selectedMode={selectedMode}
                maps={maps}>
            </MapSelect>
            <BrawlerList></BrawlerList>
        </>
    )
}

export default App
