import React, { useEffect, useState } from "react";
import { Table, Modal, Button, TextInput } from "flowbite-react";
import { IExercise } from "../../utils/types";
import {
  API_GET_EXERCISES,
  API_POST_EXERCISE,
} from "../../utils/api_constants";
import { fetchData, postData } from "../../utils/api";

const Exercises: React.FC = () => {
  const DESCRIPTION_MAX_LENGTH = 50;

  const [data, setData] = useState<IExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newExercise, setNewExercise] = useState<IExercise>({
    id: 0,
    exerciseName: "",
    muscleGroupName: "",
    description: "",
  });

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

  const handleAddExercise = async () => {
    try {
      await postData(API_POST_EXERCISE, newExercise);
      setModalOpen(false);
      setNewExercise({
        id: 0,
        exerciseName: "",
        muscleGroupName: "",
        description: "",
      });
      const fetchedData = await fetchData(API_GET_EXERCISES, {});
      setData(fetchedData);
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container overflow-x-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Exercises
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The page shows your exercise records
      </p>
      <Button onClick={() => setModalOpen(true)} className="mb-4">
        Add Exercise
      </Button>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Add Exercise</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="Exercise Name"
              value={newExercise.exerciseName}
              onChange={(e) =>
                setNewExercise({ ...newExercise, exerciseName: e.target.value })
              }
              required
            />
            <TextInput
              type="text"
              placeholder="Muscle Group Name"
              value={newExercise.muscleGroupName}
              onChange={(e) =>
                setNewExercise({
                  ...newExercise,
                  muscleGroupName: e.target.value,
                })
              }
              required
            />
            <TextInput
              type="text"
              maxLength={DESCRIPTION_MAX_LENGTH}
              placeholder="Description"
              value={newExercise.description}
              onChange={(e) =>
                setNewExercise({ ...newExercise, description: e.target.value })
              }
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddExercise}>Submit</Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <p className="mb-4 text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <label
              htmlFor="items-per-page"
              className="mr-2 text-gray-700 dark:text-gray-300"
            >
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="rounded-md border"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <ExerciseTable data={paginatedData} />
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

const ExerciseTable: React.FC<{ data: IExercise[] }> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Exercise
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Muscle Group
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Description
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((entry) => (
            <Table.Row
              key={entry.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.exerciseName}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.muscleGroupName}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.description}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Exercises;
