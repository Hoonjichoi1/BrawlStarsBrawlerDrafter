import brawlerData from '../data/brawlerData.json';
import { useState, useEffect } from "react";

export const useFetchBrawlers = () => {
    const [brawlers, setBrawlers] = useState([]);

    useEffect(() => {
        const fetchBrawlers = async () => {
            const res = await fetch("https://api.brawlify.com/v1/brawlers");
            const data = await res.json();

            const validId = Object.values(brawlerData).map(b => b.id);
            const filteredData = data.list.filter((item) => validId.includes(item.id));
            setBrawlers(filteredData);
        }
        fetchBrawlers();
    }, []);
    return brawlers
}