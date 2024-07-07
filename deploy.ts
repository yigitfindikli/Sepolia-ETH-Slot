import { ethers, InfuraProvider, Wallet, Mnemonic } from "ethers";
import { abi, evm } from "./compile";
import "dotenv/config";

// Initialize the provider with Infura
const provider = new InfuraProvider(
	"sepolia",
	process.env.INFURA_PRIVATE_KEY || ""
);

// Define the mnemonic and create a wallet
const mnemonic = process.env.MNEMONIC || "";
const wallet = Wallet.fromPhrase(mnemonic).connect(provider);

const deploy = async () => {
	console.log(wallet);
	console.log("Attempting to deploy from account", wallet.address);

	const bytecode = evm.bytecode.object;

	const factory = new ethers.ContractFactory(abi, bytecode, wallet);

	const contract = await factory.deploy("Hi there!", {
		gasLimit: 1000000
	});

	const address = contract.getAddress();

	console.log("Contract deployed to", address);
};

deploy().catch((error) => {
	console.error("Error deploying contract:", error);
});
