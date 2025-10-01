import React from "react";
import { Box, Text, Image, Stack, Button } from "@chakra-ui/react";

export default function Success() {
  const query = new URLSearchParams(window.location.search);
  const cart = JSON.parse(query.get("cart") || "[]");

  return (
    <Box p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Payment Successful! 🎉
      </Text>

      {cart.map((item) => (
        <Stack key={item.id} direction="row" spacing={4} mb={2}>
          <Image boxSize="100px" src={item.thumbnail} alt={item.title} />
          <Box>
            <Text fontWeight="bold">{item.title}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
          </Box>
        </Stack>
      ))}

      <Button
        mt={6}
        colorScheme="green"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </Button>
    </Box>
  );
}
