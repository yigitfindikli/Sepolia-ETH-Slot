import assert from "assert";
import ganache from "ganache";
import Web3 from "web3";
import { abi, evm } from "../migrations/compile";
import { Contract } from "web3-eth-contract";

const web3 = new Web3(ganache.provider());

let accounts: string[];
let slotMachine: Contract<any>;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	slotMachine = await new web3.eth.Contract(abi)
		.deploy({ data: evm.bytecode.object })
		.send({ from: accounts[0], gas: "1000000" });
});

describe("SlotMachine", () => {
	it("deploys a contract", () => {
		assert.ok(slotMachine.options.address);
	});

	it("allows a player to spin and emit a SpinResult event", async () => {
		const initialBalance = await web3.eth.getBalance(accounts[0]);
		const receipt = await slotMachine.methods.spin().send({
			from: accounts[0],
			value: web3.utils.toWei("0.01", "ether"),
			gas: "1000000"
		});

		assert.ok(receipt.events);
		assert.ok(receipt.events.SpinResult);
		assert.equal(
			receipt.events.SpinResult.returnValues.player,
			accounts[0]
		);

		const newBalance = await web3.eth.getBalance(accounts[0]);
		assert.ok(initialBalance > newBalance);
	});

	it("only allows the owner to withdraw", async () => {
		try {
			await slotMachine.methods.withdraw().send({ from: accounts[1] });
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it("allows the owner to withdraw funds", async () => {
		await slotMachine.methods.spin().send({
			from: accounts[0],
			value: web3.utils.toWei("0.01", "ether"),
			gas: "1000000"
		});

		const initialBalance = await web3.eth.getBalance(accounts[0]);
		await slotMachine.methods.withdraw().send({ from: accounts[0] });
		const newBalance = await web3.eth.getBalance(accounts[0]);

		assert.ok(newBalance > initialBalance);
	});
});
