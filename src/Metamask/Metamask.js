import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { ethers } from "ethers";

class Metamask extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    this.setState({
      selectedAddress: accounts[0],
    });
  }

  async sendDaiTo(to, amountInEther) {}

  renderMetamask() {
    if (!this.state.selectedAddress) {
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
              onClick={() => console.log("Connected")}
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

export default Metamask;
