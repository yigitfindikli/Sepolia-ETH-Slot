# Seph Slot Machine

This project is a smart contract-based slot machine implemented with Solidity, Web3.js, and TypeScript (Strict). It allows users to deploy the contract, spin the slot machine, and withdraw winnings. This project is created for boilerplate purposes and should not be used directly for production.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js and npm are installed.
-   An Infura project ID.
-   A private key for an Ethereum account with testnet Ether (e.g., Sepolia testnet).

## Getting Started

```sh
# 1. Clone the repository
git clone https://github.com/your-repo/seph-slot-machine.git
cd seph-slot-machine

# 2. Install dependencies
npm install

# 3. Create a `.env` file
echo "SIGNER_PRIVATE_KEY=your-private-key" > .env
echo "INFURA_API_KEY_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID" >> .env
echo "CONTRACT_ADDRESS=your-deployed-contract-address" >> .env

# 4. Compile the contracts
npm run compile

# 5. Start the interactive script
npm start

# 6. Deploy the contract
npm run deploy

# 7. Spin the slot machine
npm start
# Choose the "Spin" option

# 8. Withdraw funds
npm start
# Choose the "Withdrawal" option

# 9. Run tests
npm test
```

## Warnings

-   **Keep your private key secure**: Ensure that your private key is stored securely and not exposed in your source code or version control. Use environment variables to manage sensitive information.

-   **Testnet Ether only**: Use this project only on testnets (e.g., Sepolia) to avoid financial loss. Deploying to mainnet could result in actual loss of funds.

-   **Gas Fees**: Be aware of gas fees when interacting with the Ethereum network. Ensure you have sufficient testnet Ether to cover transaction costs.
