package com.JJv222.WorkoutPlannerBackend.Tables.Pojo;

public class ExercisePojo {
    private String exerciseName;
    private String muscleGroupName;
    private String description;

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public void setMuscleGroupName(String muscleGroupName) {
        this.muscleGroupName = muscleGroupName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public String getMuscleGroupName() {
        return muscleGroupName;
    }

    public String getDescription() {
        return description;
    }
}
