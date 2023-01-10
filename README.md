# Demo

1. Deploy ERC20 permit contract on remix

2. put in src/Main/main.js -> contractAddress state in main component

3. in src/Main/main.js -> chain id state to the chain the contract is deployed on (goerli is 5)

4. in src/Main/main.js -> Change name state to the deployed token name

5. npm start to launch the web app (need metamask or an equivalent installed)

6. Connect with the desired address you would like to sign for

7. Pass in the prompted values when you click sign (spender, value, nonce, deadline)
   the nonce is value of total calls to this contract thus far (for replay attack purposes)

8. Follow the metamask prompts and complete the signing process

9. Plug in the returned values (will appear a prompt) into the deployed contract's permit function (any address can call this, as long as the passed in values compute to generate the signatue of what the user signed off on)

10. If the transaction is successful check the allowance view function to see if the spender has been approved for the amount specified
