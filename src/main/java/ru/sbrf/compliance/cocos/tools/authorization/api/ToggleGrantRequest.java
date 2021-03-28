package ru.sbrf.compliance.cocos.tools.authorization.api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToggleGrantRequest {

  private String operationCode;
  private String rankCode;

}
