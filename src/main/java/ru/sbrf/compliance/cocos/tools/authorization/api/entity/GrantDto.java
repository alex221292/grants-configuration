package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GrantDto {

  private String operationCode;
  private String rankCode;

  public GrantDto(String operationCode, String rankCode) {
    this.operationCode = operationCode;
    this.rankCode = rankCode;
  }

}
