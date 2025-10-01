import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <VStack height={"90vh"} justify={"center"} spacing={4}>
      <Heading size={"2xl"}>🎉 Payment Successful!</Heading>
      <Text>Thank you for your purchase!</Text>
      <Button
        mt={4}
        as={Link}
        to={`/products/`}
        bg="primary"
        color="white"
        _hover={{ bg: "primary.900", boxShadow: "md" }}
        rounded={"full"}
      >
        Explore More Products
      </Button>{" "}
    </VStack>
  );
}
