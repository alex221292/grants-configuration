package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class GenerateQueriesRequestData {

  private Map<String, Map<String, GrantDto>> grants;
  private List<OperationDto> operations;
  private List<String> rankCodes;

}
