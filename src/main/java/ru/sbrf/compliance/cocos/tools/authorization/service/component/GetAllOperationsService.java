package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetGrantsResponse;

@Component
public class GetAllOperationsService {

  private final GrantsDataGenerator generator;

  public GetAllOperationsService(GrantsDataGenerator generator) {
    this.generator = generator;
  }

  public GetGrantsResponse execute() {
    GetGrantsResponse response = new GetGrantsResponse();
    try {
      response.setData(generator.generate());
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

}
