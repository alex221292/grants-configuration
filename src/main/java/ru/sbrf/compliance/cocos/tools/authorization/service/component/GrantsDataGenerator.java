package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsData;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.RankDto;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
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
    GetGrantsData data = new GetGrantsData();
    data.setRankCodes(rankDAO.findAll().stream()
      .map(Rank::getCode)
      .sorted()
      .distinct()
      .collect(Collectors.toList()));

    List<GrantDto> result = new LinkedList<>();
    List<Operation> operations = operationDAO.findAll();
    List<Grant> grants = grantDAO.findAll();
    operations.forEach(operation -> {
      GrantDto grantDto = new GrantDto();
      result.add(grantDto);
      List<RankDto> ranks = new LinkedList<>();
      grantDto.setRanks(ranks);
      grantDto.setOperationCode(operation.getCode());
      data.getRankCodes().forEach(rankCode -> {
        RankDto rankDto = new RankDto();
        ranks.add(rankDto);
        rankDto.setRankCode(rankCode);
        rankDto.setEnabled(
          grants.stream().anyMatch(g -> g.getRank().getCode().equals(rankCode) && g.getOperation().getCode().equals(operation.getCode()))
        );
      });
    });
    data.setGrants(result.stream().sorted(Comparator.comparing(GrantDto::getOperationCode)).collect(Collectors.toList()));

    return data;
  }

}
