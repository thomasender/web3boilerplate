import React, { useState, useEffect } from "react";
import { Button, Header, Icon, Segment, Grid } from "semantic-ui-react";

function HeaderComponent({ web3, chainId, tokenData, userData }) {
  const { tokenSymbol, tokenName, tokenDecimals, totalSupply } = tokenData;
  const { userAddress, userTokenBalance, userETHBalance } = userData;
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
            {userAddress !== undefined ? (
              <p>
                Your {tokenSymbol} Balance: {userTokenBalance}
              </p>
            ) : (
              ""
            )}
            {userAddress !== undefined ? (
              <p>
                Your MATIC Balance: {parseInt(userETHBalance * 1000) / 1000}
              </p>
            ) : (
              ""
            )}
            {userAddress !== undefined ? (
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
