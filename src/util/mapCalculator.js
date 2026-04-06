
export const mapCalculator = (mapTags, brawler) => {
    let score = 0;
    const reasons = [];

    switch (mapTags.bush) {
        case 2: {
            const s = brawler.features.bush_check * 2;
            score += s;
            if (s > 0) reasons.push({ reason: 'BushCheck', score: s });
            break;
        }
        case 1: {
            const s = brawler.features.bush_check;
            score += s;
            if (s > 0) reasons.push({ reason: 'BushCheck', score: s });
            break;
        }
        default: break;
    }

    switch (mapTags.wall_total) {
        case 2:
            if (brawler.effective_range === 'long') {
                score -= 1;
                reasons.push({ reason: 'RangePenalty', score: -1 });
            }
            if (brawler.effective_range === 'mid') {
                score += 1;
                reasons.push({ reason: 'MidRange', score: 1 });
            }
            break;
        case 1:
            if (brawler.effective_range === 'mid') {
                score += 0.5;
                reasons.push({ reason: 'MidRange', score: 0.5 });
            }
            break;
        default: break;
    }

    switch (mapTags.wall_soft) {
        case 2:
            if (brawler.features.wall_break) {
                score += 2;
                reasons.push({ reason: 'WallBreak', score: 2 });
            }
            break;
        case 1:
            if (brawler.features.wall_break) {
                score += 1;
                reasons.push({ reason: 'WallBreak', score: 1 });
            }
            break;
        default: break;
    }

    switch (mapTags.wall_hard) {
        case 1: {
            const s = brawler.features.control * 0.5;
            score += s;
            if (s > 0) reasons.push({ reason: 'ZoneControl', score: s });
            break;
        }
        default: break;
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
                reasons.push({ reason: 'LongRange', score: 6 });
            } else if (brawler.effective_range === "mid") {
                score += 1;
                reasons.push({ reason: 'MidRange', score: 1 });
            } else {
                score -= 4;
                reasons.push({ reason: 'ClosePenalty', score: -4 });
            }
            break;
        case 1:
            if (brawler.effective_range === "long") {
                score += 1;
                reasons.push({ reason: 'LongRange', score: 1 });
            } else if (brawler.effective_range === "mid") {
                score += 2;
                reasons.push({ reason: 'MidRange', score: 2 });
            } else {
                score += 0;
            }
            break;
        default:
            if (brawler.effective_range === "long") {
                score -= 2;
                reasons.push({ reason: 'RangePenalty', score: -2 });
            } else if (brawler.effective_range === "mid") {
                score += 1;
                reasons.push({ reason: 'MidRange', score: 1 });
            } else {
                score += 2;
                reasons.push({ reason: 'CloseRange', score: 2 });
            }
            break;
    }

    const chokeScore = mapTags.choke * brawler.features.control;
    score += chokeScore;
    if (chokeScore > 0) reasons.push({ reason: 'ChokeControl', score: chokeScore });

    const flankScore = mapTags.flank * brawler.features.mobility;
    score += flankScore;
    if (flankScore > 0) reasons.push({ reason: 'Flanker', score: flankScore });

    const bushPosScore = mapTags.bush_position * brawler.features.bush_check;
    score += bushPosScore;
    if (bushPosScore > 0) reasons.push({ reason: 'BushControl', score: bushPosScore });

    return { score, reasons };
}
