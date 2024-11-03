package com.JJv222.WorkoutPlannerBackend.Tables.Entities;

import jakarta.persistence.*;

@Entity(name = "exercise_trening")
public final class ExerciseTrening {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "series")
    private Integer series;

    @Column(name = "repetitions")
    private Integer repetitions;

    @Column(name="break_time")
    private Integer breakTime;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "trening_id")
    private Trening trening;

    @Override
    public String toString() {
        return "ExerciseTrening{" +
                "id=" + id +
                ", series=" + series +
                ", repetitions=" + repetitions +
                ", breakTime=" + breakTime +
                ", exercise=" + exercise +
                ", trening=" + trening +
                '}';
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public void setRepetitions(Integer repetitions) {
        this.repetitions = repetitions;
    }

    public void setBreakTime(Integer breakTime) {
        this.breakTime = breakTime;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public void setTrening(Trening trening) {
        this.trening = trening;
    }

    public Long getId() {
        return id;
    }

    public Integer getSeries() {
        return series;
    }

    public Integer getRepetitions() {
        return repetitions;
    }

    public Integer getBreakTime() {
        return breakTime;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Trening getTrening() {
        return trening;
    }
}
