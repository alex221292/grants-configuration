package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class GenerateQueriesData {

  private Map<String, Map<String, Boolean>> grants;
  private List<String> operationCodes;
  private List<String> rankCodes;

}
