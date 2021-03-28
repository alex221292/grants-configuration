package ru.sbrf.compliance.cocos.tools.authorization.domain.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;

import java.util.List;

@Repository
public interface OperationDAO extends CrudRepository<Operation, Long> {

  List<Operation> findAll();

  @Query("SELECT o FROM Operation o WHERE o.code = ?1")
  Operation findOperationByCode(String operationCode);

}
