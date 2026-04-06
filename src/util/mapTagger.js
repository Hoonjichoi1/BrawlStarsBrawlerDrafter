import mapData from '../data/mapData.json';

export const classifyMap = (mode, map) => {
    const tags = {};
    const mapList = mapData[mode] || [];
    const foundMap = mapList.find(m => m.name === map.name);
    
    if (!foundMap) {
        return {};
    }
    const bush = foundMap.terrain.bush;
    const wall_total = foundMap.terrain.wall_total;
    const wall_soft = foundMap.terrain.wall_soft;
    const wall_hard = foundMap.terrain.wall_hard;
    const water = foundMap.terrain.water;

    tags.bush = bush > 20 ? 2 : bush > 10 ? 1 : 0;
    tags.wall_total = wall_total > 10 ? 2 : wall_total > 5 ? 1 : 0;
    tags.wall_soft = wall_soft > 10 ? 2 : wall_soft > 5 ? 1 : 0;
    tags.wall_hard = wall_hard > 2 ? 1 : 0;
    tags.water = water > 2 ? 1 : 0;

    
    const openness = foundMap.features.openness;
    const choke = foundMap.features.choke;
    const flank = foundMap.features.flank;
    const bush_position = foundMap.features.bush_position;

    tags.openness = openness;
    tags.choke = choke;
    tags.flank = flank;
    tags.bush_position = bush_position;

    return tags;
}