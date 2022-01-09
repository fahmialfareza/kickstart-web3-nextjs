import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.ethereum);
} else {
  // We are on the browser *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/8b9216a5d2434898bfc43998c1e718bb'
  );
  web3 = new Web3(provider);
}

export default web3;
