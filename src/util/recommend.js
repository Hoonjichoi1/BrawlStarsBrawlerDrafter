import mapData from '../data/mapData.json';
import brawlerData from '../data/brawlerData.json';


const taggedMaps = [];
Object.entries(mapData).forEach(([mode, maps]) => {
    maps.forEach((map) => {
        const tags = [];
        const mapName = map.name
        const walls_total = map.wall_soft + map.wall_hard;

        if (map.bush > 19) {
            tags.push("bush_high");
        } else if (walls_total > 10) {
            if (map.bush > 8) {
                tags.push("wall_high", "bush_medium");
            } else {
                tags.push("wall_high", "bush_low");
            }
        } else {
            if (map.bush > 12) {
                tags.push("wall_low", "bush_medium");
            } else {
                tags.push("wall_low", "bush_low");
            }
        }
        taggedMaps.push({ mode, mapName, tags }); // String String Array
    });
})

export function classifyMap(map) {
    const foundMap = taggedMaps.find(m => m.mapName === map.name && m.mode === map.mode);
    return foundMap ? foundMap.tags : [];
}

const modeWeights = {
    GemGrab: { tank: 2, assassin: 1.5, controller: 1.5, support: 1.5 },
    Heist: { damage_dealer: 1.5, artillery: 2 },
    HotZone: { tank: 2 },
    BrawlBall: { tank: 2, assassin: 2 },
    Bounty: {},
    KnockOut: {}
};

const modeBonuses = {
    Heist: (stats) => stats.assassin_skill ? 0.5 : 0,
    BrawlBall: (stats) => stats.wall_break ? 0.5 : 0,
};

// map = object, mode = string
export function recommendBrawler(map) {
    const tags = classifyMap(map);
    const mode = map.mode;
    const weights = modeWeights[mode] || {};         // select mode weights
    const bonus = modeBonuses[mode] || (() => 0);  // select mode bonuses

    const scored = Object.entries(brawlerData).map(([name, stats]) => {
        let score = 0;

        score += weights[stats.type] || 0;  // find type weight
        score += bonus(stats);              // find type bonus

        // find terrain score
        if (tags.includes("bush_high")) {
            if (stats.effective_range === "close") score += 2;
        } else if (tags.includes("wall_high")) {
            if (tags.includes("bush_medium")) {
                if (stats.effective_range === "mid" || stats.thrower) score += 2;
            } else {
                if (stats.effective_range !== "close") score += 2;
            }
        } else {
            if (tags.includes("bush_medium")) {
                if (stats.thrower || stats.effective_range === "long") score += 2;
            } else {
                if (stats.effective_range === "long") score += 2;
            }
        }

        return [name, stats, score];
    });
    return scored
        .sort((a, b) => b[2] - a[2])
        .slice(0, 5)
        .map(([name, stats]) => ({ name, ...stats }));
}
