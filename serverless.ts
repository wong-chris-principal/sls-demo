import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import dynamoDbTables from "./resources/dynamodb-tables";

const serverlessConfiguration: AWS = {
  service: "sls-demo",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: [{ "Fn::GetAtt": ["ListTable", "Arn"] }],
      },
    ],
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: dynamoDbTables,
  },
};

module.exports = serverlessConfiguration;
