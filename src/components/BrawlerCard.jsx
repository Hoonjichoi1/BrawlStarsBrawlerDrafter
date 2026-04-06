import "./BrawlerCard.css";
import brawlerData from '../data/brawlerData.json';

export const BrawlerCard = ({ brawler, rank }) => {
    const brawlerStat = Object.values(brawlerData).find((info) => info.id === brawler.id);

    const brawlerType = () => {
        switch (brawlerStat.type) {
            case "support": return "Support";
            case "tank": return "Tank";
            case "damage_dealer": return "Damage Dealer";
            case "assassin": return "Assassin";
            case "controller": return "Controller";
            case "marksman": return "Marksman";
            case "artillery": return "Artillery";
            default: return "Unknown";
        }
    }

    const brawlerRange = () => {
        if (brawlerStat.range > 9) {
            return "long";
        } else if (brawlerStat.range > 5) {
            return "medium";
        } else {
            return "short";
        }
    }

    console.log("breakdown", brawler._breakdown)

    return (
        <div className="BrawlerCard">
            <div className="brawler-image-area">
                {rank && <span className="rank-badge">#{rank}</span>}
                <img src={brawler.imageUrl} alt={brawler.name} />
            </div>

            <div className="brawler-body">
                <div className="brawler-info-top">
                    <div className="brawler-name"> {brawler.name}</div>
                    <p className="brawler-type"> {brawlerType()}</p>
                </div>

                <div className="card-divider" />

                <div className="brawler-stat">
                    <div className="stat">
                        <span className="stat-label">Range</span>
                        <span className={`stat-value brawler-range ${brawlerRange()}`}>{brawlerStat.range}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Health</span>
                        <span className="stat-value">{brawlerStat.health}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Speed</span>
                        <span className="stat-value">{brawlerStat.speed}</span>
                    </div>
                </div>
                <div className="card-divider" />
                <div className="brawler-breakdown">
                    {brawler._breakdown.reasons.map((reason, i) => {
                        return <div className="reason" key={i}>{reason}</div>
                    })}
                </div>
            </div>
        </div>
    )
}