package ru.sbrf.compliance.cocos.tools.authorization.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Response {

  private ResponseCode status;

}
