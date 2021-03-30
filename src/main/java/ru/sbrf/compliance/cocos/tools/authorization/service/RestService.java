package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetScriptsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.Response;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ToggleGrantRequest;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.GetAllOperationsService;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.SqlScriptsGenerationService;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.ToggleGrantService;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.UpdateSecurityMatrixFromQueryService;

@RestController
public class RestService {

  private final GetAllOperationsService getAllOperationsService;
  private final UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService;
  private final ToggleGrantService toggleGrantService;
  private final SqlScriptsGenerationService sqlScriptsGenerationService;

  public RestService(
    GetAllOperationsService getAllOperationsService,
    UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService,
    ToggleGrantService toggleGrantService,
    SqlScriptsGenerationService sqlScriptsGenerationService
  ) {
    this.getAllOperationsService = getAllOperationsService;
    this.updateSecurityMatrixFromQueryService = updateSecurityMatrixFromQueryService;
    this.toggleGrantService = toggleGrantService;
    this.sqlScriptsGenerationService = sqlScriptsGenerationService;
  }

  @PostMapping(value = "/data/sql/update")
  public @ResponseBody
  Response updateDataBySql(@RequestBody ExecuteQueryRequest executeQueryRequest) {
    return updateSecurityMatrixFromQueryService.execute(executeQueryRequest);
  }

  @PatchMapping(value = "/data/grant/toggle")
  public @ResponseBody
  Response toggleGrant(@RequestBody ToggleGrantRequest toggleGrantRequest) {
    return toggleGrantService.execute(toggleGrantRequest);
  }

  @GetMapping(value = "/data/grants/read")
  public @ResponseBody
  GetGrantsResponse readGrants() {
    return getAllOperationsService.execute();
  }

  @GetMapping(value = "/data/sql/generate")
  public @ResponseBody
  GetScriptsResponse generateSql() {
    return sqlScriptsGenerationService.execute();
  }

}
