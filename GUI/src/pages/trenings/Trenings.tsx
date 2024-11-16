import React, { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import { API_GET_TRENINGS } from "../../utils/api_constants";
import { fetchData } from "../../utils/api";
import { IExerciseAdd, ITreningAdd } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { PaginationMy } from "../components/PaginationComponent";

const Trenings: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ITreningAdd[]>([]);
  const [groupedData, setGroupedData] = useState<Map<string, IExerciseAdd[]>>(
    new Map(),
  );
  const [loading, setLoading] = useState<boolean>(true);

  //pagination
  const itemsPerPage = 10;
  const [pagesAmmount, setPagesAmmount] = useState<number>(1);

  ///

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
  useEffect(() => {
    if (data && data.length > 0) {
      setPagesAmmount(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);
  // This function groups the exercises from the specified training by series
  const groupData = (id: number) => {
    let result: Map<string, IExerciseAdd[]> = new Map();
    const trening = data.find((x) => x.id === id);

    trening?.exercises.forEach((exercise) => {
      const series = exercise.series.toString();
      result.get(series)
        ? result.get(series)?.push(exercise)
        : result.set(series, [exercise]);
    });

    setGroupedData(result); // Save the grouped exercises for display in the mini table
  };

  return (
    <div className="container overflow-x-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Trenings
      </h1>
      <div>
        <Button onClick={handleAddTrening} className="mb-4 p-2">
          Add new Trening record
        </Button>
      </div>
      {loading ? (
        <p className="mb-4 text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        // Pass both groupData and groupedData as props to ExerciseTable
        <ExerciseTable
          data={data}
          groupData={groupData}
          groupedData={groupedData}
          handleEditTrening={handleEditTrening}
          pagesAmmount={pagesAmmount}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

interface ExerciseTableProps {
  data: ITreningAdd[];
  groupData: (id: number) => void;
  groupedData: Map<string, IExerciseAdd[]>;
  handleEditTrening: (id: number) => void;
  pagesAmmount: number;
  itemsPerPage: number;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({
  data,
  groupData,
  groupedData,
  handleEditTrening,
  pagesAmmount,
  itemsPerPage,
}) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxIndex, setMaxIndex] = useState(itemsPerPage - 1);
  const [minIndex, setMinIndex] = useState(0);

  const onPageChange = (page: number) => {
    setMaxIndex(page * itemsPerPage - 1);
    setMinIndex((page - 1) * itemsPerPage);
    setCurrentPage(page);
  };

  const toggleRow = (id: number) => {
    if (expandedRowId !== id) {
      groupData(id);
    }
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const displayWeight = (weight: number) => {
    if (weight === null || weight === 0) {
      return "";
    }
    return " " + weight + "kg";
  };

  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell className="px-6 py-4 text-lg">Id</Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">Date</Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.slice(minIndex, maxIndex + 1).map((entry) => (
            <React.Fragment key={entry.id}>
              {/* Main Training Row */}
              <Table.Row
                onClick={() => toggleRow(entry.id)}
                className="cursor-pointer bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {entry.id}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {entry.date}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap px-6 py-4">
                  <Button
                    onClick={() => handleEditTrening(entry.id)}
                    className="flex w-40 items-center justify-center text-center"
                  >
                    Copy
                  </Button>
                </Table.Cell>
              </Table.Row>

              {/* Expanded Exercises Row */}
              {expandedRowId === entry.id && (
                <Table.Row>
                  <Table.Cell colSpan={3} className="p-4">
                    <div className="overflow-x-auto">
                      {Array.from(groupedData.entries()).map(
                        ([series, exercises], index) => (
                          <div key={index} className="mb-4">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                              Series: {series}
                            </h3>
                            <Table>
                              <Table.Head>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>Repetitions</Table.HeadCell>
                                <Table.HeadCell>Break Time (s)</Table.HeadCell>
                              </Table.Head>
                              <Table.Body>
                                {exercises.map((exercise, i) => (
                                  <Table.Row
                                    key={i}
                                    className="bg-gray-50 dark:bg-gray-700"
                                  >
                                    <Table.Cell>
                                      {exercise.exerciseName}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {exercise.reps +
                                        displayWeight(exercise.weights)}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {exercise.breakTime}
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
      <PaginationMy
        currentPage={currentPage}
        pagesAmmount={pagesAmmount}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Trenings;
