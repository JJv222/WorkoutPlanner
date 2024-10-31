package com.JJv222.WorkoutPlannerBackend.Controllers;

import com.JJv222.WorkoutPlannerBackend.Services.WorkoutService;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.ExerciseGetPojo;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.ExercisePostPojo;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.WeightPostPojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@Controller
@RequestMapping(path = "/backend")
public class WorkoutController {

    @Autowired
    private WorkoutService service;

    @GetMapping(path = "/weights")
    public @ResponseBody Iterable<Weight> getWeights() {
        return service.getWeights();
    }

    @GetMapping(path = "/exercises")
    public @ResponseBody List<ExerciseGetPojo> getExercises() {
        return service.getExercises();
    }

    //Posts
    @PostMapping(path = "/addExercise")
    public @ResponseBody String addExercise(@RequestBody ExercisePostPojo exercisePojo) {
        return service.addExercise(exercisePojo);
    }

    @PostMapping(path = "/addWeight")
    public @ResponseBody String addWeight(@RequestBody WeightPostPojo weight) {
        return service.addWeight(weight);
    }
}
