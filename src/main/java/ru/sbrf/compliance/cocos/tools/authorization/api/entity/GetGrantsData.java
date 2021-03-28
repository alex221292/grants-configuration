package ru.sbrf.compliance.cocos.tools.authorization.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetGrantsData {

  private List<GrantDto> grants;
  private List<String> rankCodes;

}
