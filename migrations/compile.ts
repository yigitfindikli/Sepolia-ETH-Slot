import path from "path";
import fs from "fs";

const solc = require("solc");

const slotPath = path.resolve(__dirname, "..", "contracts", "Slot.sol");

const source = fs.readFileSync(slotPath, "utf8");

const input = {
	language: "Solidity",
	sources: {
		"Slot.sol": {
			content: source
		}
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"]
			}
		}
	}
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const compiledContract = output.contracts["Slot.sol"].Slot;

fs.mkdirSync(path.resolve(__dirname, "..", "build"), { recursive: true });

fs.writeFileSync(
	path.resolve(__dirname, "..", "build", "Slot.json"),
	JSON.stringify(compiledContract, null, 2)
);

if (!compiledContract) {
	throw new Error("Contract compilation failed");
}

export const abi = compiledContract.abi;
export const evm = compiledContract.evm;

export default compiledContract;
