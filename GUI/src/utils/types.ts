export interface IWeight {
  id: number;
  weight: number;
  date: string;
}

export interface IExercise {
  id: number;
  exerciseName: string;
  muscleGroupName: string;
  description: string;
}

export interface IExercise {
  id: number;
  exerciseName: string;
  muscleGroupName: string;
  description: string;
}

export interface ITreningAdd {
  id: number;
  date: string;
  seriesBreak: number;
  exercises: IExerciseAdd[];
}

export interface IExerciseAdd {
  exerciseName: string;
  series: number;
  reps: number;
  breakTime: number;
}
