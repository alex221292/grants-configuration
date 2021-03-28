package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.ToggleGrantRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsData;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.GrantKey;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ToggleGrantService {

  @Autowired
  private GrantDAO grantDAO;
  @Autowired
  private RankDAO rankDAO;
  @Autowired
  private OperationDAO operationDAO;
  @Autowired
  private GrantsDtoGenerator generator;

  public GetGrantsResponse execute(ToggleGrantRequest request) {
    GetGrantsResponse response = new GetGrantsResponse();
    try {
      List<Grant> grants = grantDAO.findAllByOperationCodeAndRankCode(request.getOperationCode(), request.getRankCode());
      if (grants != null && !grants.isEmpty()) {
        grants.forEach(grant -> grantDAO.delete(grant));
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

      GetGrantsData data = new GetGrantsData();
      response.setData(data);
      data.setRankCodes(rankDAO.findAll().stream()
        .map(Rank::getCode)
        .distinct()
        .collect(Collectors.toList()));
      data.setGrants(generator.generateGrantsFromRankCodes(data.getRankCodes()));

      response.setStatus("OK");
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus("ERROR");
    }
    return response;
  }

}
