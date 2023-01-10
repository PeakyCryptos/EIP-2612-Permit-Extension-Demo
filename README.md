# Overview

One of the limitations in the design of ERC20 tokens is the dynamic between `approve` and `transferFrom`. If one is interacting with a smart contract, it would require two transactions, one for approval and another for the smart contract call, which internally calls `transferFrom`. Additionally, it also means that the user needs to have ETH to pay for the transaction fees.

To overcome this limitation, EIP-2612 offers a new methodology to circumvent these issues with a "permit" function on top of the ERC20 standard. This function enables users to alter the ERC20 allowance mapping using a signed message rather than via a direct call that they would have to conduct themsevles. This signed message is then used by another party (usually the spender on behalf of the owner) to call permit, which internally calls the allowance function. The off-chain signature generation and verification process is outlined via [EIP-712](https://eips.ethereum.org/EIPS/eip-712) a standard that is widely supported by most of the major RPC providers.

# Demo steps

1. Deploy the ERC20 permit contract (preferably remix for ease of interaction)

2. put in src/Main/main.js -> contractAddress state in main component

3. in src/Main/main.js -> chain id state to the chain the contract is deployed on (goerli is 5)

4. in src/Main/main.js -> Change name state to the deployed token name

![image](https://user-images.githubusercontent.com/106453938/211556098-9da72e96-399e-44d9-80c6-82c2063d9bdb.png)

5. `npm start` to launch the web app (need metamask or an equivalent installed)

6. Click connect and link the desired account you would like to sign for

7. Pass in the prompted values when you click sign `(spender, value, nonce, deadline)`
   the `nonce` is the amount of total calls to this contract thus far for each specific address (included to avoid replay attacks)

8. Follow the metamask prompts and complete the signing process

![image](https://user-images.githubusercontent.com/106453938/211556952-efc30f4d-f335-4bc4-8e7e-1427c928e6b4.png)

9. Plug in the returned values (will appear in a prompt) into the deployed contract's permit function (any address can call this, as long as the passed in values compute to generate the signature of what the user signed off on)

![image](https://user-images.githubusercontent.com/106453938/211555995-8b9bbd55-9ae6-4d36-a170-bd41cd6cbd02.png)

10. If the transaction is successful check the allowance view function to see if the spender has been approved for the amount specified
