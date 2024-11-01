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

export interface ITreningTable {
  id: number;
  date: string;
}

export interface IExercise {
  id: number;
  exerciseName: string;
  muscleGroupName: string;
  description: string;
}

export interface ITreningAdd {
  date: string;
  seriesBreak: number;
  exercises: IExerciseAdd[];
}

export interface IExerciseAdd {
  exerciseName: string;
  series: number;
  reps: number;
  break: number;
}
