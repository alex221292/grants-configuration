package ru.sbrf.compliance.cocos.tools.authorization.domain.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Session;

@Repository
public interface SessionDAO extends CrudRepository<Session, Long> {

  @Query("SELECT s FROM Session s where key = ?1")
  Session findGrantByKey(String key);

}
