"use client";
import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  Button,
  Spinner,
  Center,
  useColorModeValue,
  HStack,
  VStack,
  Stack,
  Input,
  Divider,
  FormLabel,
} from "@chakra-ui/react";
import { useCartStore } from "@/store/cartStore";
import { useGetProductList } from "../../services/products";
import axios from "axios";
import { green } from "./../../constants/index";

const CartPage = () => {
  const { data, isLoading, isError, error } = useGetProductList();

  const cart = useCartStore((state) => state.cart); // [{id, quantity}]
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const [address, setAddress] = useState({
    name: "",
    street: "",
  });

  const bgColor = useColorModeValue("white", "gray.800");
  const tableBgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const errorColor = useColorModeValue("red.500", "red.300");

  if (isLoading) {
    return (
      <Center h="70vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="70vh">
        <Text color={errorColor}>
          Error: {error?.message || "Something went wrong"}
        </Text>
      </Center>
    );
  }

  const products = data?.products || [];

  const cartItems = cart
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return null;
      return { ...product, quantity: cartItem.quantity };
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.1; // 10% discount
  const shipping = subtotal > 50 ? 0 : 2;
  const total = subtotal + shipping - discount;

  const increment = (id, qty) => updateQuantity(id, qty + 1);
  const decrement = (id, qty) => {
    if (qty > 1) updateQuantity(id, qty - 1);
  };

  const handleCheckout = async () => {
    if (!address.name || !address.street) {
      alert("Please fill in your name and street address!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {
          cartItems,
          deliveryAddress: address, // send only name and street for now
        }
      );

      const { url } = res.data;
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <Box p={8} bg={bgColor}>
      <Text fontSize="2xl" fontWeight="bold" mb={6} color={textColor}>
        Your Cart
      </Text>

      {cartItems.length === 0 ? (
        <Text color={textColor}>Your cart is empty.</Text>
      ) : (
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          align="flex-start"
        >
          {/* Left: Scrollable table */}
          <Box
            flex="2"
            maxH="500px"
            overflowY="auto"
            bg={tableBgColor}
            borderRadius="md"
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Table variant="simple">
              <Thead position="sticky" top={0} bg={tableBgColor} zIndex={1}>
                <Tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <HStack>
                        <Image
                          boxSize="80px"
                          objectFit="cover"
                          src={item.thumbnail}
                          alt={item.title}
                        />
                        <Text color={textColor}>{item.title}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Text color={textColor}>${item.price}</Text>
                    </Td>
                    <Td>
                      <HStack>
                        <Button
                          size="sm"
                          onClick={() => decrement(item.id, item.quantity)}
                        >
                          -
                        </Button>
                        <Input
                          value={item.quantity}
                          size="sm"
                          width="50px"
                          textAlign="center"
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0)
                              updateQuantity(item.id, val);
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => increment(item.id, item.quantity)}
                        >
                          +
                        </Button>
                      </HStack>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Right: Order summary + Address */}
          <Box
            flex="1"
            p={4}
            bg={bgColor}
            borderRadius="md"
            border="1px"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            position="sticky"
            top="20px"
            h="fit-content"
          >
            <Text fontSize="xl" fontWeight="bold" mb={4} color={textColor}>
              Order Summary
            </Text>
            <Text mb={4} fontSize="xs" color={total > 50 ? green : "gray.500"}>
              Disclaimer: No shipping charge will apply for orders above $50
            </Text>

            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text color={textColor}>Items ({cartItems.length})</Text>
                <Text color={textColor}>${subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color={textColor}>Shipping</Text>
                <Text color={total > 50 ? green : "gray.500"}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text color={textColor}>Discount (10%)</Text>
                <Text color={"primary"}>-${discount.toFixed(2)}</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text fontWeight="bold" color={textColor}>
                  Total
                </Text>
                <Text fontWeight="bold" color={textColor}>
                  ${total.toFixed(2)}
                </Text>
              </HStack>
            </VStack>

            {/* Delivery Address Form: simplified */}
            <Box mt={4}>
              <Text fontWeight="bold" mb={2} color={textColor}>
                Delivery Address
              </Text>
              <VStack spacing={2} align="stretch">
                <Box>
                  <FormLabel color={textColor}>Full Name</FormLabel>
                  <Input
                    value={address.name}
                    placeholder="John Doe"
                    onChange={(e) =>
                      setAddress({ ...address, name: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel color={textColor}>Street Address</FormLabel>
                  <Input
                    value={address.street}
                    placeholder="123 Main St"
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </Box>
              </VStack>
            </Box>

            <Button
              mt={4}
              colorScheme="green"
              width="100%"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default CartPage;
