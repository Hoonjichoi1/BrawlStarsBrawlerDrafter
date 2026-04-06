import brawlerData from '../data/brawlerData.json';
import { classifyMap } from './mapTagger';
import { mapCalculator } from './mapCalculator';
import { modeCalculator } from './modeCalculator';

export const recommendBrawler = (map) => {
    const mode = map.mode;
    const mapTags = classifyMap(mode, map);

    const scoredBrawlers = () => {
        return brawlerData.map(brawler => {
            const mapResult = mapCalculator(mapTags, brawler);
            const modeResult = modeCalculator(mode, brawler);
            const total = mapResult.score + modeResult.score;
            const top3Reasons = [...mapResult.reasons, ...modeResult.reasons]
                .sort((a, b) => b.score - a.score)
                .filter((item, index, self) =>
                    index === self.findIndex(r => r.reason === item.reason)
                )
                .slice(0, 3)
                .map(r => r.reason);

            return {
                ...brawler,
                _score: total,
                _breakdown: { modeResult: modeResult, mapResult: mapResult, reasons: top3Reasons }
            };
        });
    }

    return scoredBrawlers().sort((a, b) => b._score - a._score).slice(0, 10);

}
