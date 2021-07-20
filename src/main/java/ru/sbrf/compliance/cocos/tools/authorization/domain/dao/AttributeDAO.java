package ru.sbrf.compliance.cocos.tools.authorization.domain.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Attribute;

import java.util.List;

@Repository
public interface AttributeDAO extends CrudRepository<Attribute, Long> {

  List<Attribute> findAll();

}
