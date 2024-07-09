import "dotenv/config";
import Web3 from "web3";
import { abi, evm } from "./compile";

const privateKey = process.env.SIGNER_PRIVATE_KEY;
const infuraUrl = process.env.INFURA_API_KEY_URL;

if (!privateKey || !infuraUrl) {
	throw new Error(
		"Please set PRIVATE_KEY and INFURA_KEY_URL in your .env file"
	);
}

const provider = new Web3.providers.HttpProvider(infuraUrl);

const web3 = new Web3(provider);

export const deploy = async () => {
	const signer = web3.eth.accounts.privateKeyToAccount(privateKey);

	web3.eth.accounts.wallet.add(signer);

	const bytecode = evm.bytecode.object;
	const accounts = await web3.eth.getAccounts();
	console.log(accounts);

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: bytecode })
		.send({ gas: "1000000", from: signer.address });

	console.log("Contract deployed to", result.options.address);
};

if (require.main === module) {
	console.log("hey?");
	deploy().catch((error) => {
		console.error("Error deploying contract:", error);
	});
}
