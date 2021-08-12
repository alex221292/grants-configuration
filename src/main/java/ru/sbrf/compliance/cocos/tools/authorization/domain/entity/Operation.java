package ru.sbrf.compliance.cocos.tools.authorization.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(schema = "[authorization]", name = "[operations]")
@NoArgsConstructor
public class Operation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "\"opr_id\"", nullable = false)
  private Long id;

  @Column(name = "\"code\"", nullable = false)
  private String code;

  @Column(name = "\"enabled\"", nullable = false)
  private boolean enabled;

}
