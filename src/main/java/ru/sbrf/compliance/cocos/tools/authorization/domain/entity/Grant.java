package ru.sbrf.compliance.cocos.tools.authorization.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "[authorization]", name = "[grants]")
public class Grant {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "\"grant_id\"", nullable = false)
  private Long id;

  @Embedded
  private GrantKey grantKey;

  @ManyToOne
  @MapsId("rankId")
  @JoinColumn(name = "\"rank_id\"")
  private Rank rank;

  @ManyToOne
  @MapsId("operationId")
  @JoinColumn(name = "\"opr_id\"")
  private Operation operation;

  @OneToMany(mappedBy = "grant")
  private Set<Attribute> attributes;

}
