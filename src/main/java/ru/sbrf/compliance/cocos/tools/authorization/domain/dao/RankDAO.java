package ru.sbrf.compliance.cocos.tools.authorization.domain.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.List;

@Repository
public interface RankDAO extends CrudRepository<Rank, Long> {

  List<Rank> findAll();

  @Query("SELECT r FROM Rank r WHERE r.code = ?1")
  Rank findRankByCode(String rankCode);

}
