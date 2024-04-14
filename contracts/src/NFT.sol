// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@solmate/src/tokens/ERC721.sol";
import {Owned} from "@solmate/src/auth/Owned.sol";

contract NFT is ERC721, Owned {
    string private constant _NAME = "Tic Tac Token NFT";
    string private constant _SYMBOL = "TTT NFT";

    constructor() ERC721(_NAME, _SYMBOL) Owned(msg.sender) {}

    function tokenURI(uint256 /* id */ ) public pure override returns (string memory) {
        return "";
    }

    function mint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }
}
