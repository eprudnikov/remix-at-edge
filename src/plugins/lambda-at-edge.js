/**
 * The plugin assigns Edge role to the automatically generated function and adds association with a CloudFront
 * distribution.
 */
module.exports = {
  deploy: {
    start: async ({ arc, cloudformation, dryRun, inventory, stage }) => {
      if (!process.env.AWS_EDGE_ROLE_ARN) {
        throw new Error(
          "Custom Edge role (AWS_EDGE_ROLE_ARN parameter) is not set as parameter. Terminate configuration process."
        );
      }
      console.log(
        "Lambda@Edge plugin: assign role " +
          process.env.AWS_EDGE_ROLE_ARN +
          " to the Lambda function."
      );
      cloudformation.Resources.AnyCatchallHTTPLambda.Properties.Role = {
        "Fn::Sub": process.env.AWS_EDGE_ROLE_ARN, // to replace AWS::AccountId placeholder
      };
      cloudformation.Resources.AnyCatchallHTTPLambda.Properties.Events =
        undefined;

      // Remove env variables because Lambda@Edge cannot have it
      cloudformation.Resources.AnyCatchallHTTPLambda.Properties.Environment.Variables =
        undefined;

      // Disable some default resources (setting null doens't work). Hope, there is a better way of doing it.
      cloudformation.Resources.Role = undefined;
      cloudformation.Resources.ParameterStorePolicy = undefined;
      cloudformation.Resources.HTTP = undefined;
      cloudformation.Outputs.API = undefined;
      cloudformation.Outputs.ApiId = undefined;
    },
  },
};
