import React, { useState, useEffect, ChangeEvent } from "react";
import { TextInput, Button, Select, Modal, Table } from "flowbite-react";
import { IExercise, IExerciseAdd, ITreningAdd } from "../../utils/types";
import {
  API_ADD_TRENING,
  API_GET_EXERCISES,
  API_GET_TRENING,
} from "../../utils/api_constants";
import { fetchData, postData } from "../../utils/api";
import { Datepicker } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";

const AddTrening: React.FC = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [treningDate, setTreningDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [seriesBreak, setSeriesBreak] = useState<number>(0);
  const [seriesAmmount, setSeriesAmmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSeries, setCurrentSeries] = useState<number | null>(null);
  const [exerciseDetails, setExerciseDetails] = useState<IExerciseAdd>({
    exerciseName: "",
    series: 0,
    reps: 0,
    breakTime: 0,
    weights: 0,
  });

  const [exerciseAll, setExerciseAll] = useState<IExerciseAdd[][]>([]);
  const navigate = useNavigate();

  const location = useLocation();
  const isEdit = location.state?.isEdit || false;
  const treningId = location.state?.treningId || null;

  //Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  ///
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

    if (isEdit) {
      fetchTreningData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, treningId]);

  const fetchTreningData = async () => {
    const uri = `${API_GET_TRENING}/${treningId}`;
    try {
      const fetchedTrening: ITreningAdd = await fetchData(uri, {});
      setTreningDate(fetchedTrening.date);
      setSeriesBreak(fetchedTrening.seriesBreak);

      const maxSeries = fetchedTrening.exercises.reduce((prev, current) => {
        return prev.series > current.series ? prev : current;
      }).series;
      setSeriesAmmount(maxSeries);

      const groupedExercises: IExerciseAdd[][] = [];
      fetchedTrening.exercises.forEach((exercise) => {
        const seriesIndex = exercise.series - 1;

        if (!groupedExercises[seriesIndex]) {
          groupedExercises[seriesIndex] = [];
        }

        groupedExercises[seriesIndex].push(exercise);
      });
      setExerciseAll(groupedExercises);
    } catch (e) {
      console.error("Error fetching trening data:", e);
    }
  };

  const openModal = (seriesNumber: number) => {
    setCurrentSeries(seriesNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSeries(null);
  };

  const openEditModal = (exerciseIndex: number, seriesNumber: number) => {
    setCurrentSeries(seriesNumber);
    const temp: IExerciseAdd = exerciseAll[seriesNumber][exerciseIndex];
    setExerciseDetails(temp);
    setExitedIndex(exerciseIndex);

    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentSeries(null);
    setExitedIndex(null);
  };

  const handleExerciseChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setExerciseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const addExerciseToSeries = () => {
    if (!currentSeries) return;
    const exerciseWithSeries = { ...exerciseDetails, series: currentSeries };

    setExerciseAll((prev) => {
      const updatedExercises = [...prev];
      updatedExercises[currentSeries - 1] = [
        ...(updatedExercises[currentSeries - 1] || []),
        exerciseWithSeries,
      ];
      return updatedExercises;
    });

    clearExerciseDetails();
  };

  const clearExerciseDetails = () => {
    setExerciseDetails({
      exerciseName: "",
      series: 0,
      reps: 0,
      breakTime: 0,
      weights: 0,
    });
  };

  const [exitedIndex, setExitedIndex] = useState<number | null>(null);

  const saveEdited = () => {
    if (currentSeries == null) return;
    if (exitedIndex == null) return;
    exerciseAll[currentSeries][exitedIndex] = exerciseDetails;
    closeEditModal();
  };

  const saveChanges = async () => {
    const newTraining = {
      date: treningDate,
      seriesBreak: seriesBreak,
      seriesAmount: seriesAmmount,
      exercises: exerciseAll.flat(),
    };
    try {
      await postData(API_ADD_TRENING, newTraining);
    } catch (error) {
      console.error("Failed to save training:", error);
    }

    navigate("/trenings");
  };

  const saveAllExercises = () => {
    if (!currentSeries) return;
    clearExerciseDetails();
    closeModal();
  };

  const cancelAdding = () => {
    clearExerciseDetails();
    closeModal();
  };

  const SaveTraining = async () => {
    const newTraining = {
      date: treningDate,
      seriesBreak: seriesBreak,
      seriesAmount: seriesAmmount,
      exercises: exerciseAll.flat(),
    };

    try {
      await postData(API_ADD_TRENING, newTraining);
    } catch (error) {
      console.error("Failed to save training:", error);
    }

    navigate("/trenings");
  };

  const GenerateExerciseButtons = () => {
    const buttons = [];
    for (let i = 1; i <= seriesAmmount; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          onClick={() => openModal(i)}
          className="me-2 mt-4 rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
        >
          Add Series {i}
        </button>,
      );
    }
    return buttons;
  };
  const displayWeight = (weight: number) => {
    if (weight === null || weight === 0) {
      return "";
    }
    return " " + weight + "kg";
  };
  const GenerateExercisesTablePerSeries = () => {
    if (!currentSeries) return null;
    const currentExercises = exerciseAll[currentSeries - 1] || [];

    return (
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th className="text-left">Exercise</th>
            <th className="text-left">Reps</th>
            <th className="text-left">Break Time</th>
          </tr>
        </thead>
        <tbody>
          {currentExercises.map((exercise, index) => (
            <tr key={index}>
              <td>{exercise.exerciseName}</td>
              <td>{exercise.reps + displayWeight(exercise.weights)}</td>
              <td>{exercise.breakTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        {isEdit ? "Edit Trening" : "Add new Trening"}
      </h1>
      <form>
        <Datepicker
          required
          value={new Date(treningDate)}
          onChange={(date: Date | null) => {
            if (date) {
              setTreningDate(date.toISOString().split("T")[0]);
            }
          }}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />

        <label
          htmlFor="seriesBreak"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Series Break [s]
        </label>
        <input
          type="number"
          id="seriesBreak"
          value={seriesBreak}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
          onChange={(e) => setSeriesBreak(Number(e.target.value))}
        />
        <label
          htmlFor="seriesAmmount"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Series Amount
        </label>
        <input
          type="number"
          id="seriesAmmount"
          value={seriesAmmount}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            Number(e.target.value) < 15
              ? setSeriesAmmount(Number(e.target.value))
              : setSeriesAmmount(15)
          }
        />
        {GenerateExerciseButtons()}
        <Button
          className="mt-4 justify-center px-10 py-2"
          //type="submit"
          onClick={isEdit ? saveChanges : SaveTraining}
        >
          {isEdit ? "Save Changes" : "Save Trening"}
        </Button>
      </form>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>Add Exercise to Series {currentSeries}</Modal.Header>
        <Modal.Body>
          <Select
            name="exerciseName"
            value={exerciseDetails.exerciseName}
            onChange={handleExerciseChange}
            className="block w-full"
          >
            <option value="">Select an exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.exerciseName}>
                {exercise.exerciseName}
              </option>
            ))}
          </Select>
          <label>Repetitions</label>
          <TextInput
            type="number"
            name="reps"
            value={exerciseDetails.reps}
            placeholder="Reps"
            onChange={handleExerciseChange}
          />
          <label>Break Time (s)</label>
          <TextInput
            type="number"
            name="breakTime"
            value={exerciseDetails.breakTime}
            placeholder="Break Time"
            onChange={handleExerciseChange}
          />
          <label>Weights (kg) - leave empty if you don't use weights</label>
          <TextInput
            type="number"
            name="weights"
            value={exerciseDetails.weights}
            placeholder="Weights"
            onChange={handleExerciseChange}
          />
          {GenerateExercisesTablePerSeries()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addExerciseToSeries}>Add Exercise</Button>
          <Button onClick={saveAllExercises}>Save Exercises</Button>
          <Button color="red" onClick={cancelAdding}>
            Clear Serries
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Modal for updating*/}
      <Modal show={isEditModalOpen} onClose={closeEditModal}>
        <Modal.Header>
          Edit exersises in the trening session {currentSeries}
        </Modal.Header>
        <Modal.Body>
          <Select
            name="exerciseName"
            value={exerciseDetails.exerciseName}
            onChange={handleExerciseChange}
            className="block w-full"
          >
            <option value="">Select an exercise</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.exerciseName}>
                {exercise.exerciseName}
              </option>
            ))}
          </Select>
          <TextInput
            type="number"
            name="reps"
            value={exerciseDetails.reps}
            placeholder="Reps"
            onChange={handleExerciseChange}
          />
          <TextInput
            type="number"
            name="breakTime"
            value={exerciseDetails.breakTime}
            placeholder="Break Time"
            onChange={handleExerciseChange}
          />
          <TextInput
            type="number"
            name="weights"
            value={exerciseDetails.weights}
            placeholder="Weights"
            onChange={handleExerciseChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={saveEdited}>Save Changes</Button>
          <Button color="red" onClick={cancelAdding}>
            Clear Series
          </Button>
        </Modal.Footer>
      </Modal>
      {/*info table*/}
      <>
        {exerciseAll.map((seriesExercises, seriesIndex) => (
          <div key={seriesIndex} className="mt-4">
            <h1 className="mb-4 text-center text-2xl font-semibold text-gray-900 dark:text-white ">
              Series {seriesIndex + 1}
            </h1>
            <Table className="w-full">
              <Table.Head>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Repetitions</Table.HeadCell>
                <Table.HeadCell>Break Time (s)</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {seriesExercises.map((exercise, exerciseIndex) => (
                  <Table.Row
                    key={`${seriesIndex}-${exerciseIndex}`}
                    className="bg-gray-50 dark:bg-gray-700"
                  >
                    <Table.Cell>{exercise.exerciseName}</Table.Cell>
                    <Table.Cell>
                      {exercise.reps + displayWeight(exercise.weights)}
                    </Table.Cell>
                    <Table.Cell>{exercise.breakTime}</Table.Cell>
                    <button
                      key={exerciseIndex}
                      type="button"
                      onClick={() =>
                        openEditModal(exerciseIndex, exercise.series - 1)
                      }
                      className="me-2 mt-4 rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
                    >
                      Update Exercise
                    </button>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ))}
      </>
    </div>
  );
};

export default AddTrening;
