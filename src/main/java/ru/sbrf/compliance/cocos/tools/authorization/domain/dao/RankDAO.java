package ru.sbrf.compliance.cocos.tools.authorization.domain.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.List;

@Repository
public interface RankDAO extends CrudRepository<Rank, Long> {

  List<Rank> findAll();

}
