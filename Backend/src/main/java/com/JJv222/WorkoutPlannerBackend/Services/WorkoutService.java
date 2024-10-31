package com.JJv222.WorkoutPlannerBackend.Services;

import com.JJv222.WorkoutPlannerBackend.Repositories.ExerciseRepository;
import com.JJv222.WorkoutPlannerBackend.Repositories.ExerciseTreningRepository;
import com.JJv222.WorkoutPlannerBackend.Repositories.TreningRepository;
import com.JJv222.WorkoutPlannerBackend.Repositories.WeightRepository;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Exercise;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.ExercisePojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public List<ExercisePojo>  getExercises(){
       Iterable<Exercise> exercises = exerciseRepository.findAll();
       List<ExercisePojo> result = new ArrayList<>();
       exercises.forEach(x -> {
           ExercisePojo exercisePojo = new ExercisePojo();
           exercisePojo.setExerciseName(x.getName());
           exercisePojo.setDescription(x.getDescription());
           exercisePojo.setMuscleGroupName(x.getMuscleGroup().getName());
           result.add(exercisePojo);
       });
         return result;
    }
}
