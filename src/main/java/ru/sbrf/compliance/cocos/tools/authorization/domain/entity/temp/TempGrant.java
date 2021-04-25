package ru.sbrf.compliance.cocos.tools.authorization.domain.entity.temp;

import lombok.Getter;
import lombok.Setter;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Attribute;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.GrantKey;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "[authorization]", name = "[grants]")
public class TempGrant {

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
