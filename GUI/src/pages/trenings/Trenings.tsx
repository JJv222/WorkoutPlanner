import React, { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import { API_GET_TRENINGS } from "../../utils/api_constants";
import { fetchData } from "../../utils/api";
import { IExerciseAdd, ITreningAdd } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const Trenings: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ITreningAdd[]>([]);
  const [groupedData, setGroupedData] = useState<Map<string, IExerciseAdd[]>>(
    new Map(),
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Paginacja
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const handleAddTrening = () => {
    navigate("/add-trening", { state: { isEdit: false } });
  };

  const handleEditTrening = (id: number) => {
    navigate("/add-trening", { state: { isEdit: true, treningId: id } });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData(API_GET_TRENINGS, {});
        setData(fetchedData);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  // Grupa ćwiczeń
  const groupData = (id: number) => {
    let result: Map<string, IExerciseAdd[]> = new Map();
    const trening = data.find((x) => x.id === id);

    trening?.exercises.forEach((exercise) => {
      const series = exercise.series.toString();
      result.get(series)
        ? result.get(series)?.push(exercise)
        : result.set(series, [exercise]);
    });

    setGroupedData(result);
  };

  // Paginacja
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container overflow-x-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Trenings
      </h1>
      <Button onClick={handleAddTrening} className="mb-4">
        Add new Trening
      </Button>

      {loading ? (
        <p>Loading...</p>
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
          <ExerciseTable
            data={paginatedData}
            groupData={groupData}
            groupedData={groupedData}
            handleEditTrening={handleEditTrening}
          />
          <div className="mt-4">
            <span className="mr-2 text-gray-700 dark:text-gray-300">
              Pages:
            </span>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 rounded-md px-3 py-1 ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                }`}
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
  data: ITreningAdd[];
  groupData: (id: number) => void;
  groupedData: Map<string, IExerciseAdd[]>;
  handleEditTrening: (id: number) => void;
}> = ({ data, groupData, groupedData, handleEditTrening }) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    if (expandedRowId !== id) {
      groupData(id);
    }
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.map((entry) => (
            <React.Fragment key={entry.id}>
              <Table.Row
                onClick={() => toggleRow(entry.id)}
                className="cursor-pointer"
              >
                <Table.Cell>{entry.id}</Table.Cell>
                <Table.Cell>{entry.date}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEditTrening(entry.id)}>
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
              {expandedRowId === entry.id && (
                <Table.Row>
                  <Table.Cell colSpan={3}>
                    <div>
                      {Array.from(groupedData.entries()).map(
                        ([series, exercises], index) => (
                          <div key={index}>
                            <h3>Series {series}</h3>
                            <Table>
                              <Table.Head>
                                <Table.HeadCell>Exercise</Table.HeadCell>
                                <Table.HeadCell>Reps</Table.HeadCell>
                                <Table.HeadCell>Weights</Table.HeadCell>
                                <Table.HeadCell>Break Time</Table.HeadCell>
                              </Table.Head>
                              <Table.Body>
                                {exercises.map((exercise, i) => (
                                  <Table.Row key={i}>
                                    <Table.Cell>
                                      {exercise.exerciseName}
                                    </Table.Cell>
                                    <Table.Cell>{exercise.reps}</Table.Cell>
                                    <Table.Cell>
                                      {exercise.weights} kg
                                    </Table.Cell>
                                    <Table.Cell>
                                      {exercise.breakTime} s
                                    </Table.Cell>
                                  </Table.Row>
                                ))}
                              </Table.Body>
                            </Table>
                          </div>
                        ),
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Trenings;
