import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x5F49B71360eADB17F4ede735A39581bd3A084Dd1'
);

export default instance;
