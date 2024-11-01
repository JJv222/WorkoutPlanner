package com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Trening;

import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Exercise.ExerciseTreningAddPojo;

import java.util.Collection;

public class TreningPostPojo {
    private String date;
    private Integer seriesBreak;
    private Collection<ExerciseTreningAddPojo> exercises;

    public void setDate(String date) {
        this.date = date;
    }

    public void setSeriesBreak(Integer seriesBreak) {
        this.seriesBreak = seriesBreak;
    }

    public void setExercises(Collection<ExerciseTreningAddPojo> exercises) {
        this.exercises = exercises;
    }

    public String getDate() {
        return date;
    }

    public Integer getSeriesBreak() {
        return seriesBreak;
    }

    public Collection<ExerciseTreningAddPojo> getExercises() {
        return exercises;
    }
}
