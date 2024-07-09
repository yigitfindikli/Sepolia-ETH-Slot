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

if (!compiledContract) {
	throw new Error("Contract compilation failed");
}

export const abi = compiledContract.abi;
export const evm = compiledContract.evm;

export default compiledContract;
