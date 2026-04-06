import './App.css'
import { recommendBrawler } from './util/recommend.js';
import { BrawlerList } from './components/BrawlerList.jsx';
import { MapSelect } from './components/MapSelect.jsx';
import { ModeSelector } from './components/ModeSelector.jsx';
import { useState } from 'react';

function App() {
    const [selectedMap, setSelectedMap] = useState("");
    const [selectedMode, setSelectedMode] = useState("");
    const brawlerForMap = () => recommendBrawler(selectedMap);
    const recommendedBrawler = selectedMap ? brawlerForMap() : [];

    const onModeChange = (mode) => {
        if (mode === selectedMode) {
            setSelectedMode("")
        } else {
            setSelectedMode(mode);
            setSelectedMap("");
        }
    }

    const onMapChange = (map) => {
        if (map === selectedMap) {
            setSelectedMap("")
        } else {
            setSelectedMap(map);
        }
    }

    return (
        <>
            <div className='header'>
                <h1 className='title'>Brawl Picker</h1>
                <p className='subtitle'>Brawler Recommendation by Map & Brawler features</p>
                 <div className="card-divider" />
            </div>
            <ModeSelector
                onModeChange={onModeChange}
                selectedMode={selectedMode} />
            <MapSelect
                selectedMode={selectedMode}
                onMapChange={onMapChange}
                selectedMap={selectedMap} />
            <BrawlerList
                recommendedBrawler={recommendedBrawler} />
        </>
    )
}

export default App
