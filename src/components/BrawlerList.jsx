import "./BrawlerList.css";
import { useFetchBrawlers } from '../hooks/useFetchBrawlers.js';
import { BrawlerCard } from "./BrawlerCard.jsx";

export const BrawlerList = ({ recommendedBrawler }) => {
    const apiBrawlers = useFetchBrawlers();
    const validIds = recommendedBrawler.map(b => b.id);
    const filteredBrawlers = Object.values(apiBrawlers).filter((b) => validIds.includes(b.id));

    return (
        <div className="BrawlerList">
            {filteredBrawlers.map((brawler) =>
                <BrawlerCard key={brawler.id} brawler={brawler}/>
            )}
        </div>
    )
}