package ru.sbrf.compliance.cocos.tools.authorization.api.request;

import lombok.Getter;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GenerateQueriesRequestData;

@Getter
@Setter
public class GenerateQueriesRequest extends Request {

  private GenerateQueriesRequestData data;

}
