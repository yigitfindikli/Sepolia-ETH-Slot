const path = require("path");
const fs = require("fs");
const solc = require("solc");

const slotPath = path.resolve(__dirname, "contracts", "Slot.sol");
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

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
	"Slot.sol"
].Slot;
