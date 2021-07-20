package ru.sbrf.compliance.cocos.tools.authorization.service.component;

import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GenerateQueriesData;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.GrantDto;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.OperationDto;
import ru.sbrf.compliance.cocos.tools.authorization.api.entity.ResponseCode;
import ru.sbrf.compliance.cocos.tools.authorization.api.request.GenerateQueriesRequest;
import ru.sbrf.compliance.cocos.tools.authorization.api.response.GetScriptsResponse;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.AttributeDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.GrantDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.OperationDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.dao.RankDAO;
import ru.sbrf.compliance.cocos.tools.authorization.domain.entity.*;

import java.util.*;
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
  private static final String INSERT_INTO_ATTRIBUTES_QUERY = "INSERT INTO [authorization].[attributes] (grant_id, code, [value])\n" +
    "SELECT g.grant_id, '%s' as code, v.code as [value]\n" +
    "FROM [authorization].[grants] g\n" +
    "       inner join [authorization].[operations] o on g.opr_id = o.opr_id\n" +
    "       inner join [authorization].[ranks] r on g.rank_id = r.rank_id\n" +
    "       cross join (select '%s' as code) v\n" +
    "where o.code = '%s'\n" +
    "  and r.code = '%s'";

  private final RankDAO rankDAO;
  private final OperationDAO operationDAO;
  private final GrantDAO grantDAO;
  private final AttributeDAO attributeDAO;

  private final PlatformTransactionManager transactionManager;

  public SqlScriptsGenerationService(
    RankDAO rankDAO,
    OperationDAO operationDAO,
    GrantDAO grantDAO,
    AttributeDAO attributeDAO,
    PlatformTransactionManager transactionManager
  ) {
    this.rankDAO = rankDAO;
    this.operationDAO = operationDAO;
    this.grantDAO = grantDAO;
    this.attributeDAO = attributeDAO;
    this.transactionManager = transactionManager;
  }

  public GetScriptsResponse execute(GenerateQueriesRequest request) {
    GetScriptsResponse response = new GetScriptsResponse();

    DefaultTransactionDefinition paramTransactionDefinition = new DefaultTransactionDefinition();
    TransactionStatus status = transactionManager.getTransaction(paramTransactionDefinition);
    try {
      fillDatabase(request.getData());
      response.setScripts(generateQueries());

      transactionManager.rollback(status);
      response.setStatus(ResponseCode.SUCCESS);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      response.setStatus(ResponseCode.INTERNAL_ERROR);
    }
    return response;
  }

  private void fillDatabase(GenerateQueriesData data) {
    Map<String, Rank> rankMap = new HashMap<>();
    Map<String, Operation> operationMap = new HashMap<>();
    fillOperations(operationMap, data.getOperations());
    fillRanks(rankMap, data.getRankCodes());

    Map<String, Map<String, GrantDto>> grantsFromRequest = data.getGrants();
    List<Grant> grantsToSave = new ArrayList<>();
    grantsFromRequest.forEach((operationCode, grants) -> {
      Operation existingOperation = operationMap.get(operationCode);
      grants.forEach((rankCode, grantDto) -> {
        if (!rankMap.containsKey(rankCode)) {
          return;
        }
        List<Grant> existingGrants = grantDAO.findAllByOperationCodeAndRankCode(operationCode, rankCode);
        boolean isGrantAlreadyExists = existingGrants != null && !existingGrants.isEmpty();
        Rank existingRank = rankMap.get(rankCode);
        Grant grant;
        if (grantDto.isEnabled()) {
          if (!isGrantAlreadyExists) {
            grant = new Grant();
            GrantKey grantKey = new GrantKey();
            grantKey.setRankId(existingRank.getId());
            grantKey.setOperationId(existingOperation.getId());
            grant.setGrantKey(grantKey);
            grant.setOperation(existingOperation);
            grant.setRank(existingRank);
            grantsToSave.add(grant);
          }
        } else {
          if (isGrantAlreadyExists) {
            grant = existingGrants.get(0);
            grantDAO.delete(grant);
          }
        }
      });
    });

    grantDAO.saveAll(grantsToSave);
  }

  private void fillOperations(Map<String, Operation> operationMap, List<OperationDto> operations) {
    operations.forEach(operationDto -> {
      Operation operation = new Operation();
      operation.setCode(operationDto.getOperationCode());
      operation.setEnabled(operationDto.isEnabled());
      operationMap.put(operationDto.getOperationCode(), operationDAO.save(operation));
    });
  }

  private void fillRanks(Map<String, Rank> rankMap, List<String> rankCodes) {
    rankCodes.forEach(rankCode -> {
      Rank rank = new Rank();
      rank.setCode(rankCode);
      rankMap.put(rankCode, rankDAO.save(rank));
    });
  }

  private List<String> generateQueries() {
    List<String> scripts = new LinkedList<>();
    appendDeleteScripts(scripts);
    appendInsertOperationsScripts(scripts);
    appendInsertRanksScripts(scripts);
    appendInsertGrantsScripts(scripts);
    appendInsertAttributesScripts(scripts);
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

  private void appendInsertAttributesScripts(List<String> scripts) {
    scripts.add("/* 5. Attributes insert part */");
    List<Attribute> attributes = attributeDAO.findAll()
      .stream()
      .sorted(
        Comparator
          .comparing(Attribute::getCode)
          .thenComparing(attribute -> attribute.getGrant().getRank().getCode())
          .thenComparing(attribute -> attribute.getGrant().getOperation().getCode())
      )
      .collect(Collectors.toList());
    attributes.forEach(attribute -> scripts.add(
      String.format(
        INSERT_INTO_ATTRIBUTES_QUERY,
        attribute.getCode(),
        attribute.getValue(),
        attribute.getGrant().getOperation().getCode(),
        attribute.getGrant().getRank().getCode()
      )
    ));
  }

}
