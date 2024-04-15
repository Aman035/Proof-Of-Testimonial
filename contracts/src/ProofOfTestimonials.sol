// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Token} from "./token.sol"; 

/**
 * @title ProofOfTestimonials
 * @author Aman
 */
contract ProofOfTestimonials {
    /**
     * Errors
     */
    error POT__UserNotWhitelisted();
    error POT__Unauthorized();

    /**
     * Interfaces
     */

    /**
     * Type Declarations
     */

    /**
     * State Variables
     */
    Token private immutable i_token;
    address private immutable i_owner;
    mapping(address => bool) private s_whitelist;

    /**
     * Events
     */
    event AddressWhitelisted(address indexed addr);
    event TestimonialAdded(address indexed addr, string attestationId);

    /**
     * Modifiers
     */
    modifier whitelisted(address addr) {
        if (s_whitelist[addr] == false) {
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

    function addTestimonial(string memory attestationId) external whitelisted(msg.sender) {
        emit TestimonialAdded(msg.sender, attestationId);
    }

    function whitelist(address addr) external onlyOwner {
        s_whitelist[addr] = true;
        emit AddressWhitelisted(addr);
    }

    function removeWhitelist(address addr) external onlyOwner {
        s_whitelist[addr] = false;
    }

    /**
     * Public
     */

    /**
     * Internal
     */

    /**
     * Private
     */

    /**
     * Getters
     */
}
