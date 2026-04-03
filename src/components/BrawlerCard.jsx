import "./BrawlerCard.css";
import brawlerData from '../data/brawlerData.json';

export const BrawlerCard = ({ brawler }) => {
    const brawlerStat = Object.values(brawlerData).find((info) => info.id === brawler.id);
    console.log(brawlerStat);
    console.log("brawler", brawler);

    const brawlerType = () => {
        switch (brawlerStat.type) {
            case "support":
                return "Support";
            case "tank":
                return "Tank";
            case "damage_dealer":
                return "Damage Dealer";
            case "assassin":
                return "Assassin";
            case "controller":
                return "Controller";
            case "sniper":
            case "Marksman":
                return "Marksman";
            default:
                return "Unknown";
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

    return (
        <div className="BrawlerCard">
            <img src={brawler.imageUrl} alt={brawler.name} />
            <div className="brawler-name"> {brawler.name}</div>
            <div className="brawler-stat">
                <p>Type: {brawlerType()}</p>
                <p> Range: <span className={`brawler-range ${brawlerRange()}`}>{brawlerStat.range}</span></p>
                <p> Effective Range : {brawlerStat.effective_range}</p>
            </div>
        </div>
    )
}