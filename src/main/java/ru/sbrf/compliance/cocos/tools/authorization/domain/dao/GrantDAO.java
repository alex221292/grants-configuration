package ru.sbrf.compliance.cocos.tools.authorization.domain.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.GrantKey;

import java.util.List;

@Repository
public interface GrantDAO extends CrudRepository<Grant, GrantKey> {

  List<Grant> findAll();

  @Query("SELECT g FROM Grant g JOIN Operation o ON o.code = ?1 JOIN Rank r ON r.code = ?2 WHERE g.operation.id = o.id AND g.rank.id = r.id")
  List<Grant> findAllByOperationCodeAndRankCode(String operationCode, String rankCode);

}
