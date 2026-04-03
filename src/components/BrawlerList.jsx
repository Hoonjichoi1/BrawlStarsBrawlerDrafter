import "./BrawlerList.css";
import { useFetchBrawlers } from '../hooks/useFetchBrawlers.js';

export const BrawlerList = ({ recommendedBrawler }) => {
    const apiBrawlers = useFetchBrawlers();
    const validIds = recommendedBrawler.map(b => b.id);
    const filteredBrawlers = Object.values(apiBrawlers).filter((b) => validIds.includes(b.id));

    return (
        <div className="BrawlerList"> {filteredBrawlers.map((brawler) => 
            <div key={brawler.id} className="brawler-card">

            <img src={brawler.imageUrl} alt={brawler.name} />
            <div className="brawler-name"> {brawler.name} </div>
            </div>
        )}
        </div>
    )
}