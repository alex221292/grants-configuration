package ru.sbrf.compliance.cocos.tools.authorization.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GetGrantsResponse extends Response {

  private List<GrantDto> grants;
  private List<String> operationCodes;
  private List<String> rankCodes;

  public GetGrantsResponse(String status) {
    super(status);
  }

}
