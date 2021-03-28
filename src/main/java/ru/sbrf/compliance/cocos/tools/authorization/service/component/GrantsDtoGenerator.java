package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.RankDto;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;

import java.util.LinkedList;
import java.util.List;

@Component
public class GrantsDtoGenerator {

  @Autowired
  private GrantDAO grantDAO;
  @Autowired
  private OperationDAO operationDAO;

  public List<GrantDto> generateGrantsFromRankCodes(List<String> rankCodes){
    List<GrantDto> result = new LinkedList<>();
    List<Operation> operations = operationDAO.findAll();
    List<Grant> grants = grantDAO.findAll();
    operations.forEach(operation -> {
      GrantDto grantDto = new GrantDto();
      result.add(grantDto);
      List<RankDto> ranks = new LinkedList<>();
      grantDto.setRanks(ranks);
      grantDto.setOperationCode(operation.getCode());
      rankCodes.forEach(rankCode -> {
        RankDto rankDto = new RankDto();
        ranks.add(rankDto);
        rankDto.setRankCode(rankCode);
        rankDto.setEnabled(
          grants.stream().anyMatch(g -> g.getRank().getCode().equals(rankCode) && g.getOperation().getCode().equals(operation.getCode()))
        );
      });
    });
    return result;
  }

}
