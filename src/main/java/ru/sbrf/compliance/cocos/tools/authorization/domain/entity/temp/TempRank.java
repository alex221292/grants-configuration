package ru.sbrf.compliance.cocos.tools.authorization.domain.entity.temp;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(schema = "[authorization]", name = "[ranks]")
public class TempRank {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "\"rank_id\"", nullable = false)
  private Long id;

  @Column(name = "\"code\"", nullable = false)
  private String code;

}
