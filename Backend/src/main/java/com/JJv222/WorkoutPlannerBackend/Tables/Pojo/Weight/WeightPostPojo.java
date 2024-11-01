package com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Weight;

public final class WeightPostPojo {
    private Integer weight;
    private String date;

    public boolean validateDateFormat() {
        return date.matches("\\d{4}-\\d{2}-\\d{2}");
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getWeight() {
        return weight;
    }

    public String getDate() {
        return date;
    }
}
