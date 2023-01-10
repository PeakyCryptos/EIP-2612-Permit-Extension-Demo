const hre = require("hardhat");

async function main() {
  const permitDemo = await hre.ethers.getContractFactory("permitDemo");
  const PermitDemo = await permitDemo.deploy();

  await PermitDemo.deployed();

  console.log(`Deployed to ${PermitDemo.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
