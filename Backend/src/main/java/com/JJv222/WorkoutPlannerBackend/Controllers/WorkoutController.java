package com.JJv222.WorkoutPlannerBackend.Controllers;

import com.JJv222.WorkoutPlannerBackend.Services.WorkoutService;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.ExercisePojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path = "/backend")
public class WorkoutController {

    @Autowired
    private WorkoutService service;

    @GetMapping(path = "/weights")
    public @ResponseBody Iterable<Weight> test() {
        return service.getWeights();
    }

    @GetMapping(path = "/exercises")
    public @ResponseBody List<ExercisePojo> getExercises() {
        return service.getExercises();
    }
}
