package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class UpdateGrantsBySqlScriptService {

  private final JdbcTemplate jdbcTemplate;

  public UpdateGrantsBySqlScriptService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }


}
