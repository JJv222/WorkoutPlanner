package com.JJv222.WorkoutPlannerBackend.Tables.Pojo.Trening;

import java.sql.Date;

public class TreningGetTablePojo {
    private int id;
    private String date;

    public void setId(int id) {
        this.id = id;
    }

    public void setDate(String date) {
        if (date.matches("\\d{4}-\\d{2}-\\d{2}"))
            this.date = date;
    }

    public void setDate(Date date) {
        this.date = date.toString();
    }

    public int getId() {
        return id;
    }

    public String getDate() {
        return date;
    }
}
