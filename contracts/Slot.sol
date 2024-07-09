// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Slot {
    address public owner;
    uint256 public constant BET_AMOUNT = 0.01 ether;
    uint256 public randomNumber;

    event SpinResult(address indexed player, uint256 result, uint256 winnings);

    constructor() {
        owner = msg.sender;
    }

    function spin() public payable {
        require(msg.value == BET_AMOUNT, "Bet amount must be 0.01 Ether");
        
        randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 100;
        
        uint256 winnings = calculateWinnings(randomNumber);
        
        if (winnings > 0) {
            payable(msg.sender).transfer(winnings);
        }
        
        emit SpinResult(msg.sender, randomNumber, winnings);
    }

    function calculateWinnings(uint256 random) private pure returns (uint256) {
        if (random < 10) {
            return BET_AMOUNT * 2;
        }
        return 0;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
