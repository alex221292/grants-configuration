package ru.sbrf.compliance.cocos.tools.authorization.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class GrantKey implements Serializable {

  @Column(name = "\"rank_id\"")
  private Long rankId;

  @Column(name = "\"opr_id\"")
  private Long operationId;

}
