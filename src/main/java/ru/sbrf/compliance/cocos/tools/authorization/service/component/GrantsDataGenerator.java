package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsData;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.OperationDto;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class GrantsDataGenerator {

  private final RankDAO rankDAO;
  private final GrantDAO grantDAO;
  private final OperationDAO operationDAO;

  public GrantsDataGenerator(GrantDAO grantDAO, OperationDAO operationDAO, RankDAO rankDAO) {
    this.grantDAO = grantDAO;
    this.operationDAO = operationDAO;
    this.rankDAO = rankDAO;
  }

  public GetGrantsData generate(){
    List<Rank> ranks = rankDAO.findAll();
    if (!ranks.isEmpty()) {
      GetGrantsData data = new GetGrantsData();
      data.setRankCodes(ranks.stream()
        .map(Rank::getCode)
        .sorted()
        .distinct()
        .collect(Collectors.toList()));

      Map<String, Map<String, Object>> result = new HashMap<>();
      data.setGrants(result);
      List<Operation> operations = operationDAO.findAll().stream().sorted(Comparator.comparing(Operation::getCode)).collect(Collectors.toList());
      data.setOperations(operations.stream()
        .map(o -> OperationDto.builder().enabled(o.isEnabled()).operationCode(o.getCode()).build())
        .sorted(
          Comparator.comparing((OperationDto::getOperationCode))
        )
        .distinct()
        .collect(Collectors.toList()));

      List<Grant> grants = grantDAO.findAll();
      operations.forEach(operation -> {
        Map<String, Object> grantsMap = new LinkedHashMap<>();
        data.getRankCodes().forEach(rankCode -> grantsMap.put(
          rankCode,
          grants.stream().anyMatch(g -> g.getRank().getCode().equals(rankCode) && g.getOperation().getCode().equals(operation.getCode()))
        ));
        result.put(operation.getCode(), grantsMap);
      });

      return data;
    } else {
      return null;
    }
  }

}
