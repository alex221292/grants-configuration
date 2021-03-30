package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsData;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.stream.Collectors;

@Component
public class GetAllOperationsService {

  @Autowired
  private RankDAO rankDAO;
  @Autowired
  private GrantsDtoGenerator generator;

  public GetGrantsResponse execute() {
    GetGrantsResponse response = new GetGrantsResponse();
    try {
      GetGrantsData data = new GetGrantsData();
      response.setData(data);
      data.setRankCodes(rankDAO.findAll().stream()
        .map(Rank::getCode)
        .distinct()
        .collect(Collectors.toList()));
      data.setGrants(generator.generateGrantsFromRankCodes(data.getRankCodes()));
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
