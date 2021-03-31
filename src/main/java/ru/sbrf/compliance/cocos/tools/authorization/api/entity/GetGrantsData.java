package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class GetGrantsData {

  private List<Map<String, Object>> grants;
  private List<String> rankCodes;

}
