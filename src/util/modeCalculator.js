const modeWeights = {
    GemGrab: { controller: 2, tank: 1, support: 1 },
    Heist: { tank: 2, artillery: 1 },
    Bounty: { marksman: 2, damage_dealer: 1 },
    HotZone: { controller: 2, tank: 1 },
    BrawlBall: { tank: 2, assassin: 1 },
    KnockOut: { marksman: 2, damage_dealer: 1 },
};

export const modeCalculator = (mode, brawler) => {
    const weights = modeWeights[mode] || {};
    let score = 0;
    const reasons = [];
    const bf = brawler.features;

    const typeScore = weights[brawler.type] || 0;
    score += typeScore;

    if (typeScore > 0) reasons.push({ reason: `${brawler.type}_pick`, score: typeScore });

    if (mode === 'GemGrab') {
        score += bf.control + bf.survivability;
        if (bf.control > 0) reasons.push({ reason: 'CrowdControl', score: bf.control });
        if (bf.survivability > 0) reasons.push({ reason: 'Survivability', score: bf.survivability });
    }
    if (mode === 'Heist') {
        score += bf.objective_damage * 2 + (bf.wall_break ? 1 : 0);
        if (bf.objective_damage > 0) reasons.push({ reason: 'ObjDamage', score: bf.objective_damage * 2 });
        if (bf.wall_break) reasons.push({ reason: 'WallBreak', score: 1 });
    }
    if (mode === 'HotZone') {
        score += bf.control + bf.survivability;
        if (bf.control > 0) reasons.push({ reason: 'CrowdControl', score: bf.control });
        if (bf.survivability > 0) reasons.push({ reason: 'Survivability', score: bf.survivability });
    }
    if (mode === 'BrawlBall') {
        score += bf.mobility + (bf.wall_break ? 2 : 0);
        if (bf.mobility > 0) reasons.push({ reason: 'Mobility', score: bf.mobility });
        if (bf.wall_break) reasons.push({ reason: 'WallBreak', score: 2 });
    }
    if (mode === 'Bounty') {
        score += bf.bush_check;
        if (bf.bush_check > 0) reasons.push({ reason: 'BushControl', score: bf.bush_check });
    }
    if (mode === 'KnockOut') {
        score += bf.bush_check + bf.survivability;
        if (bf.bush_check > 0) reasons.push({ reason: 'BushControl', score: bf.bush_check });
        if (bf.survivability > 0) reasons.push({ reason: 'Survivability', score: bf.survivability });
    }

    return { score, reasons };
}