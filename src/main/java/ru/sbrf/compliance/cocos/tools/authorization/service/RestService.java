package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.Response;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.GetAllOperationsService;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.UpdateSecurityMatrixFromQueryService;

@RestController
public class RestService {

  @Autowired
  GetAllOperationsService getAllOperationsService;
  @Autowired
  private UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService;

  @RequestMapping(value = "/data/update/all", method = RequestMethod.POST)
  public @ResponseBody
  Response updateAllData(@RequestBody ExecuteQueryRequest executeQueryRequest) {
    return updateSecurityMatrixFromQueryService.execute(executeQueryRequest);
  }

  @RequestMapping(value = "/data/grants/read", method = RequestMethod.POST)
  public @ResponseBody
  GetGrantsResponse readGrants() {
    return getAllOperationsService.execute();
  }

}
