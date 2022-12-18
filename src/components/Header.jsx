import React from "react";

import { Image, Text } from "@chakra-ui/react";
function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Image
        src="./berlinPolice.png"
        boxSize="120px"
        objectFit="cover"
        borderRadius="full"
      />
      <div style={{display : 'flex', flexDirection: 'column'}}>
      <Text as="b" fontSize="3xl">
        Police Department of Berlin
      </Text>

      <Text  fontSize="2xl">
        Stolen Bykes
      </Text>
      </div>
    </div>
  );
}

export default Header;
