// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract permitDemo is ERC20, ERC20Permit {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    function mint(address to, uint256 value) external {
        _mint(to, value);
    }
}
