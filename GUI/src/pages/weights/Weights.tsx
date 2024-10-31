import React, { useEffect, useState } from "react";
import { IWeight } from "../../utils/types";
import "./Weights.css";
import { fetchData } from "../../utils/api";
import { API_GET_WEIGHTS } from "../../utils/api_constants";
import { Flowbite } from "flowbite-react";

const Weights: React.FC = () => {
  const [data, setData] = useState<IWeight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData(API_GET_WEIGHTS, {});
        setData(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  return (
    <Flowbite>
      <div className="container rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
          Weights
        </h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The page shows your weight records
        </p>
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading...</p>
        ) : (
          createTable(data)
        )}
      </div>
    </Flowbite>
  );
};

function createTable(data: IWeight[]) {
  return (
    <table className="w-full border-collapse overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      <thead>
        <tr className="bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-white">
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr
            key={index}
            className={`border-b dark:border-gray-600 ${index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"}`}
          >
            <td className="p-3 text-gray-900 dark:text-white">{entry.date}</td>
            <td className="p-3 text-gray-900 dark:text-white">
              {entry.weight}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Weights;
