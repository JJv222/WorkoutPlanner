package com.JJv222.WorkoutPlannerBackend.Repositories;

import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Weight;
import org.springframework.data.repository.CrudRepository;

public interface WeightRepository extends CrudRepository<Weight,Integer> {
}
