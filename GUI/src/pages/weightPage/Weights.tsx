import React, { useEffect, useState } from "react";
import axios from "axios";
import { IWeight } from "../../types";
import { API_BASE_URL } from "../../utils/constants";
import "./Weights.css"; // Import pliku CSS
import { fetchData } from "./api";

const Weights: React.FC = () => {
    console.log("Rendering Weights component");

    const [data, setData] = useState<IWeight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("useEffect triggered");
        const getData = async () => {
            try {
                const data = await fetchData("/weights", {}); // Add await here
                setData(data);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="container">
            <h1>Weights</h1>
            <p>The page shows your weight records</p>
            {loading ? <p>Loading...</p> : createTable(data)}
        </div>
    );
};

function createTable(data: IWeight[]) {
    console.log("Rendering table with data:", data);
    return (
        <table className="responsive-table">
            <thead>
                <tr className="table-header">
                    <th>Date</th>
                    <th>Weight (kg)</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr className="table-row" key={index}>
                        <td className="col col-1" data-label="Date">{entry.date}</td>
                        <td className="col col-2" data-label="Weight (kg)">{entry.weight}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Weights;
