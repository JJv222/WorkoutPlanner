package com.JJv222.WorkoutPlannerBackend.Services;

import com.JJv222.WorkoutPlannerBackend.Repositories.*;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Exercise;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.ExerciseGetPojo;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.ExercisePostPojo;
import com.JJv222.WorkoutPlannerBackend.Tables.Pojo.WeightPostPojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public final class WorkoutService {

    @Autowired
    private MuscleGroupRepository muscleGroupRepository;

    @Autowired
    private ExerciseTreningRepository exerciseTreningRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private TreningRepository treningRepository;

    @Autowired
    private WeightRepository weightRepository;

    public Iterable<Weight> getWeights() {
        return weightRepository.findAll();
    }

    public List<ExerciseGetPojo> getExercises() {
        Iterable<Exercise> exercises = exerciseRepository.findAll();
        List<ExerciseGetPojo> result = new ArrayList<>();
        exercises.forEach(x -> {
            ExerciseGetPojo exercisePojo = new ExerciseGetPojo();
            exercisePojo.setId(x.getId());
            exercisePojo.setExerciseName(x.getName());
            exercisePojo.setDescription(x.getDescription());
            exercisePojo.setMuscleGroupName(x.getMuscleGroup().getName());
            result.add(exercisePojo);
        });
        return result;
    }

    //Posts
    public String addExercise(final ExercisePostPojo exercisePojo) {
        Exercise exercise = new Exercise();
        exercise.setName(exercisePojo.getExerciseName());
        exercise.setDescription(exercisePojo.getDescription());
        exercise.setMuscleGroup(muscleGroupRepository.findByName(exercisePojo.getMuscleGroupName()));
        exerciseRepository.save(exercise);
        return "Exercise added";
    }

    public String addWeight(final WeightPostPojo weight) {
        if (weight.validateDateFormat()) {
            Weight weightEntity = new Weight();
            weightEntity.setWeight(weight.getWeight());
            weightEntity.setDate(Date.valueOf(weight.getDate()));
            weightRepository.save(weightEntity);
            return "Weight added";
        }
        return "Error accured during adding weight [500]";
    }
}
