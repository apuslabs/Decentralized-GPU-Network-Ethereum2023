import Web3 from "web3";

declare global {
    interface Window {
        ethereum: any;
        Web3: typeof Web3;
    }
}
