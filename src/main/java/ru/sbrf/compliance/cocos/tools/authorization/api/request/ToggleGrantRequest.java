package ru.sbrf.compliance.cocos.tools.authorization.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToggleGrantRequest extends Request {

  private String operationCode;
  private String rankCode;

}
