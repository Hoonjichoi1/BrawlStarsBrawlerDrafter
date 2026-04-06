const modeWeights = {
    GemGrab:   { controller: 2, tank: 1, support: 1 },
    Heist:     { tank: 2, artillery: 1 },
    Bounty:    { marksman: 2, damage_dealer: 1 },
    HotZone:   { controller: 2, tank: 1 },
    BrawlBall: { tank: 2, assassin: 1 },
    KnockOut:  { marksman: 2, damage_dealer: 1 },
};

export const modeCalculator = (mode, brawler) => {
    const weights = modeWeights[mode] || {};
    let score = 0;
 
    score += weights[brawler.type] || 0;

    const features = brawler.features;
    if (mode === 'GemGrab')   score += features.control + features.survivability;
    if (mode === 'Heist')     score += features.objective_damage * 2 + (features.wall_break ? 1 : 0);
    if (mode === 'HotZone')   score += features.control + features.survivability;
    if (mode === 'BrawlBall') score += features.mobility + (features.wall_break ? 2 : 0);
    if (mode === 'Bounty')    score += features.bush_check;
    if (mode === 'KnockOut')  score += features.bush_check + features.survivability;

    return score;
}