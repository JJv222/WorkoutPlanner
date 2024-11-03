package com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Exercise;

public class ExerciseTreningAddPojo {
    private String exerciseName;
    private Integer series;
    private Integer reps;
    private Integer breakTime;

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public void setBreakTime(Integer breakTime) {
        this.breakTime = breakTime;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public Integer getSeries() {
        return series;
    }

    public Integer getReps() {
        return reps;
    }

    public Integer getBreakTime() {
        return breakTime;
    }
}
