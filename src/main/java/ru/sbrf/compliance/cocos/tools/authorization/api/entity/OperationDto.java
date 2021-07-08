package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OperationDto {

  private String operationCode;
  private boolean enabled;

}
