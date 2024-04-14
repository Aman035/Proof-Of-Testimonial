// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";
import {TicTacToken} from "../src/TicTacToken.sol";
import {Token} from "../src/Token.sol";
import {NFT} from "../src/NFT.sol";
import {DeployTicTacToken} from "../script/DeployTicTacToken.s.sol";

/**
 * This helps to mock fn calls rather than using vm.prank again and again
 */
contract Player is Test {
    TicTacToken private ttt;
    address public playerAddress;

    constructor(TicTacToken _ttt, address _player) {
        ttt = _ttt;
        playerAddress = _player;
    }

    function markSpace(uint256 gameId, uint8 space) public {
        vm.prank(playerAddress);
        ttt.markSpace(gameId, space);
    }
}

contract TicTacTokenTest is Test {
    // Events
    event SpaceMarked(uint8 indexed space, TicTacToken.Symbol symbol);

    // State Variables
    TicTacToken ttt;
    Token private token;
    NFT private nft;
    Player X;
    Player O;
    address OWNER = msg.sender;
    uint256 public gameId;

    function setUp() public {
        // Using Deployment Script
        DeployTicTacToken deployer = new DeployTicTacToken();
        ttt = deployer.run();

        X = new Player(ttt, makeAddr("playerX"));
        O = new Player(ttt, makeAddr("playerO"));

        // Get Deployed Token and NFT Contract
        token = Token(ttt.getTokenAddress());
        nft = NFT(ttt.getNFTAddress());

        // Initialize game
        ttt.addGame(X.playerAddress(), O.playerAddress());
        gameId = 0;
    }

    ///////////////////////////////
    // Initial State Tests       //
    ///////////////////////////////
    function test_initially_empty_board() public view {
        TicTacToken.Symbol[9] memory board = ttt.getBoard(gameId);
        for (uint256 i = 0; i < 9; i++) {
            assert(board[i] == TicTacToken.Symbol.EMPTY);
        }
    }

    function test_initial_turn_is_of_playerX() public view {
        assert(ttt.getCurrentTurn(gameId) == X.playerAddress());
    }

    ///////////////////////////////
    // markSpace                 //
    ///////////////////////////////

    function test_cannot_mark_invalid_space() public {
        // Arrange
        uint8 invalidSpace = 9;
        // Act / Assert
        vm.expectRevert(TicTacToken.TicTacToken__InvalidSpace.selector);
        X.markSpace(gameId, invalidSpace);
    }

    function test_cannot_overwrite_marked_space() public {
        // Arrange
        X.markSpace(gameId, 0);
        // Act / Assert
        vm.expectRevert(TicTacToken.TickTacToken__SpaceAlreadyMarked.selector);
        O.markSpace(gameId, 0);
    }

    function test_cannot_mark_completed_game() public {
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 3);
        X.markSpace(gameId, 1);
        O.markSpace(gameId, 4);
        X.markSpace(gameId, 2); 
        // X won the game

        vm.expectRevert(TicTacToken.TickTacToken__GameAlreadyCompleted.selector);
        O.markSpace(gameId, 5);
    }

    function test_can_mark_space_with_X() public {
        X.markSpace(gameId, 0);
        assert(ttt.getBoardSpace(gameId, 0) == TicTacToken.Symbol.X);
    }

    function test_can_mark_space_with_O() public {
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 1);
        assert(ttt.getBoardSpace(gameId, 1) == TicTacToken.Symbol.O);
    }

    function test_mark_space_updates_turn() public {
        X.markSpace(gameId, 0);
        assert(ttt.getCurrentTurn(gameId) == O.playerAddress());
        O.markSpace(gameId, 1);
        assert(ttt.getCurrentTurn(gameId) == X.playerAddress());
    }

    function test_mark_space_emits_event() public {
        // Arrange
        // Act / Assert
        vm.expectEmit(address(ttt)); // address of emit emitter
        uint8 markedSpace = 0;
        emit SpaceMarked(markedSpace, TicTacToken.Symbol.X); // expected emitted event
        X.markSpace(gameId, markedSpace);
    }

    ///////////////////////////////
    // getBoardSpace             //
    ///////////////////////////////
    function test_getBoardSpace_reverts_for_invalid_space() public {
        // Arrange // Act // Assert
        vm.expectRevert(TicTacToken.TicTacToken__InvalidSpace.selector);
        ttt.getBoardSpace(gameId, 9);
    }
    // All other tcases are covered by markSpace tests

    ///////////////////////////////
    // getWinner                 //
    ///////////////////////////////

    function test_initally_no_winner() public view {
        assert(ttt.getWinner(gameId) == address(0));
    }

    function test_game_in_progress_returns_no_winner() public {
        X.markSpace(gameId, 1);
        assert(ttt.getWinner(gameId) == address(0));
    }

    function test_draw_returns_no_winner() public {
        X.markSpace(gameId, 4);
        O.markSpace(gameId, 0);
        X.markSpace(gameId, 1);
        O.markSpace(gameId, 7);
        X.markSpace(gameId, 2);
        O.markSpace(gameId, 6);
        X.markSpace(gameId, 8);
        O.markSpace(gameId, 5);
        assert(ttt.getWinner(gameId) == address(0));
        assert(token.balanceOf(X.playerAddress()) == 0);
        assert(token.balanceOf(O.playerAddress()) == 0);
        assert(nft.balanceOf(X.playerAddress()) == 0);
        assert(nft.balanceOf(O.playerAddress()) == 0);
    }

    function test_checks_for_horizontal_win() public {
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 3);
        X.markSpace(gameId, 1);
        O.markSpace(gameId, 4);
        X.markSpace(gameId, 2);
        assert(ttt.getWinner(gameId) == X.playerAddress());
        assert(token.balanceOf(X.playerAddress()) == 300);
        assert(nft.balanceOf(X.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == X.playerAddress());

        assert(token.balanceOf(O.playerAddress()) == 0);
        assert(nft.balanceOf(O.playerAddress()) == 0);
    }

    function test_checks_for_horizontal_win_row2() public {
        X.markSpace(gameId, 3);
        O.markSpace(gameId, 0);
        X.markSpace(gameId, 4);
        O.markSpace(gameId, 1);
        X.markSpace(gameId, 5);
        assert(ttt.getWinner(gameId) == X.playerAddress());
        assert(token.balanceOf(X.playerAddress()) == 300);
        assert(nft.balanceOf(X.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == X.playerAddress());
    }

    function test_checks_for_vertical_win() public {
        X.markSpace(gameId, 1);
        O.markSpace(gameId, 0);
        X.markSpace(gameId, 2);
        O.markSpace(gameId, 3);
        X.markSpace(gameId, 4);
        O.markSpace(gameId, 6);
        assert(ttt.getWinner(gameId) == O.playerAddress());
        assert(token.balanceOf(O.playerAddress()) == 300);
        assert(nft.balanceOf(O.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == O.playerAddress());
    }

    function test_checks_for_diagonal_win() public {
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 1);
        X.markSpace(gameId, 4);
        O.markSpace(gameId, 5);
        X.markSpace(gameId, 8);
        assert(ttt.getWinner(gameId) == X.playerAddress());
        assert(token.balanceOf(X.playerAddress()) == 300);
        assert(nft.balanceOf(X.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == X.playerAddress());
    }

    function test_checks_for_antidiagonal_win() public {
        X.markSpace(gameId, 1);
        O.markSpace(gameId, 2);
        X.markSpace(gameId, 3);
        O.markSpace(gameId, 4);
        X.markSpace(gameId, 5);
        O.markSpace(gameId, 6);
        assert(ttt.getWinner(gameId) == O.playerAddress());
        assert(token.balanceOf(O.playerAddress()) == 300);
        assert(nft.balanceOf(O.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == O.playerAddress());
    }

    function test_checks_for_4_turn_win() public {
        // X | O | X
        // X | O | O
        // X |   | 
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 1);
        X.markSpace(gameId, 2);
        O.markSpace(gameId, 4);
        X.markSpace(gameId, 3);
        O.markSpace(gameId, 5);
        X.markSpace(gameId, 6);
        assert(ttt.getWinner(gameId) == X.playerAddress());
        assert(token.balanceOf(X.playerAddress()) == 200);
        assert(nft.balanceOf(X.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == X.playerAddress());
    }

        function test_checks_for_5_turn_win() public {
        // X | X | O
        // X | O | O
        // X | O | X
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 2);
        X.markSpace(gameId, 1);
        O.markSpace(gameId, 4);
        X.markSpace(gameId, 3);
        O.markSpace(gameId, 5);
        X.markSpace(gameId, 8);
        O.markSpace(gameId, 7);
        X.markSpace(gameId, 6);
        assert(ttt.getWinner(gameId) == X.playerAddress());
        assert(token.balanceOf(X.playerAddress()) == 100);
        assert(nft.balanceOf(X.playerAddress()) == 1);
        assert(nft.ownerOf(gameId) == X.playerAddress());
    }

    ///////////////////////////////
    // getOwner                  //
    ///////////////////////////////
    function test_getOwner() public view {
        assert(ttt.getOwner() == msg.sender);
    }

    ///////////////////////////////
    // resetBoard                //
    ///////////////////////////////
    function test_resetBoard_revert_for_non_owner() public {
        // Arrange
        address nonOwner = makeAddr("nonOwner");
        // Act / Assert
        vm.expectRevert(TicTacToken.TickTacToken__Unauthorized.selector);
        vm.prank(nonOwner);
        ttt.resetBoard(gameId);
    }

    function test_resetBoard_revert_for_completed_game() public {
        X.markSpace(gameId, 0);
        O.markSpace(gameId, 1);
        X.markSpace(gameId, 4);
        O.markSpace(gameId, 5);
        X.markSpace(gameId, 8);

        vm.prank(OWNER);
        vm.expectRevert(TicTacToken.TickTacToken__CompletedGameCannotBeReset.selector);
        ttt.resetBoard(gameId);
    }

    function test_resetBoard_for_uncompleted_game() public {
        vm.prank(OWNER);
        ttt.resetBoard(gameId);
    }

    function test_resetBoard_resets_board() public {
        X.markSpace(gameId, 0);
        vm.prank(OWNER);
        ttt.resetBoard(gameId);
        TicTacToken.Symbol[9] memory board = ttt.getBoard(gameId);
        for (uint256 i = 0; i < 9; i++) {
            assert(board[i] == TicTacToken.Symbol.EMPTY);
        }
    }
}
