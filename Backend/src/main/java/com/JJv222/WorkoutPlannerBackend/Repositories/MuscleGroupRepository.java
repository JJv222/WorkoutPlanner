package com.JJv222.WorkoutPlannerBackend.Repositories;

import com.JJv222.WorkoutPlannerBackend.Tables.Entities.MuscleGroup;
import org.springframework.data.repository.CrudRepository;

public interface MuscleGroupRepository extends CrudRepository<MuscleGroup,Integer> {

    default MuscleGroup findByName(String name){
        for(MuscleGroup muscleGroup : this.findAll()){
            if(muscleGroup.getName().equals(name)){
                return muscleGroup;
            }
        }
        return null;
    }

}
