import React, { useEffect, useState } from "react";
import { Table, Modal, Button, TextInput } from "flowbite-react";
import { IWeight } from "../../utils/types";
import { API_GET_WEIGHTS, API_POST_WEIGHT } from "../../utils/api_constants";
import { fetchData, postData } from "../../utils/api";
import { PaginationMy } from "../components/PaginationComponent";

const Weights: React.FC = () => {
  const [data, setData] = useState<IWeight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newWeight, setNewWeight] = useState<IWeight>({
    id: 0,
    weight: 0,
    date: "",
  });

  // Paginacja
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleAddWeight = async () => {
    try {
      await postData(API_POST_WEIGHT, newWeight);
      setModalOpen(false);
      setNewWeight({ id: 0, weight: 0, date: "" });
      const fetchedData = await fetchData(API_GET_WEIGHTS, {});
      setData(fetchedData);
    } catch (error) {
      console.error("Failed to add weight:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData(API_GET_WEIGHTS, {});
        setData(fetchedData);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Resetuje stronę do pierwszej po zmianie liczby elementów na stronę
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="container overflow-x-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Weights
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        The page shows your weight records
      </p>
      <Button onClick={() => setModalOpen(true)} className="mb-4">
        Add Weight
      </Button>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Add Weight</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <TextInput
              type="number"
              placeholder="Weight (kg)"
              value={newWeight.weight || ""}
              onChange={(e) =>
                setNewWeight({ ...newWeight, weight: Number(e.target.value) })
              }
              required
            />
            <TextInput
              type="date"
              value={newWeight.date}
              onChange={(e) =>
                setNewWeight({ ...newWeight, date: e.target.value })
              }
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddWeight}>Submit</Button>
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
          <WeightTable
            data={paginatedData}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

interface IWeightTableProps {
  data: IWeight[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const WeightTable: React.FC<IWeightTableProps> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Weight (kg)</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.map((entry) => (
            <Table.Row
              key={entry.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{entry.date}</Table.Cell>
              <Table.Cell>{entry.weight}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="mt-4">
        <span className="mr-2 text-gray-700 dark:text-gray-300">Pages:</span>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`mx-1 rounded-md px-3 py-1 ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Weights;
