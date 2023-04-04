//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Greeter {
  string title;
  string abs;
  string url;

  constructor(string memory _title, string memory _abs, string memory _url) {
    console.log("Contract deployed!");
    title = _title;
    abs = _abs;
    url = _url;
  }

  function greet() public view returns (string memory, string memory, string memory) {
    return (title, abs, url);
  }

  function setGreeting(string memory _title, string memory _abs, string memory _url) public {
    console.log("Updating values...");
    title = _title;
    abs = _abs;
    url = _url;
  }
}