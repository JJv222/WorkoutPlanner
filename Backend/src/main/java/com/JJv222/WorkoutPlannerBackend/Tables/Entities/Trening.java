package com.JJv222.WorkoutPlannerBackend.Tables.Entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity(name = "trening")
public final class Trening{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private Date date;

    @Column(name = "Series_break")
    private Integer SeriesBreak;

    @Override
    public String toString() {
        return "Trening{" +
                "id=" + id +
                ", name=" + name +
                ", description=" + description +
                ", date=" + date +
                ", breakTime=" + SeriesBreak +
                '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Integer getSeriesBreak() {
        return SeriesBreak;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Date getDate() {
        return date;
    }
}
