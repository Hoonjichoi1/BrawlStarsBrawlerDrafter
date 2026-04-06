import "./BrawlerList.css";
import { useFetchBrawlers } from '../hooks/useFetchBrawlers.js';
import { BrawlerCard } from "./BrawlerCard.jsx";

export const BrawlerList = ({ recommendedBrawler }) => {
    const apiBrawlers = useFetchBrawlers();
    const validIds = recommendedBrawler.map(b => b.id);
    const filteredBrawlers = Object.values(apiBrawlers).filter((b) => validIds.includes(b.id));
    const taggedBrawlers = filteredBrawlers.map(b => {
        const recommended = recommendedBrawler.find(r => r.id === b.id);
        return { ...b, _breakdown: recommended?._breakdown };
    })

    return (
        <div>
            {recommendedBrawler.length > 0 &&
                <div className="BrawlerList">
                    <p className="instruction">RECOMMENDED BRAWLERS</p>
                    <div className="brawler-cards">
                        {taggedBrawlers.map((brawler, i) =>
                            <BrawlerCard key={brawler.id} brawler={brawler} rank={i + 1} />
                        )}
                    </div>
                </div>
            }
        </div>
    )
}