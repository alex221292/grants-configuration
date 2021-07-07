package ru.sbrf.compliance.cocos.tools.authorization.api.request;

import lombok.Getter;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GenerateQueriesData;

@Getter
@Setter
public class GenerateQueriesRequest extends Request {

  private GenerateQueriesData data;

}
