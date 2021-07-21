package ru.sbrf.compliance.cocos.tools.authorization.api.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GetGrantsResponseData;

@Getter
@Setter
@NoArgsConstructor
public class GetGrantsResponse extends Response {

  private GetGrantsResponseData data;

}
