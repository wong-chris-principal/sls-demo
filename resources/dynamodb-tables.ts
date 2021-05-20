export default {
  ListTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "sls-demo-list",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    },
  },
};
