package com.JJv222.WorkoutPlannerBackend.Services;

import com.JJv222.WorkoutPlannerBackend.Repositories.ExerciseRepository;
import com.JJv222.WorkoutPlannerBackend.Repositories.ExerciseTreningRepository;
import com.JJv222.WorkoutPlannerBackend.Repositories.TreningRepository;
import com.JJv222.WorkoutPlannerBackend.Repositories.WeightRepository;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    @Autowired
    private ExerciseTreningRepository exerciseTreningRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private TreningRepository treningRepository;

    @Autowired
    private WeightRepository weightRepository;

    public Iterable<Weight> getWeights(){
        return weightRepository.findAll();
    }
}
