module.exports = {
  deploy: {
    end: async ({ arc, cloudformation, dryRun, inventory, stage }) => {
      if (dryRun) {
        console.log(
          "CloudFormation template: " + JSON.stringify(cloudformation)
        );
      }
    },
  },
};
