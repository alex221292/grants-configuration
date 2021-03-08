package ru.sbrf.compliance.cocos.tools.authorization.api;

import lombok.Getter;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;

import java.util.List;

@Getter
@Setter
public class GetGrantsResponse extends Response {

  private List<GrantDto> grants;

  public GetGrantsResponse(String status) {
    super(status);
  }

}
