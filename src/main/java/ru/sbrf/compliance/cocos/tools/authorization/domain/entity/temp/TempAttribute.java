package ru.sbrf.compliance.cocos.tools.authorization.domain.entity.temp;

import lombok.Getter;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(schema = "[authorization]", name = "[attributes]")
public class TempAttribute {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "\"atr_id\"", nullable = false)
  private Long id;

  @Column(name = "\"code\"", nullable = false)
  private String code;

  @Column(name = "\"value\"", nullable = false)
  private String value;

  @ManyToOne
  @JoinColumn(name = "\"grant_id\"")
  private Grant grant;

}
