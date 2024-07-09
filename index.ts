import "dotenv/config";
import Web3 from "web3";
import { abi } from "./migrations/compile";
import promptSync from "prompt-sync";
import { execSync } from "child_process";
import { deploy } from "./migrations/deploy";

const prompt = promptSync();

const privateKey = process.env.SIGNER_PRIVATE_KEY as string;
const infuraUrl = process.env.INFURA_API_KEY_URL as string;
const contractAddress = process.env.CONTRACT_ADDRESS as string;

if (!privateKey || !infuraUrl) {
	throw new Error(
		"Please set SIGNER_PRIVATE_KEY and INFURA_API_KEY_URL in your .env file"
	);
}

const provider = new Web3.providers.HttpProvider(infuraUrl);
const web3 = new Web3(provider);

const run = async () => {
	const action = prompt("Choose an action: Deploy, Spin, Withdrawal, Test: ");

	switch (action.toLowerCase()) {
		case "deploy":
			await deploy();
			break;

		case "spin":
			await spin();
			break;

		case "withdrawal":
			await withdrawal();
			break;

		case "test":
			runTests();
			break;

		default:
			console.log("Invalid action.");
	}
};

const spin = async () => {
	if (!contractAddress) {
		console.log("Please set CONTRACT_ADDRESS in your .env file");
		return;
	}

	const account = web3.eth.accounts.privateKeyToAccount(privateKey);
	web3.eth.accounts.wallet.add(account);

	const contract = new web3.eth.Contract(abi as any, contractAddress);

	try {
		const receipt = await contract.methods.spin().send({
			from: account.address,
			value: web3.utils.toWei("0.01", "ether"),
			gas: "1000000"
		});

		console.log("Spin transaction successful:", receipt);
	} catch (error) {
		console.error("Error spinning:", error);
	}
};

const withdrawal = async () => {
	if (!contractAddress) {
		console.log("Please set CONTRACT_ADDRESS in your .env file");
		return;
	}

	const account = web3.eth.accounts.privateKeyToAccount(privateKey);
	web3.eth.accounts.wallet.add(account);

	const contract = new web3.eth.Contract(abi as any, contractAddress);

	try {
		const receipt = await contract.methods.withdraw().send({
			from: account.address,
			gas: "1000000"
		});

		console.log("Withdrawal transaction successful:", receipt);
	} catch (error) {
		console.error("Error withdrawing:", error);
	}
};

const runTests = () => {
	try {
		execSync("npm test", { stdio: "inherit" });
	} catch (error) {
		console.error("Error running tests:", error);
	}
};

run();
