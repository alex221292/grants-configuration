package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.Response;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.AttributeDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;

@Component
public class UpdateSecurityMatrixFromQueryService {

  @Autowired
  private AttributeDAO attributeDAO;
  @Autowired
  private GrantDAO grantDAO;
  @Autowired
  private RankDAO rankDAO;
  @Autowired
  private OperationDAO operationDAO;
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public Response execute(ExecuteQueryRequest executeQueryRequest) {
    Response response = new Response();
    try {
      attributeDAO.deleteAll();
      grantDAO.deleteAll();
      operationDAO.deleteAll();
      rankDAO.deleteAll();

      jdbcTemplate.execute(executeQueryRequest.getQuery());

      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
