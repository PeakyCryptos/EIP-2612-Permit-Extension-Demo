const hre = require("hardhat");

async function main() {
  const hello = await hre.ethers.getContractFactory("HelloWorld");
  const Hello = await hello.deploy();

  await Hello.deployed();

  console.log(`Deployed to ${Hello.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
