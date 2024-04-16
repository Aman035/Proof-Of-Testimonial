// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {ProofOfTestimonials} from "../src/ProofOfTestimonials.sol";

contract PotTest is Test {
    ProofOfTestimonials public pot;

    function setUp() public {
        pot = new ProofOfTestimonials();
    }

    function testOwnerCanWhitelist() public {
        address userToBeWhitelisted = makeAddr("user");
        pot.whitelist(userToBeWhitelisted);
        assert(pot.isWhitelisted(userToBeWhitelisted) == true);
    }

    function testNonOwnerCannotWhitelist() public {
        address nonOwner = makeAddr("nonOwner");
        address userToBeWhitelisted = makeAddr("user");
        vm.prank(nonOwner);
        vm.expectRevert();
        pot.whitelist(userToBeWhitelisted);
    }
}
