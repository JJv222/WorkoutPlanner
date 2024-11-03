package com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Trening;

import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Exercise.ExerciseTreningAddPojo;

import java.util.Collection;

public class TreningPostPojo {
    private Integer id;
    private String date;
    private Integer seriesBreak;
    private String comment;
    private Collection<ExerciseTreningAddPojo> exercises;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setSeriesBreak(Integer seriesBreak) {
        this.seriesBreak = seriesBreak;
    }

    public void setExercises(Collection<ExerciseTreningAddPojo> exercises) {
        this.exercises = exercises;
    }

    public Integer getId() {
        return id;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getComment() {
        return comment;
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
