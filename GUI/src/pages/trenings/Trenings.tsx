import React, { useEffect, useState, ChangeEvent } from "react";
import { Table, Modal, Button, TextInput, Select } from "flowbite-react";
import {
  ITreningTable,
  IExercise,
  ITreningAdd,
  IExerciseAdd,
} from "../../utils/types";
import {
  API_GET_TRENINGS,
  API_GET_EXERCISES,
  API_ADD_TRENING,
} from "../../utils/api_constants";
import { fetchData, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Trenings: React.FC = () => {
  const DESCRIPTION_MAX_LENGTH = 50;
  const navigate = useNavigate();
  const [data, setData] = useState<ITreningTable[]>([]);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newTraining, setNewTraining] = useState<ITreningAdd>({
    date: "",
    seriesBreak: 0,
    exercises: [],
  });

  // Fetch treningi
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

  // Fetch ćwiczenia do listy rozwijalnej
  useEffect(() => {
    const getExercises = async () => {
      try {
        const fetchedExercises = await fetchData(API_GET_EXERCISES, {});
        setExercises(fetchedExercises);
      } catch (e) {
        console.error(e);
      }
    };
    getExercises();
  }, []);

  // Funkcja do dodania nowej serii ćwiczeń
  const addSeriesFields = (series: number) => {
    const exerciseAdd: IExerciseAdd[] = Array.from({ length: series }, () => ({
      exerciseName: "",
      series: series,
      reps: 0,
      break: 0,
    }));
    setNewTraining((prev) => ({
      ...prev,
      exercises: exerciseAdd,
    }));
  };

  // Obsługa dodania treningu
  const handleAddTraining = async () => {
    try {
      await postData(API_ADD_TRENING, newTraining);
      setModalVisible(false);
      setNewTraining({
        date: "",
        seriesBreak: 0,
        exercises: [],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container overflow-x-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Trenings
      </h1>
      <div>
        <Button onClick={() => navigate("/add-trening")}>
          Add new Trening recortd
        </Button>
        {/* Reszta kodu strony */}
      </div>
      <ExerciseTable data={data} />
    </div>
  );
};

const ExerciseTable: React.FC<{ data: ITreningTable[] }> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table
        striped
        hoverable
        className="rounded-lg border-none dark:bg-gray-800"
      >
        <Table.Head>
          <Table.HeadCell className="px-6 py-4 text-lg">
            Trenings
          </Table.HeadCell>
          <Table.HeadCell className="px-6 py-4 text-lg">Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((entry) => (
            <Table.Row
              key={entry.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {entry.date}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Trenings;
