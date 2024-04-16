// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {Token} from "../src/Token.sol";

contract TokenTest is Test {
    Token public ttt;

    function setUp() public {
        ttt = new Token();
    }

    function testInitialSupply() public view {
        assert(ttt.totalSupply() == 0);
    }

    function testTokenName() public {
        assertEq(ttt.name(), "Proof of Testimonials Token");
    }

    function testTokenSymbol() public {
        assertEq(ttt.symbol(), "POT");
    }

    function testTokenDecimals() public {
        assertEq(ttt.decimals(), 18);
    }

    function testNonOwnerCannotMint() public {
        address nonOwner = makeAddr("nonOwner");
        vm.prank(nonOwner);
        vm.expectRevert();
        ttt.mint(nonOwner, 100 ether); // called by nonOwner
    }

    function testOwnerCanMint() public {
        ttt.mint(address(this), 100 ether); // called by address.this ( ie owner )
        assertEq(ttt.balanceOf(address(this)), 100 ether);
    }

    function testNonOwnerCannotBurn() public {
        ttt.mint(address(this), 100 ether);
        address nonOwner = makeAddr("nonOwner");
        vm.prank(nonOwner);
        vm.expectRevert();
        ttt.burn(nonOwner, 100 ether); // called by nonOwner
    }

    function testOwnerCanBurn() public {
        ttt.mint(address(this), 100 ether);
        ttt.burn(address(this), 100 ether); // called by address.this ( ie owner )
        assertEq(ttt.balanceOf(address(this)), 0 ether);
    }
}
