package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.AttributeDto;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsData;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.OperationDto;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.AttributeDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Attribute;
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
  private final AttributeDAO attributeDAO;

  public GrantsDataGenerator(
    GrantDAO grantDAO,
    OperationDAO operationDAO,
    RankDAO rankDAO,
    AttributeDAO attributeDAO
  ) {
    this.grantDAO = grantDAO;
    this.operationDAO = operationDAO;
    this.rankDAO = rankDAO;
    this.attributeDAO = attributeDAO;
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

      Map<String, Map<String, GrantDto>> result = new HashMap<>();
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
      List<Attribute> attributes = attributeDAO.findAll();
      operations.forEach(operation -> {
        Map<String, GrantDto> grantsMap = new LinkedHashMap<>();
        data.getRankCodes().forEach(rankCode -> grantsMap.put(
          rankCode,
          GrantDto.builder()
            .enabled(grants.stream().anyMatch(g -> g.getRank().getCode().equals(rankCode) && g.getOperation().getCode().equals(operation.getCode())))
            .attributes(getAttributeDtoByOperationAndRank(operation.getCode(), rankCode, attributes))
            .build()
        ));
        result.put(operation.getCode(), grantsMap);
      });

      return data;
    } else {
      return null;
    }
  }

  private List<AttributeDto> getAttributeDtoByOperationAndRank(String operationCode, String rankCode, List<Attribute> attributes) {
    return attributes.stream()
      .filter(a -> operationCode.equals(a.getGrant().getOperation().getCode()) && rankCode.equals(a.getGrant().getRank().getCode()))
      .map(
        foundAttribute -> AttributeDto.builder().code(foundAttribute.getCode()).value(foundAttribute.getValue()).build()
      ).collect(Collectors.toList());
  }

}
