import "./BrawlerCard.css";
export const BrawlerCard = ({ brawler }) => {

    return (
        <div className="BrawlerCard">
            <img src={brawler.imageUrl} alt={brawler.name} />
            <div className="brawler-name"> {brawler.name}</div>
            <div className="brawler-stat"></div>
        </div> 
    )
}