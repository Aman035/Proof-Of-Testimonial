// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {NFT} from "../src/NFT.sol";

contract NFTTest is Test {
    NFT public tttNft;

    function setUp() public {
        tttNft = new NFT();
    }

    /**
     * @dev Making Our Test Contract ERC721 Compliant so that safeMint can be called
     */
    function onERC721Received(address, /*operator*/ address, /*from*/ uint256, /*tokenId*/ bytes calldata /*data*/ )
        public
        pure
        returns (bytes4)
    {
        return this.onERC721Received.selector;
    }

    function testNFTName() public {
        assertEq(tttNft.name(), "Tic Tac Token NFT");
    }

    function testNFTSymbol() public {
        assertEq(tttNft.symbol(), "TTT NFT");
    }

    function testNonOwnerCannotMint() public {
        address nonOwner = makeAddr("nonOwner");
        vm.prank(nonOwner);
        vm.expectRevert();
        tttNft.mint(nonOwner, 1); // called by nonOwner
    }

    function testOwnerCanMint() public {
        // Note - address(this) needs to be safeMint compliant
        tttNft.mint(address(this), 1); // called by address.this ( ie owner )
        assertEq(tttNft.balanceOf(address(this)), 1);
    }
}
