// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {ProofOfTestimonials} from "../src/ProofOfTestimonials.sol";
import {Token} from "../src/Token.sol";

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

    // whitelist user balance should be 100
    function testWhitelistedUserBalance() public {
        address userToBeWhitelisted = makeAddr("user");
        address tokenAddress = pot.getTokenAddress();
        Token t = Token(tokenAddress);
        pot.whitelist(userToBeWhitelisted);
        assert(t.balanceOf(userToBeWhitelisted) == 1000 ether);
    }

    function testNonOwnerCannotWhitelist() public {
        address nonOwner = makeAddr("nonOwner");
        address userToBeWhitelisted = makeAddr("user");
        vm.prank(nonOwner);
        vm.expectRevert();
        pot.whitelist(userToBeWhitelisted);
    }

    function testOwnerCanRevokeWhitelist() public {
        address userToBeWhitelisted = makeAddr("user");
        pot.whitelist(userToBeWhitelisted);
        assert(pot.isWhitelisted(userToBeWhitelisted) == true);
        pot.revokeWhitelist(userToBeWhitelisted);
        assert(pot.isWhitelisted(userToBeWhitelisted) == false);
    }

    function testNonOwnerCannotRevokeWhitelist() public {
        address nonOwner = makeAddr("nonOwner");
        address userToBeWhitelisted = makeAddr("user");
        pot.whitelist(userToBeWhitelisted);
        assert(pot.isWhitelisted(userToBeWhitelisted) == true);
        vm.prank(nonOwner);
        vm.expectRevert();
        pot.revokeWhitelist(userToBeWhitelisted);
    }

    // non ownder cannot add testimonial
    function testNonOwnerCannotAddTestimonial() public {
        address nonOwner = makeAddr("nonOwner");
        address attester = makeAddr("attester");
        vm.prank(nonOwner);
        vm.expectRevert();
        pot.addTestimonial("randomId", attester, "product");
    }

    // owner can't add testimonial for non whitelisted user
    function testOwnerCannotAddTestimonialForNonWhitelistedUser() public {
        address attester = makeAddr("attester");
        vm.expectRevert();
        pot.addTestimonial("randomId", attester, "product");
    }

    // owner can add testimonial for whitelisted user
    function testOwnerCanAddTestimonialForWhitelistedUser() public {
        address attester = makeAddr("attester");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");
        assert(pot.getTestimonials("product").length == 1);
    }

    // non-whitelist user can  delegate upvote
    function testNotWitelistedUserCanDelegateUpvote() public {
        address attester = makeAddr("attester");
        address nonWhitelistedUser = makeAddr("nonWhitelistedUser");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");
        pot.upvoteDelegate("randomIdUpvoteId", nonWhitelistedUser, "randomId");
        assert(pot.getUpvotes("randomId") == 1);
        assert(pot.getDownvotes("randomId") == 0);
        assert(pot.getRewardPool(attester) == 0);
    }

    // whitelist user can delegate upvote
    function testWitelistedUserCanDelegateUpvote() public {
        address attester = makeAddr("attester");
        address whitelistedUser = makeAddr("whitelistedUser");
        pot.whitelist(attester);
        pot.whitelist(whitelistedUser);
        pot.addTestimonial("randomId", attester, "product");
        pot.upvoteDelegate("randomIdUpvoteId", whitelistedUser, "randomId");
        assert(pot.getUpvotes("randomId") == 1);
        assert(pot.getDownvotes("randomId") == 0);
        assert(pot.getRewardPool(attester) == 10 ether);
    }

    // non-whitelist user can downvote
    function testNotWitelistedUserCanDelegateDownvote() public {
        address attester = makeAddr("attester");
        address nonWhitelistedUser = makeAddr("nonWhitelistedUser");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");
        pot.downvoteDelegate("randomIdDownvoteId", nonWhitelistedUser, "randomId");
        assert(pot.getUpvotes("randomId") == 0);
        assert(pot.getDownvotes("randomId") == 1);
        assert(pot.getRewardPool(attester) == 0);
    }

    // whitelist user can downvote
    function testWitelistedUserCanDelegateDownvote() public {
        address attester = makeAddr("attester");
        address whitelistedUser = makeAddr("whitelistedUser");
        pot.whitelist(attester);
        pot.whitelist(whitelistedUser);
        pot.addTestimonial("randomId", attester, "product");
        pot.downvoteDelegate("randomIdDownvoteId", whitelistedUser, "randomId");
        assert(pot.getUpvotes("randomId") == 0);
        assert(pot.getDownvotes("randomId") == 1);
        assert(pot.getRewardPool(attester) == 0);
    }

    // whitelist user can upvote
    function testWitelistedUserCanUpvote() public {
        address attester = makeAddr("attester");
        address whitelistedUser = makeAddr("whitelistedUser");
        pot.whitelist(attester);
        pot.whitelist(whitelistedUser);
        pot.addTestimonial("randomId", attester, "product");
        vm.prank(whitelistedUser);
        pot.upvote("randomId");
        assert(pot.getUpvotes("randomId") == 1);
        assert(pot.getDownvotes("randomId") == 0);
        assert(pot.getRewardPool(attester) == 10 ether);
    }

    // non whitelist user can upvote
    function testNonWitelistedUserCanUpvote() public {
        address attester = makeAddr("attester");
        address nonWhitelistedUser = makeAddr("nonWhitelistedUser");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");
        vm.prank(nonWhitelistedUser);
        pot.upvote("randomId");
        assert(pot.getUpvotes("randomId") == 1);
        assert(pot.getDownvotes("randomId") == 0);
        assert(pot.getRewardPool(attester) == 0 ether);
    }

    // whitelist user can downvote
    function testWitelistedUserCanDownvote() public {
        address attester = makeAddr("attester");
        address whitelistedUser = makeAddr("whitelistedUser");
        pot.whitelist(attester);
        pot.whitelist(whitelistedUser);
        pot.addTestimonial("randomId", attester, "product");
        vm.prank(whitelistedUser);
        pot.downvote("randomId");
        assert(pot.getUpvotes("randomId") == 0);
        assert(pot.getDownvotes("randomId") == 1);
        assert(pot.getRewardPool(attester) == 0 ether);
    }

    function testAddingTestimonialHasFee() public {
        address tokenAddress = pot.getTokenAddress();
        Token t = Token(tokenAddress);

        address attester = makeAddr("attester");
        assert(t.balanceOf(attester) == 0 ether);
        pot.whitelist(attester);
        assert(t.balanceOf(attester) == 1000 ether);
        pot.addTestimonial("randomId", attester, "product");
        assert(t.balanceOf(attester) == 900 ether);
    }

        function testSameTestimonialCannotBeAddedAgain() public {
        address attester = makeAddr("attester");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");
        vm.expectRevert();
        pot.addTestimonial("randomId", attester, "product");
    }

    // non whitelist user can downvote
    function testNonWitelistedUserCanDownvote() public {
        address attester = makeAddr("attester");
        address nonWhitelistedUser = makeAddr("nonWhitelistedUser");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");
        vm.prank(nonWhitelistedUser);
        pot.downvote("randomId");
        assert(pot.getUpvotes("randomId") == 0);
        assert(pot.getDownvotes("randomId") == 1);
        assert(pot.getRewardPool(attester) == 0 ether);
    }

    function testUserCanChangeVote() public {
        address attester = makeAddr("attester");
        address whitelistedUser = makeAddr("whitelistedUser");
        pot.whitelist(attester);
        pot.whitelist(whitelistedUser);
        pot.addTestimonial("randomId", attester, "product");
        pot.upvoteDelegate("randomIdUpvoteId", whitelistedUser, "randomId");
        assert(pot.getRewardPool(attester) == 10 ether);
        pot.downvoteDelegate("randomIdDownvoteId", whitelistedUser, "randomId");
        assert(pot.getRewardPool(attester) == 0);
        assert(pot.getUpvotes("randomId") == 0);
        assert(pot.getDownvotes("randomId") == 1);
    }

    function testCannotDelegateVoteForInvalidTestimonaial() public {
        address user = makeAddr("user");
        vm.expectRevert();
        pot.upvoteDelegate("randomIdUpvoteId", user, "randomIdInvalid");
        vm.expectRevert();
        pot.downvoteDelegate("randomIdDownvoteId", user, "randomIdInvalid");

        vm.prank(user);
        vm.expectRevert();
        pot.upvote("randomIdInvalid");
        vm.prank(user);
        vm.expectRevert();
        pot.downvote("randomIdInvalid");
    }

    function testattesterCannotClaimRewardBeforeMinimumClaimableReward() public {
        address attester = makeAddr("attester");
        pot.whitelist(attester);
        vm.expectRevert();
        pot.claimReward(attester);
    }

    function testattesterCanClaimRewardAfterMinimumClaimableReward() public {
        address attester = makeAddr("attester");
        pot.whitelist(attester);
        pot.addTestimonial("randomId", attester, "product");

        address user1 = makeAddr("user1");
        address user2 = makeAddr("user2");
        address user3 = makeAddr("user3");
        address user4 = makeAddr("user4");
        address user5 = makeAddr("user5");
        pot.whitelist(user1);
        pot.whitelist(user2);
        pot.whitelist(user3);
        pot.whitelist(user4);
        pot.whitelist(user5);
        pot.upvoteDelegate("1", user1, "randomId");
        pot.upvoteDelegate("2", user2, "randomId");
        pot.upvoteDelegate("3", user3, "randomId");
        pot.upvoteDelegate("4", user4, "randomId");
        pot.upvoteDelegate("5", user5, "randomId");
        assert(pot.getRewardPool(attester) == 50 ether);
        pot.claimReward(attester);

        address tokenAddress = pot.getTokenAddress();
        Token t = Token(tokenAddress);
        assert(t.balanceOf(attester) == 950 ether);
    }
}
