package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import ru.sbrf.compliance.cocos.tools.authorization.RollbackException;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;

@Component
public class UpdateSecurityMatrixFromQueryService {

  private final JdbcTemplate jdbcTemplate;
  private final GrantsDataGenerator generator;
  private final PlatformTransactionManager transactionManager;

  public UpdateSecurityMatrixFromQueryService(
    JdbcTemplate jdbcTemplate,
    GrantsDataGenerator generator,
    PlatformTransactionManager transactionManager
  ) {
    this.jdbcTemplate = jdbcTemplate;
    this.generator = generator;
    this.transactionManager = transactionManager;
  }

  public GetGrantsResponse execute(ExecuteQueryRequest executeQueryRequest) {
    GetGrantsResponse response = new GetGrantsResponse();
    DefaultTransactionDefinition paramTransactionDefinition = new DefaultTransactionDefinition();
    TransactionStatus status = transactionManager.getTransaction(paramTransactionDefinition);
    try {
      jdbcTemplate.execute(executeQueryRequest.getQuery());
      response.setData(generator.generate());
      transactionManager.rollback(status);
      throw new RollbackException();
    } catch (RollbackException e) {
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
