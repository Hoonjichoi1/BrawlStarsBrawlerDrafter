import { useFetchBrawlers } from '../hooks/useFetchBrawlers.js';

export const BrawlerList = ({ recommendedBrawler }) => {
    const apiBrawlers = useFetchBrawlers();
    const validIds = Object.values(recommendedBrawler).map(b => b.id);
    const filteredBrawlers = Object.values(apiBrawlers).filter((b) => validIds.includes(b.id));

    console.log("Recommended Brawler:", recommendedBrawler);
    console.log("validIds", validIds);
    console.log("apiBrawlers", apiBrawlers);
    console.log("filteredBrawlers", "filtered : ", filteredBrawlers);


    return (
        <div> {filteredBrawlers.map((brawler) => 
            <img key={brawler.id} src={brawler.imageUrl} alt={brawler.name} />
        )}
        </div>
    )
}