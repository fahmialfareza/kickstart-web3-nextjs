import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xcecE523f3b007350e6Ff11F4AF43bA6332E89B53'
);

export default instance;
