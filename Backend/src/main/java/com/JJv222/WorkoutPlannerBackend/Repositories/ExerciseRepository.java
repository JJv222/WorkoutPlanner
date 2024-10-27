package com.JJv222.WorkoutPlannerBackend.Repositories;

import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Exercise;
import org.springframework.data.repository.CrudRepository;

public interface ExerciseRepository extends CrudRepository<Exercise, Integer> {
}
