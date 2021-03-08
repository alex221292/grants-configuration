package ru.sbrf.compliance.cocos.tools.authorization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ru.sbrf.compliance.cocos.tools.authorization.api.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.ExecuteQueryRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.Response;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.AttributeDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RestService {

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

  @RequestMapping(value = "/data/update/all", method = RequestMethod.POST)
  public @ResponseBody
  Response updateAllData(@RequestBody ExecuteQueryRequest executeQueryRequest) {
    attributeDAO.deleteAll();
    grantDAO.deleteAll();
    operationDAO.deleteAll();
    rankDAO.deleteAll();
    try {
      jdbcTemplate.execute(executeQueryRequest.getQuery());
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return new Response("OK");
  }

  @RequestMapping(value = "/data/grants/read", method = RequestMethod.POST)
  public @ResponseBody
  GetGrantsResponse readGrants() {
    List<Grant> grants = grantDAO.findAll();
    GetGrantsResponse response = new GetGrantsResponse("OK");
    response.setGrants(
        grants.stream().map(grant -> new GrantDto(grant.getOperation().getCode(), grant.getRank().getCode())).collect(Collectors.toList())
    );
    return response;
  }

}
