package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.SessionDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Session;

import java.time.ZonedDateTime;

@Component
public class SessionService {

  private final SessionDAO sessionDAO;
  private final JdbcTemplate jdbcTemplate;


  public SessionService(SessionDAO sessionDAO, JdbcTemplate jdbcTemplate) {
    this.sessionDAO = sessionDAO;
    this.jdbcTemplate = jdbcTemplate;
  }

  public void processBySessionKey(String sessionKey) {
    Session currentSession = sessionDAO.findGrantByKey(sessionKey);
    if (currentSession == null) {
      currentSession = new Session();
      currentSession.setKey(sessionKey);
    }
    currentSession.setLastActivityDatetime(ZonedDateTime.now());
    sessionDAO.save(currentSession);
  }

  private void cleanUpOutdatedSessions() {
  }
}
