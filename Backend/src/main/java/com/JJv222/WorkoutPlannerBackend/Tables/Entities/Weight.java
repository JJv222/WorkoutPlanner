package com.JJv222.WorkoutPlannerBackend.Tables.Entities;

import jakarta.persistence.*;

import java.sql.Date;

@Entity(name = "weight")
public class Weight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "date")
    private Date date;

    @Override
    public String toString() {
        return "Weight{" +
                "id=" + id +
                ", weight=" + weight +
                ", date=" + date +
                '}';
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public Integer getWeight() {
        return weight;
    }

    public Date getDate() {
        return date;
    }
}
