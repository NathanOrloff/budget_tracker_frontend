import { CognitoUserPool } from "amazon-cognito-identity-js";

export const userPool = new CognitoUserPool({
  UserPoolId: "us-west-2_6A7sMnRvi",
  ClientId: "5tqlt2magq3tpn7eml26u2mlqc",
});
