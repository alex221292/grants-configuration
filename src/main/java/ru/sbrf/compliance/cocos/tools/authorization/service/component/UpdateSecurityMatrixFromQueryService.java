package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;

@Component
public class UpdateSecurityMatrixFromQueryService {

  private final JdbcTemplate jdbcTemplate;
  private final GrantsDataGenerator generator;

  public UpdateSecurityMatrixFromQueryService(
    JdbcTemplate jdbcTemplate,
    GrantsDataGenerator generator
  ) {
    this.jdbcTemplate = jdbcTemplate;
    this.generator = generator;
  }

  public GetGrantsResponse execute(ExecuteQueryRequest executeQueryRequest) {
    GetGrantsResponse response = new GetGrantsResponse();
    try {
      jdbcTemplate.execute(executeQueryRequest.getQuery());
      response.setData(generator.generate());
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
