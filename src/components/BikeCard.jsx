import React from "react";

import {
  Card,
  Container,
  CardBody,
  CardFooter,
  Text,
  Button,
  Stack,
  Heading,
  Image,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { MdLocationOn, MdAccessTime } from "react-icons/md";

function BikeCard({
  title,
  description,
  dateStolen,
  stolenLocation,
  thumb,
  status,
}) {
  return (
    <Container maxW="900px" mt={10}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={thumb}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{title}</Heading>

            <Text py="2">{description}</Text>
          </CardBody>
        
          <CardFooter>
            
            <Button
              leftIcon={<MdLocationOn />}
              variant="outline"
              colorScheme="blue"
              mr={4}
            >
              {stolenLocation}
            </Button>

            <Button
              leftIcon={<MdAccessTime />}
              variant="outline"
              colorScheme="yellow"
              mr={4}
            >
              {dateStolen}
            </Button>
            {status === "found" ? (
              <Button variant="outline" colorScheme="green">
                {status}
              </Button>
            ) : (
              <Button variant="outline" colorScheme="red">
                {status}
              </Button>
            )}
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
}

export default BikeCard;
