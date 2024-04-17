// CatChartPage.jsx
import React, { useEffect, useState } from "react";
import { getCats } from "../components/Cats";
import CatChart from "../components/CatChart";

const CatChartPage = () => {
    const initialEntities = getCats();
    const [cats, setCats] = useState(initialEntities);

    const colorCounts = cats.reduce((counts, cat) => {
        counts[cat.color] = (counts[cat.color] || 0) + 1;
        return counts;
    }, {});

    const chartData = {
        labels: Object.keys(colorCounts), 
        datasets: [{
            label: 'Colors',
            data: Object.values(colorCounts), 
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="centerContainer">
            <h1 style={{ textAlign: 'center' }}>Cats Colors Chart</h1>
            <CatChart data={chartData} />
        </div>
    );
};

export default CatChartPage;
