import mapData from '../data/mapData.json';
import { useFetchMaps } from '../hooks/useFetchMaps.js';

export const MapSelect = ({ selectedMode, onMapChange }) => {
    const apiMaps = useFetchMaps();
    const modeMaps = mapData[selectedMode] || {};
    const modeMapIds = Object.values(modeMaps).map(m => m.id);
    const filteredMaps = apiMaps.filter(map => modeMapIds.includes(map.id));

    console.log(modeMaps);

    const handleMapSelect = (id) => {
        onMapChange(Object.entries(modeMaps).find(([name, map]) => map.id === id ? { name: map } : null));
    }

    return (
        <div className='MapSelect'>
            {filteredMaps.map((item) => (
                <img className='map-image'
                    onClick={() => handleMapSelect(item.id)}
                    width="300"
                    key={item.id}
                    src={item.imageUrl}
                    alt={item.name} />))}
        </div>
    )
}
