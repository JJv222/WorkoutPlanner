package com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Exercise;

public class ExerciseTreningAddPojo {
    private Integer id;
    private Integer series;
    private Integer reps;
    private Integer breakTime;

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getId() {
        return id;
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
