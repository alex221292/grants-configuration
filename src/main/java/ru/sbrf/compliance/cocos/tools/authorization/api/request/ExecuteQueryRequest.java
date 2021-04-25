package ru.sbrf.compliance.cocos.tools.authorization.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExecuteQueryRequest extends Request {

  private String query;

}
