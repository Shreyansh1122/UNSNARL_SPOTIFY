
const main = async () => {

  const [deployer] = await hre.ethers.getSigners();
  const [accountBalance] = await deployer.getBalance();

  console.log("Deploying the contract with account(address) ", deployer.address);
  console.log("AccountBalance is ", accountBalance.toString());

  const waveContractFactory = hre.ethers.waveContractFactory("Spotify");

  const waveContract = waveContractFactory.deploy();


  await waveContract.deployed();

  console.log("Contract is deployed and WaveContract add = ", waveContract.address);
};


const runMain = async () => {

  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }


}