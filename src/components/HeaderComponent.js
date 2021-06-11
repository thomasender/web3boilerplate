import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function HeaderComponent({ userAddress, web3, tokenName, contract }) {
  return (
    <div>
      <Segment>
        <Header as="h1">
          <Icon name="ethereum" />
          {tokenName}
        </Header>
        <Header as="h1" icon>
          <Header.Subheader>
            {userAddress !== ""
              ? "Welcome "
              : "Welcome, please connect your wallet"}
            <strong>{userAddress}</strong>
          </Header.Subheader>
        </Header>
        {userAddress !== "" ? (
          <Button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              let balanceOf = await contract.methods
                .balanceOf(userAddress)
                .call();
              alert(balanceOf);
            }}
          >
            Fetch Balance
          </Button>
        ) : (
          ""
        )}
      </Segment>
    </div>
  );
}

export default HeaderComponent;
