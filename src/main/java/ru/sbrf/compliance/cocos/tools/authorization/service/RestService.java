package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.Response;
import ru.sbrf.compliance.cocos.tools.authorization.api.ToggleGrantRequest;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.GetAllOperationsService;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.ToggleGrantService;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.UpdateSecurityMatrixFromQueryService;

@RestController
public class RestService {

  @Autowired
  private GetAllOperationsService getAllOperationsService;
  @Autowired
  private UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService;
  @Autowired
  private ToggleGrantService toggleGrantService;

  @PutMapping(value = "/data/update/all")
  public @ResponseBody
  Response updateAllData(@RequestBody ExecuteQueryRequest executeQueryRequest) {
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

}
