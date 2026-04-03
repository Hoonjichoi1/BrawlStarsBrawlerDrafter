import mapData from '../data/mapData.json';
import { useState, useEffect } from "react";

export const useFetchMaps = () => {
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        const fetchMaps = async () => {
            const res = await fetch("https://api.brawlify.com/v1/maps");
            const data = await res.json();

            const validId = Object.values(mapData).flatMap(maps => Object.values(maps)).map(m => m.id);
            const filteredData = data.list.filter((item) => validId.includes(item.id));

            setMaps(filteredData);
        }
        fetchMaps();
    }, []);

    return maps;
}