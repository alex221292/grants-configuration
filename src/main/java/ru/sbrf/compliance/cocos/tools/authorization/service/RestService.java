package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.service.component.*;

@RestController("/cib-grants")
public class RestService {

  private final UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService;

  public RestService(
    UpdateSecurityMatrixFromQueryService updateSecurityMatrixFromQueryService
  ) {
    this.updateSecurityMatrixFromQueryService = updateSecurityMatrixFromQueryService;
  }

  @PostMapping(value = "/data/sql/update")
  public @ResponseBody
  GetGrantsResponse updateDataBySql(@RequestBody ExecuteQueryRequest request) {
    return updateSecurityMatrixFromQueryService.execute(request);
  }

}
