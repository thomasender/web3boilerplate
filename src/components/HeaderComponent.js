import React, { useState, useEffect } from "react";
import { Button, Header, Icon, Segment, Grid } from "semantic-ui-react";

function HeaderComponent({
  userAddress,
  web3,
  tokenName,
  contract,
  chainId,
  totalSupply,
  tokenSymbol,
  userBalance,
  tokenDecimals,
  userETHBalance,
}) {
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <p>NetworkId: {chainId}</p>
            <p>
              Total Supply:{" "}
              {chainId === 80001 ? parseInt(totalSupply).toLocaleString() : "0"}{" "}
              {tokenSymbol}
            </p>
            <p>
              {chainId === 80001 ? `Decimals: ${tokenDecimals}` : "Decimals: -"}
            </p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h1">
              <Icon name="ethereum" />
              {tokenName}
            </Header>
            <Header as="h1" icon>
              <Header.Subheader>
                <p>
                  {chainId !== 80001
                    ? "Please connect to Mumbai Testnet to use this DApp"
                    : ""}
                </p>
                {userAddress !== ""
                  ? "Welcome "
                  : "Welcome Guest, please connect your wallet"}
                <strong>{userAddress}</strong>
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column>
            {userAddress !== "" ? (
              <p>
                Your {tokenSymbol} Balance: {userBalance}
              </p>
            ) : (
              ""
            )}
            {userAddress !== "" ? (
              <p>Your MATIC Balance: {userETHBalance}</p>
            ) : (
              ""
            )}
            {userAddress !== "" ? (
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
              >
                Disconnect
              </Button>
            ) : (
              ""
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default HeaderComponent;
