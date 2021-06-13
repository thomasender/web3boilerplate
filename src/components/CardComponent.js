import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "semantic-ui-react";

function CardComponent({
  web3,
  contract,
  didRequestToken,
  userAddress,
  initWeb3,
}) {
  return (
    <div>
      {didRequestToken === false && userAddress !== "" ? (
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
