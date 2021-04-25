package ru.sbrf.compliance.cocos.tools.authorization.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@Table(schema = "[authorization]", name = "[sessions]")
public class Session {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "\"session_id\"", nullable = false)
  private Long id;

  @Column(name = "\"session_key\"", nullable = false)
  private String key;

  @Column(name = "\"last_activity_datetime\"", nullable = false)
  private ZonedDateTime lastActivityDatetime;

}
