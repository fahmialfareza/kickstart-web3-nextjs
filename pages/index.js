import React, { useEffect } from 'react';
import factory from '../ethereum/factory';

const CampaignIndex = () => {
  const start = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    console.log(campaigns);
  };

  useEffect(() => {
    start();
  });

  return <div>Campaigns Index!</div>;
};

export default CampaignIndex;
