import mapData from '../data/mapData.json';
import brawlerData from '../data/brawlerData.json';


const taggedMaps = [];

Object.entries(mapData).forEach(([mode, maps]) => {
    Object.entries(maps).forEach(([mapName, stats]) => {
        const tags = [];
        const walls_total = stats.wall_soft + stats.wall_hard;

        if (stats.bush > 19) {
            tags.push("bush_high");
        } else if (walls_total > 10) { // bush 19 이상일 때 wall 간섭은 향후에 보고 조정
            if (19 > stats.bush && stats.bush > 8) {
                tags.push("wall_high", "bush_medium");
            } else {
                tags.push("wall_high", "bush_low");
            }
        } else {
            if (19 > stats.bush && stats.bush > 12) {
                tags.push("wall_low", "bush_medium");
            } else {
                tags.push("wall_low", "bush_low");
            }
        }
        taggedMaps.push({ mode, mapName, tags });
    });
});

function classifyMap(map) {
    const foundMap = taggedMaps.find(m => m.mapName === map.name && m.mode === map.mode);
    return foundMap ? foundMap.tags : [];
}

export function recommendBrawler(map) {
    const tags = classifyMap(map);
    const brawlers = Object.entries(brawlerData);

    if (tags.includes("bush_high")) {
        return brawlers.filter(([name, stats]) => stats.effective_range === "close");
    } else if (tags.includes("wall_high")) {
        if (tags.includes("bush_medium")) {
            return brawlers.filter(([name, stats]) => stats.effective_range === "mid" || stats.thrower);
        } else {
            return brawlers.filter(([name, stats]) => stats.effective_range !== "close");
        }
    } else {
        if (tags.includes("bush_medium")) {
            return brawlers.filter(([name, stats]) => stats.thrower || stats.effective_range === "long");
        } else {
            return brawlers.filter(([name, stats]) => stats.effective_range === "long");
        }
    }
}
