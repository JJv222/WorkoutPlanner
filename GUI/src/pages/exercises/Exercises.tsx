"use client";

import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { IExercise } from "../../utils/types";
import { API_GET_EXERCISES } from "../../utils/api_constants";
import { fetchData } from "../../utils/api";

const Exercises: React.FC = () => {
  const DESCRIPTION_MAX_LENGTH = 50;

  const [data, setData] = useState<IExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default items per page

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData(API_GET_EXERCISES, {});
        setData(fetchedData);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container overflow-x-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Exercises
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The page shows the exercises in your database
      </p>

      <div className="mb-4">
        <label className="mr-2 text-gray-700 dark:text-gray-300">
          Items per page:
        </label>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="rounded-md border border-gray-300 p-1 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          {[10, 20, 30, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="mb-4 text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        <>
          <ExerciseTable
            data={paginatedData}
            maxDescriptionSize={DESCRIPTION_MAX_LENGTH}
          />
          <div className="mt-4">
            <span className="mr-2 text-gray-700 dark:text-gray-300">
              Pages:
            </span>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 rounded-md px-3 py-1 ${currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ExerciseTable: React.FC<{
  data: IExercise[];
  maxDescriptionSize: number;
}> = ({ data, maxDescriptionSize }) => {
  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell className="px-6 py-4 text-lg">Name</Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Muscle Group
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Description
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((entry, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap px-6 py-6 font-medium text-gray-900 dark:text-white">
                {entry.exerciseName}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.muscleGroupName}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-32 py-4 font-medium text-gray-900 dark:text-white">
                {entry.description.length < maxDescriptionSize
                  ? entry.description
                  : entry.description.substring(0, maxDescriptionSize) + "..."}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Exercises;
