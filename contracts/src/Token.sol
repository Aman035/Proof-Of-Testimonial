// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@solmate/src/tokens/ERC20.sol";
import {Owned} from "@solmate/src/auth/Owned.sol";

contract Token is ERC20, Owned {
    string private constant _NAME = "Proof of Testimonials Token";
    string private constant _SYMBOL = "POT";
    uint8 private constant _DECIMALS = 18;

    constructor() ERC20(_NAME, _SYMBOL, _DECIMALS) Owned(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
