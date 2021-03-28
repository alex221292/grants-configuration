package ru.sbrf.compliance.cocos.tools.authorization.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsData;

@Getter
@Setter
@NoArgsConstructor
public class GetGrantsResponse extends Response {

  private GetGrantsData data;

  public GetGrantsResponse(String status) {
    super(status);
  }

}
