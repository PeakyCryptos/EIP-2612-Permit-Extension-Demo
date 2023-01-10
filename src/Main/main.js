import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { ethers } from "ethers";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: null,
      domainName: "MyToken",
      domainVersion: "1",
      chainId: 5, // goerli
      contractAddress: "0x3E18F13c2aC8e5Fa1b6E0ad2e0342eCC25300446", // put your deployed contract instance
      account: null,
      domain: null,
      domainType: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
    };
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    this.setState({
      provider: provider,
      account: accounts[0],
      domain: {
        name: this.state.domainName,
        version: this.state.domainVersion,
        verifyingContract: this.state.contractAddress,
        chainId: this.state.chainId,
      },
    });
  }

  async signTyped(dataToSign) {
    // call this method to sign EIP 712 data
    const signature = await this.state.provider.send("eth_signTypedData_v4", [
      this.state.account,
      dataToSign,
    ]);

    return signature;
  }

  async createPermit(spender, value, nonce, deadline) {
    const permit = {
      owner: this.state.account,
      spender,
      value,
      nonce,
      deadline,
    };
    const Permit = [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ];

    const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: this.state.domainType,
        Permit: Permit,
      },
      domain: this.state.domain,
      primaryType: "Permit",
      message: permit,
    });

    const signature = await this.signTyped(dataToSign);
    const split = ethers.utils.splitSignature(signature);
    const { v, r, s } = split;

    return {
      r,
      s,
      v,
      signature,
    };
  }

  async permitHandler() {
    const spender = prompt("Specify Spender(address): ");
    const value = prompt("Value(wei): ");
    const nonce = prompt("nonce: ");
    const deadline = prompt("deadline: ");

    const permit = await this.createPermit(spender, value, nonce, deadline);

    const returnString = `r: ${permit.r.toString("hex")} ,
      s: ${permit.s.toString("hex")},
      v: ${permit.v}, 
      sig: ${permit.signature},
      spender: ${spender}, 
      value: ${value},
      nonce: ${nonce},
      deadline: ${deadline}`;

    console.log(returnString);

    alert(returnString);
  }

  renderMetamask() {
    if (!this.state.account) {
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Connect to Metamask</h1>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              class="btn btn-primary"
              onClick={() => this.connectToMetamask()}
            >
              Connect
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>EIP-712 Signing </h1>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                this.permitHandler();
              }}
            >
              Sign
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderMetamask()}</div>;
  }
}

export default Main;
