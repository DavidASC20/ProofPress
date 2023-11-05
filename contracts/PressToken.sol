// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract PressToken is ERC20, Ownable{

    constructor(uint256 initialSupply) ERC20("PressToken", "PRESS") Ownable(msg.sender){
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Function to mint tokens.
     *
     * NOTE: This function can only be called by the owner of the contract.
     *
     * @param account The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    // If you want to add a burn function
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) public {
        uint256 decreasedAllowance = allowance(account, msg.sender) - amount;
        _approve(account, msg.sender, decreasedAllowance);
        _burn(account, amount);
    }
}
