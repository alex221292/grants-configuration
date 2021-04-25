package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.Request;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetScriptsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ToggleGrantRequest;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.*;

@RestController("/cib-grants")
public class RestService {

  private final GetAllOperationsService getAllOperationsService;
  private final UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService;
  private final ToggleGrantService toggleGrantService;
  private final SqlScriptsGenerationService sqlScriptsGenerationService;
  private final SessionService sessionService;

  public RestService(
    GetAllOperationsService getAllOperationsService,
    UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService,
    ToggleGrantService toggleGrantService,
    SqlScriptsGenerationService sqlScriptsGenerationService,
    SessionService sessionService
  ) {
    this.getAllOperationsService = getAllOperationsService;
    this.updateSecurityMatrixFromQueryService = updateSecurityMatrixFromQueryService;
    this.toggleGrantService = toggleGrantService;
    this.sqlScriptsGenerationService = sqlScriptsGenerationService;
    this.sessionService = sessionService;
  }

  @PostMapping(value = "/data/sql/update")
  public @ResponseBody
  GetGrantsResponse updateDataBySql(@RequestBody ExecuteQueryRequest request) {
    sessionService.processBySessionKey(request.getSessionKey());
    return updateSecurityMatrixFromQueryService.execute(request);
  }

  @PatchMapping(value = "/data/grant/toggle")
  public @ResponseBody
  GetGrantsResponse toggleGrant(@RequestBody ToggleGrantRequest request) {
    sessionService.processBySessionKey(request.getSessionKey());
    return toggleGrantService.execute(request);
  }

  @PostMapping(value = "/data/grants/read")
  public @ResponseBody
  GetGrantsResponse readGrants(@RequestBody Request request) {
    sessionService.processBySessionKey(request.getSessionKey());
    return getAllOperationsService.execute();
  }

  @GetMapping(value = "/data/sql/generate")
  public @ResponseBody
  GetScriptsResponse generateSql() {
    return sqlScriptsGenerationService.execute();
  }

}
