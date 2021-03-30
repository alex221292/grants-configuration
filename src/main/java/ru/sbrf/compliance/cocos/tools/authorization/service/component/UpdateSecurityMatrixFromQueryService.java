package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.Response;

@Component
public class UpdateSecurityMatrixFromQueryService {

  private final JdbcTemplate jdbcTemplate;

  public UpdateSecurityMatrixFromQueryService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public Response execute(ExecuteQueryRequest executeQueryRequest) {
    Response response = new Response();
    try {
      jdbcTemplate.execute(executeQueryRequest.getQuery());

      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
