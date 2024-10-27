package com.JJv222.WorkoutPlannerBackend.Controllers;

import com.JJv222.WorkoutPlannerBackend.Repositories.WeightRepository;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@Controller
@RequestMapping(path = "/test")
public class TestController {

    @Autowired
    private WeightRepository weightRepository;

    @PostMapping(path = "/add")
    public void add(@RequestParam Integer weight ,@RequestParam String date) {
        Weight newWeight = new Weight();
        newWeight.setWeight(weight);
        final Date sendDate = Date.valueOf(date);
        newWeight.setDate(sendDate);
        weightRepository.save(newWeight);
    }

    @GetMapping(path = "/waga")
    public @ResponseBody Iterable<Weight> test() {
        return weightRepository.findAll();
    }
}
