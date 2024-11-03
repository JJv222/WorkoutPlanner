package com.JJv222.WorkoutPlannerBackend.Repositories;

import com.JJv222.WorkoutPlannerBackend.Tables.Entities.ExerciseTrening;
import com.JJv222.WorkoutPlannerBackend.Tables.Entities.Trening;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

public interface ExerciseTreningRepository extends CrudRepository<ExerciseTrening,Long> {
    default List<ExerciseTrening> findAllByTrening(Trening trening) {
        final Integer id = trening.getId();
        final List<ExerciseTrening> result = new ArrayList<>();

        for(ExerciseTrening exerciseTrening : this.findAll()){
            if(exerciseTrening.getTrening().getId().equals(id)){
                result.add(exerciseTrening);
            }
        }
        return result;
    }

}
