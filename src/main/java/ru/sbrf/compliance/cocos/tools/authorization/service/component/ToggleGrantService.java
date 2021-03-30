package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.ToggleGrantRequest;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.GrantKey;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.List;

@Component
public class ToggleGrantService {

  private final GrantDAO grantDAO;
  private final RankDAO rankDAO;
  private final OperationDAO operationDAO;
  private final GrantsDataGenerator generator;

  public ToggleGrantService(GrantDAO grantDAO, RankDAO rankDAO, OperationDAO operationDAO, GrantsDataGenerator generator) {
    this.grantDAO = grantDAO;
    this.rankDAO = rankDAO;
    this.operationDAO = operationDAO;
    this.generator = generator;
  }

  public GetGrantsResponse execute(ToggleGrantRequest request) {
    GetGrantsResponse response = new GetGrantsResponse();
    try {
      List<Grant> grants = grantDAO.findAllByOperationCodeAndRankCode(request.getOperationCode(), request.getRankCode());
      if (grants != null && !grants.isEmpty()) {
        grants.forEach(grantDAO::delete);
      } else {
        Rank rank = rankDAO.findRankByCode(request.getRankCode());
        Operation operation = operationDAO.findOperationByCode(request.getOperationCode());
        if (rank != null && operation != null) {
          Grant grant = new Grant();
          GrantKey grantKey = new GrantKey();
          grantKey.setOperationId(operation.getId());
          grantKey.setRankId(rank.getId());
          grant.setGrantKey(grantKey);
          grant.setOperation(operation);
          grant.setRank(rank);
          grantDAO.save(grant);
        }
      }
      response.setData(generator.generate());
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
