
import brawlerData from '../data/brawlerData.json';

export const mapCalculator = (mapTags, brawler) => {
    let score = 0;

    switch (mapTags.bush) {
        case 2:
            score += brawler.features.bush_check * 2;
            break;
        case 1:
            score += brawler.features.bush_check;
            break;
        default:
            // Logic for no bush
            break;
    }

    switch (mapTags.wall_total) {
        case 2:
            if (brawler.effective_range === 'long') score -= 1;
        if (brawler.effective_range === 'mid') score += 1;
            break;
        case 1:
            if (brawler.effective_range === 'mid') score += 0.5;
            break;
        default:
            // Logic for no bush
            break;
    }

    switch (mapTags.wall_soft) {
        case 2:
            score += brawler.features.wall_break ? 2 : 0;
            break;
        case 1:
            score += brawler.features.wall_break ? 1 : 0;
            break;
        default:
            // Logic for no bush
            break;
    }

    switch (mapTags.wall_hard) {
        case 1:
            score += brawler.features.control * 0.5;
            break;
        default:
            // Logic for no bush
            break;
    }

    switch (mapTags.water) {
        case 1:
            // score += brawler.features.mobility * 0.5;
            break;
        default:
            // Logic for no bush
            break;
    }

    // mapfeature
    switch (mapTags.openness) {
        case 2:
            if (brawler.effective_range === "long") {
                score += 6;
            } else if (brawler.effective_range === "mid") {
                score += 1;
            } else {
                score -= 4;
            }
            break;
        case 1:
            if (brawler.effective_range === "long") {
                score += 1;
            } else if (brawler.effective_range === "mid") {
                score += 2;
            } else {
                score += 0;
            }
            break;
        default:
            if (brawler.effective_range === "long") {
                score -= 2;
            } else if (brawler.effective_range === "mid") {
                score += 1;
            } else {
                score += 2;
            }
            break;
    }

    score += mapTags.choke * brawler.features.control;

    score += mapTags.flank * brawler.features.mobility;

    score += mapTags.bush_position * brawler.features.bush_check;

    return score;
}
