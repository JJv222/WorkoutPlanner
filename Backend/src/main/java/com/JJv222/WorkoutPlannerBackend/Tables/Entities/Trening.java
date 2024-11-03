package com.JJv222.WorkoutPlannerBackend.Tables.Entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity(name = "trening")
public final class Trening{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "date")
    private Date date;

    @Column(name = "Series_break")
    private Integer SeriesBreak;

    @Override
    public String toString() {
        return "Trening{" +
                "id=" + id +
                ", date=" + date +
                ", breakTime=" + SeriesBreak +
                ", comment='" + comment + '\'' +
                '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDate(String date) {
        if(date.matches("\\d{4}-\\d{2}-\\d{2}"))
        this.date = Date.valueOf(date);
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setSeriesBreak(Integer breakTime) {
        this.SeriesBreak = breakTime;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getSeriesBreak() {
        return SeriesBreak;
    }

    public Integer getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }

    public Date getDate() {
        return date;
    }
}
