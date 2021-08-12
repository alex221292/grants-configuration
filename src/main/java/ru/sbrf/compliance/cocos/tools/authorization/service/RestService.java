package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.GenerateQueriesRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetScriptsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.*;

@RestController("/cib-grants")
public class RestService {

  private final UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService;
  private final SqlScriptsGenerationService sqlScriptsGenerationService;

  public RestService(
    UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService,
    SqlScriptsGenerationService sqlScriptsGenerationService
  ) {
    this.updateSecurityMatrixFromQueryService = updateSecurityMatrixFromQueryService;
    this.sqlScriptsGenerationService = sqlScriptsGenerationService;
  }

  @PostMapping(value = "/data/sql/update")
  public @ResponseBody
  GetGrantsResponse updateDataBySql(@RequestBody ExecuteQueryRequest request) {
    return updateSecurityMatrixFromQueryService.execute(request);
  }

  @PostMapping(value = "/data/sql/generate")
  public @ResponseBody
  GetScriptsResponse generateSql(@RequestBody GenerateQueriesRequest request) {
    return sqlScriptsGenerationService.execute(request);
  }

}
