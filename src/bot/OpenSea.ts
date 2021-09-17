import { OpenSeaPort, Network } from "opensea-js";
import HDWalletProvider from "@truffle/hdwallet-provider";

class OpenSea {
  seaport: OpenSeaPort;

  constructor() {
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: process.env.MNEMONIC
      },
      providerOrUrl: "https://mainnet.infura.io/v3/2ed34d2a687a426087e5d8646a2ff411"
    });

    this.seaport = new OpenSeaPort(provider, {
      networkName: Network.Main
    });
  }
}

export default OpenSea;