import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

const ContributeForm = ({ address }) => {
  const router = useRouter();

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, 'ether') });

      router.replace(`/campaigns/${address}`);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contirbute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />

        <Message error header="Ops" content={errorMessage} />
        <Button loading={loading} primary>
          Contribute!
        </Button>
      </Form.Field>
    </Form>
  );
};

export default ContributeForm;
