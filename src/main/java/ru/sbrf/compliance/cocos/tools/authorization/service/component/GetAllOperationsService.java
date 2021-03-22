package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.stream.Collectors;

@Component
public class GetAllOperationsService {

  @Autowired
  private GrantDAO grantDAO;
  @Autowired
  private RankDAO rankDAO;
  @Autowired
  private OperationDAO operationDAO;

  public GetGrantsResponse execute() {
    GetGrantsResponse response = new GetGrantsResponse();
    try {
      response.setRankCodes(rankDAO.findAll().stream().map(Rank::getCode).collect(Collectors.toList()));
      response.setOperationCodes(operationDAO.findAll().stream().map(Operation::getCode).collect(Collectors.toList()));
      response.setGrants(
        grantDAO.findAll().stream().map(grant -> new GrantDto(grant.getOperation().getCode(), grant.getRank().getCode())
        ).collect(Collectors.toList())
      );
      response.setStatus("OK");
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus("ERROR");
    }
    return response;
  }

}
