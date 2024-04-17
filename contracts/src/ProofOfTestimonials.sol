// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Token} from "./Token.sol";

/**
 * @title ProofOfTestimonials
 * @author Aman
 */
contract ProofOfTestimonials {
    /**
     * Errors
     */
    error POT__UserNotWhitelisted();
    error POT__UserAlreadyWhitelisted();
    error POT__Unauthorized();
    error POT__InsufficientTokens();
    error POT__AlreadyUpvoted();
    error POT__AlreadyDownvoted();
    error POT__InvalidTestimonialAttestationId();

    /**
     * State Variables
     */
    uint256 private constant TESTIMONIAL_COST = 100 ether;
    uint256 private constant WHITELIST_REWARD = 1000 ether;
    uint256 private constant UPVOTE_REWARD = 10 ether;
    uint256 private constant DOWNVOTE_BURN = 10 ether;
    uint256 private constant MIN_CLAIMABLE_REWARD = 50 ether;
    Token private immutable i_token;
    address private immutable i_owner;
    mapping(address => bool) private s_whitelist;
    mapping(string => string[]) private s_testimonials;
    mapping(string => address) private s_attesters;
    mapping(address => uint256) private s_attestorRewardPool;
    mapping(string => mapping(address => bool)) private s_upvoted;
    mapping(string => mapping(address => bool)) private s_downvoted;
    mapping(string => uint256) private s_upvotes;
    mapping(string => uint256) private s_downvotes;

    /**
     * Events
     */
    event Whitelist(address indexed addr);
    event RevokeWhitelist(address indexed addr);
    event TestimonialAdded(address indexed addr, string attestationId, string productId);
    event UpvoteDelegate(address indexed addr, string attestationId, string testimonialAttestationId);
    event DownvoteDelegate(address indexed addr, string attestationId, string testimonialAttestationId);
    event Upvote(address indexed addr, string testimonialAttestationId);
    event Downvote(address indexed addr, string testimonialAttestationId);

    /**
     * Modifiers
     */
    modifier whitelisted(address addr) {
        if (!s_whitelist[addr]) {
            revert POT__UserNotWhitelisted();
        }
        _;
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert POT__Unauthorized();
        }
        _;
    }

    // valid testimonial attestation id
    modifier validTestimonialAttestationId(string memory testimonialAttestationId) {
        if (s_attesters[testimonialAttestationId] == address(0)) {
            revert POT__InvalidTestimonialAttestationId();
        }
        _;
    }

    /**
     * Functions
     */
    constructor() {
        i_owner = msg.sender;
        // Deploy Token contract
        /// @dev Token are owned by this contract
        i_token = new Token();
    }

    /**
     * External
     */
    function whitelist(address addr) external onlyOwner {
        if (s_whitelist[addr]) {
            revert POT__UserAlreadyWhitelisted();
        }
        s_whitelist[addr] = true;
        i_token.mint(addr, WHITELIST_REWARD);
        emit Whitelist(addr);
    }

    function revokeWhitelist(address addr) external onlyOwner {
        if (!s_whitelist[addr]) {
            revert POT__UserNotWhitelisted();
        }
        s_whitelist[addr] = false;
        emit RevokeWhitelist(addr);
    }

    function addTestimonial(string memory attestationId, address attestor, string memory productId)
        external
        onlyOwner
        whitelisted(attestor)
    {
        if (i_token.balanceOf(attestor) < TESTIMONIAL_COST) {
            revert POT__InsufficientTokens();
        }
        i_token.burn(attestor, TESTIMONIAL_COST);
        s_testimonials[productId].push(attestationId);
        s_attesters[attestationId] = attestor;
        emit TestimonialAdded(attestor, attestationId, productId);
    }

    /**
     * @dev Upvote a testimonial - delagate to owner
     */
    function upvoteDelegate(string memory attestationId, address attestor, string memory testimonialAttestationId)
        external
        onlyOwner
        validTestimonialAttestationId(testimonialAttestationId)
    {
        if (s_upvoted[testimonialAttestationId][attestor]) {
            revert POT__AlreadyUpvoted();
        }
        s_upvoted[testimonialAttestationId][attestor] = true;
        s_upvotes[testimonialAttestationId] += 1;

        if (s_downvoted[testimonialAttestationId][attestor]) {
            s_downvoted[testimonialAttestationId][attestor] = false;
            s_downvotes[testimonialAttestationId] -= 1;
        }

        // Reward the attestor with upvote reward if the upvoter is whitelisted
        if (isWhitelisted(attestor)) {
            s_attestorRewardPool[s_attesters[testimonialAttestationId]] += UPVOTE_REWARD;
        }

        emit UpvoteDelegate(attestor, attestationId, testimonialAttestationId);
    }

    /**
     * @dev Upvote a testimonial
     */
    function upvote(string memory testimonialAttestationId)
        external
        validTestimonialAttestationId(testimonialAttestationId)
    {
        if (s_upvoted[testimonialAttestationId][msg.sender]) {
            revert POT__AlreadyUpvoted();
        }
        s_upvoted[testimonialAttestationId][msg.sender] = true;
        s_upvotes[testimonialAttestationId] += 1;

        if (s_downvoted[testimonialAttestationId][msg.sender]) {
            s_downvoted[testimonialAttestationId][msg.sender] = false;
            s_downvotes[testimonialAttestationId] -= 1;
        }

        // Reward the attestor with upvote reward if the upvoter is whitelisted
        if (isWhitelisted(msg.sender)) {
            s_attestorRewardPool[s_attesters[testimonialAttestationId]] += UPVOTE_REWARD;
        }

        emit Upvote(msg.sender, testimonialAttestationId);
    }

    /**
     * @dev Downvote a testimonial - delagate to owner
     */
    function downvoteDelegate(string memory attestationId, address attestor, string memory testimonialAttestationId)
        external
        onlyOwner
        validTestimonialAttestationId(testimonialAttestationId)
    {
        if (s_downvoted[testimonialAttestationId][attestor]) {
            revert POT__AlreadyDownvoted();
        }
        s_downvoted[testimonialAttestationId][attestor] = true;
        s_downvotes[testimonialAttestationId] += 1;

        if (s_upvoted[testimonialAttestationId][attestor]) {
            s_upvoted[testimonialAttestationId][attestor] = false;
            s_upvotes[testimonialAttestationId] -= 1;
        }

        // Burn downvote reward from the attestor if the downvoter is whitelisted
        if (isWhitelisted(attestor)) {
            if (s_attestorRewardPool[s_attesters[testimonialAttestationId]] >= DOWNVOTE_BURN) {
                s_attestorRewardPool[s_attesters[testimonialAttestationId]] -= DOWNVOTE_BURN;
            } else {
                s_attestorRewardPool[s_attesters[testimonialAttestationId]] = 0;
            }
        }

        emit DownvoteDelegate(attestor, attestationId, testimonialAttestationId);
    }

    /**
     * @dev Upvote a testimonial
     */
    function downvote(string memory testimonialAttestationId)
        external
        validTestimonialAttestationId(testimonialAttestationId)
    {
        if (s_downvoted[testimonialAttestationId][msg.sender]) {
            revert POT__AlreadyDownvoted();
        }

        s_downvoted[testimonialAttestationId][msg.sender] = true;
        s_downvotes[testimonialAttestationId] += 1;

        if (s_upvoted[testimonialAttestationId][msg.sender]) {
            s_upvoted[testimonialAttestationId][msg.sender] = false;
            s_upvotes[testimonialAttestationId] -= 1;
        }

        if (isWhitelisted(msg.sender)) {
            if (s_attestorRewardPool[s_attesters[testimonialAttestationId]] >= DOWNVOTE_BURN) {
                s_attestorRewardPool[s_attesters[testimonialAttestationId]] -= DOWNVOTE_BURN;
            } else {
                s_attestorRewardPool[s_attesters[testimonialAttestationId]] = 0;
            }
        }

        emit Downvote(msg.sender, testimonialAttestationId);
    }

    function claimReward(address addr) external {
        uint256 reward = s_attestorRewardPool[addr];
        if (reward < MIN_CLAIMABLE_REWARD) {
            revert POT__InsufficientTokens();
        }
        s_attestorRewardPool[addr] = 0;
        i_token.mint(addr, reward);
    }

    /**
     * Getters
     */
    function getTokenAddress() public view returns (address) {
        return address(i_token);
    }

    function isWhitelisted(address addr) public view returns (bool) {
        return s_whitelist[addr];
    }

    function getTestimonials(string memory productId) public view returns (string[] memory) {
        return s_testimonials[productId];
    }

    function getRewardPool(address addr) public view returns (uint256) {
        return s_attestorRewardPool[addr];
    }

    function getUpvotes(string memory testimonialAttestationId) public view returns (uint256) {
        return s_upvotes[testimonialAttestationId];
    }

    function getDownvotes(string memory testimonialAttestationId) public view returns (uint256) {
        return s_downvotes[testimonialAttestationId];
    }
}
