package com.JJv222.WorkoutPlannerBackend.Controllers;

import com.JJv222.WorkoutPlannerBackend.Services.WorkoutService;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/test")
public class WorkoutController {

    @Autowired
    private WorkoutService service;

    @GetMapping(path = "/waga")
    public @ResponseBody Iterable<Weight> test() {
        return service.getWeights();
    }
}
