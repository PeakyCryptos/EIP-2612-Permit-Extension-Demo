// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract HelloWorld {
    string constant hello = "HELLO WORLD!";

    function helloWorld() external pure returns (string memory) {
        return hello;
    }
}
