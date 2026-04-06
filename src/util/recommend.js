import brawlerData from '../data/brawlerData.json';
import { classifyMap } from './mapTagger';
import { mapCalculator } from './mapCalculator';
import { modeCalculator } from './modeCalculator';

export const recommendBrawler = (map) => {
    const mode = map.mode;
    const mapTags = classifyMap(mode, map);

    const scoredBrawlers = () => {
        return brawlerData.map(brawler => {
            const mapScore = mapCalculator(mapTags, brawler);
            const modeScore = modeCalculator(mode, brawler);
            const total = mapScore + modeScore;

            return {
                ...brawler,
                _score: total,
                _breakdown: { modeScore, mapScore }
            };
        });
    }

    return scoredBrawlers().sort((a, b) => b._score - a._score).slice(0, 10);

}
