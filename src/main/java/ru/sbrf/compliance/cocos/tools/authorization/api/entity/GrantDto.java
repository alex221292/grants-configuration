package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GrantDto {

  private String operationCode;
  private List<RankDto> ranks;

}
