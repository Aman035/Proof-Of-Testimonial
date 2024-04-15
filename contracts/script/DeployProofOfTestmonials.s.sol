// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {ProofOfTestimonials} from "../src/ProofOfTestimonials.sol";

contract DeployProofOfTestimonials is Script {
    function run() external returns (ProofOfTestimonials pot) {
        vm.startBroadcast();
        pot = new ProofOfTestimonials();
        vm.stopBroadcast();
    }
}
