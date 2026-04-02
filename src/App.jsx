import './App.css'
import { recommendBrawler } from './util/recommend.js';
import { BrawlerList } from './components/BrawlerList.jsx';
import { MapSelect } from './components/MapSelect.jsx';
import { ModeSelector } from './components/ModeSelector.jsx';
import { useState } from 'react';

function App() {
    const [selectedMap, setSelectedMap] = useState("");
    const [selectedMode, setSelectedMode] = useState("");
    const brawlerForMap = () => recommendBrawler({ mode: selectedMode, name: selectedMap[0] });
    const recommendedBrawler = selectedMap ? brawlerForMap() : [];

    const onModeChange = (mode) => {
        setSelectedMode(mode);
    }

    const onMapChange = (map) => {
        setSelectedMap(map);
    }

    return (
        <>
            <ModeSelector
                onModeChange={onModeChange}
                selectedMode={selectedMode}/>
            <MapSelect
                selectedMode={selectedMode}
                onMapChange={onMapChange}/>
            <BrawlerList 
                recommendedBrawler={recommendedBrawler}/>
        </>
    )
}

export default App
