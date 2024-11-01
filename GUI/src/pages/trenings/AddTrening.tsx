import React, { useState, useEffect, ChangeEvent } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { IExercise, ITreningAdd, IExerciseAdd } from "../../utils/types";
import { API_GET_EXERCISES, API_ADD_TRENING } from "../../utils/api_constants";
import { fetchData, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddTrening: React.FC = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [newTraining, setNewTraining] = useState<ITreningAdd>({
    date: "",
    seriesBreak: 0,
    exercises: [],
  });
  const navigate = useNavigate();

  // Pobieranie ćwiczeń z bazy danych
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
      navigate("/treningi"); // Przekierowanie po zapisaniu
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
        Dodaj Nowy Trening
      </h1>
      <form className="space-y-4">
        {/* Pole daty */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Data
        </label>
        <TextInput
          type="date"
          value={newTraining.date}
          onChange={(e) =>
            setNewTraining({ ...newTraining, date: e.target.value })
          }
        />

        {/* Pole przerwy między seriami */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Przerwa między seriami (s)
        </label>
        <TextInput
          type="number"
          value={newTraining.seriesBreak.toString()}
          onChange={(e) =>
            setNewTraining({
              ...newTraining,
              seriesBreak: Number(e.target.value),
            })
          }
        />

        {/* Wybór ćwiczenia */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Wybierz ćwiczenie
        </label>
        <Select onChange={(e) => addSeriesFields(Number(e.target.value))}>
          <option value="">Wybierz ćwiczenie</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.exerciseName}>
              {exercise.exerciseName}
            </option>
          ))}
        </Select>

        {/* Dynamicznie generowane pola serii */}
        {newTraining.exercises.map((exercise, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Seria {index + 1} - Powtórzenia
            </label>
            <TextInput
              type="number"
              value={exercise.reps.toString()}
              onChange={(e) =>
                setNewTraining((prev) => {
                  const updatedExercises = [...prev.exercises];
                  updatedExercises[index].reps = Number(e.target.value);
                  return { ...prev, exercises: updatedExercises };
                })
              }
            />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Seria {index + 1} - Przerwa (s)
            </label>
            <TextInput
              type="number"
              value={exercise.break.toString()}
              onChange={(e) =>
                setNewTraining((prev) => {
                  const updatedExercises = [...prev.exercises];
                  updatedExercises[index].break = Number(e.target.value);
                  return { ...prev, exercises: updatedExercises };
                })
              }
            />
          </div>
        ))}

        <Button onClick={handleAddTraining}>Add your new trening record</Button>
      </form>
    </div>
  );
};

export default AddTrening;
