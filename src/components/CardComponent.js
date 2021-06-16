import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "semantic-ui-react";

function CardComponent({ web3, contract, userData, initWeb3, initUser }) {
  return (
    <div>
      {userData.didRequestToken === false && userData.userAddress !== "" ? (
        <Card>
          <Card.Content>
            <Button
              type="submit"
              onClick={async () =>
                await contract.methods
                  .payToken()
                  .send({ from: window.ethereum.selectedAddress })
                  .on("receipt", (receipt) => {
                    initWeb3();
                    initUser();
                  })
                  .on("error", (error) => alert(error.message))
              }
            >
              Request Free Tokens
            </Button>
          </Card.Content>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}

export default CardComponent;
