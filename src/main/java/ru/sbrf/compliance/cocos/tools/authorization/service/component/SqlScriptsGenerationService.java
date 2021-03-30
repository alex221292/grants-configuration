package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetScriptsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Grant;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Operation;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.Rank;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SqlScriptsGenerationService {

  private static final String DELETE_FROM_ATTRIBUTES_QUERY = "delete from [authorization].[attributes];";
  private static final String DELETE_FROM_GRANTS_QUERY = "delete from [authorization].[grants];";
  private static final String DELETE_FROM_OPERATIONS_QUERY = "delete from [authorization].[operations];";
  private static final String DELETE_FROM_RANKS_QUERY = "delete from [authorization].[ranks];";

  private static final String INSERT_INTO_OPERATIONS_QUERY = "INSERT INTO [authorization].[operations] ([code], [enabled]) VALUES (N'%s', %s);";
  private static final String INSERT_INTO_RANKS_QUERY = "INSERT INTO [authorization].[ranks] ([code]) VALUES (N'%s');";
  private static final String INSERT_INTO_GRANTS_QUERY = "INSERT INTO [authorization].[grants] ([rank_id], [opr_id])" +
    " SELECT r.[rank_id], o.[opr_id]" +
    " FROM [authorization].[ranks] r" +
    " LEFT JOIN [authorization].[operations] o ON o.[code] = '%s'" +
    " WHERE r.[code] = '%s';";

  private final RankDAO rankDAO;
  private final OperationDAO operationDAO;
  private final GrantDAO grantDAO;

  public SqlScriptsGenerationService(RankDAO rankDAO, OperationDAO operationDAO, GrantDAO grantDAO) {
    this.rankDAO = rankDAO;
    this.operationDAO = operationDAO;
    this.grantDAO = grantDAO;
  }

  public GetScriptsResponse execute() {
    GetScriptsResponse response = new GetScriptsResponse();
    try {
      response.setScripts(generateQueries());
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

  private List<String> generateQueries() {
    List<String> scripts = new LinkedList<>();
    appendDeleteScripts(scripts);
    appendInsertOperationsScripts(scripts);
    appendInsertRanksScripts(scripts);
    appendInsertGrantsScripts(scripts);
    return scripts;
  }

  private void appendDeleteScripts(List<String> scripts) {
    scripts.add("/* 1. Cleanup part */");
    scripts.add(DELETE_FROM_ATTRIBUTES_QUERY);
    scripts.add(DELETE_FROM_GRANTS_QUERY);
    scripts.add(DELETE_FROM_OPERATIONS_QUERY);
    scripts.add(DELETE_FROM_RANKS_QUERY);
  }

  private void appendInsertOperationsScripts(List<String> scripts) {
    scripts.add("/* 2. Operations insert part */");
    List<Operation> operations = operationDAO.findAll()
      .stream()
      .sorted(Comparator.comparing(Operation::getCode))
      .collect(Collectors.toList());
    operations.forEach(operation -> scripts.add(
      String.format(
        INSERT_INTO_OPERATIONS_QUERY,
        operation.getCode(),
        operation.isEnabled() ? 1 : 0
      )
    ));
  }

  private void appendInsertRanksScripts(List<String> scripts) {
    scripts.add("/* 3. Ranks insert part */");
    List<Rank> ranks = rankDAO.findAll()
      .stream()
      .sorted(Comparator.comparing(Rank::getCode))
      .collect(Collectors.toList());
    ranks.forEach(rank -> scripts.add(
      String.format(
        INSERT_INTO_RANKS_QUERY,
        rank.getCode()
      )
    ));
  }

  private void appendInsertGrantsScripts(List<String> scripts) {
    scripts.add("/* 4. Grants insert part */");
    List<Grant> grants = grantDAO.findAll()
      .stream()
      .sorted(
        Comparator
          .comparing((Grant grant) -> grant.getRank().getCode())
          .thenComparing(grant -> grant.getOperation().getCode())
      )
      .collect(Collectors.toList());
    grants.forEach(grant -> scripts.add(
      String.format(
        INSERT_INTO_GRANTS_QUERY,
        grant.getOperation().getCode(),
        grant.getRank().getCode()
      )
    ));
  }


}
