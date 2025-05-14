var migrations = artifacts.require("./migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(migrations);
};