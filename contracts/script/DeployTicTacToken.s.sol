// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {TicTacToken} from "../src/TicTacToken.sol";

contract DeployTicTacToken is Script {
    function run() external returns (TicTacToken ttt) {
        vm.startBroadcast();
        ttt = new TicTacToken();
        vm.stopBroadcast();
    }
}
