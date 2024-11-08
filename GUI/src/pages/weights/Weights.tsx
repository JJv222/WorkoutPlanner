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

  //pagination
  const itemsPerPage = 2;
  const [pagesAmmount, setPagesAmmount] = useState<number>(1);

  ///

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

  useEffect(() => {
    if (data && data.length > 0) {
      setPagesAmmount(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);

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
          <WeightTable
            data={data}
            pagesAmmount={pagesAmmount}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
};

interface IWeightTableProps {
  data: IWeight[];
  pagesAmmount: number;
  itemsPerPage: number;
}

const WeightTable: React.FC<IWeightTableProps> = ({
  data,
  pagesAmmount,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxIndex, setMaxIndex] = useState(itemsPerPage - 1);
  const [minIndex, setMinIndex] = useState(0);

  const onPageChange = (page: number) => {
    setMaxIndex(page * itemsPerPage - 1);
    setMinIndex((page - 1) * itemsPerPage);
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell className="px-6 py-4 text-lg">Date</Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Weight (kg)
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.slice(minIndex, maxIndex + 1).map((entry) => (
            <Table.Row
              key={entry.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.date}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.weight}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <PaginationMy
        currentPage={currentPage}
        pagesAmmount={pagesAmmount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Weights;
