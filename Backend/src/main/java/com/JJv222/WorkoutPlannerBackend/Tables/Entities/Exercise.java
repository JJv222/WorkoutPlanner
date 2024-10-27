package com.JJv222.WorkoutPlannerBackend.Tables.Entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity(name = "exercise")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Override
    public String toString() {
        return "Exercise{" +
                "id=" + id +
                ", name=" + name +
                ", description=" + description +
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

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}