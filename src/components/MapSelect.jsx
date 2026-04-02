import mapData from '../data/mapData.json';

export const MapSelect = ({ selectedMode, maps }) => {
    const modeMaps = mapData[selectedMode] || {};
    const modeMapIds = Object.values(modeMaps).map(m => m.id);
    const filteredMaps = maps.filter(map => modeMapIds.includes(map.id));

    console.log(filteredMaps);

    return (
        <div>
            {filteredMaps.map((item) => (<img width="300" key={item.id} src={item.imageUrl} alt={item.name}/>))}
        </div>
    )
}
