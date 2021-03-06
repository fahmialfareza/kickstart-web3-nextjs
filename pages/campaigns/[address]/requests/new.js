import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Layout from '../../../../components/Layout';

const RequestNew = ({ address }) => {
  const router = useRouter();

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);

    setLoading(true);
    setErrorMessage(false);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>

        <Message error header="Ops" content={errorMessage} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      address: context.params.address,
    },
  };
}

export default RequestNew;
