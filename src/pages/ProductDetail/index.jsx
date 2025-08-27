import { useCartStore } from "@/store/cartStore";

import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Spinner,
  Button,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Badge,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetProductDetail } from "../../services/products";
import { Star, ShoppingCart } from "lucide-react";
import { primary, shadow } from "@/constants";
import { main } from "framer-motion/client";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetail(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // inside your component
  const addToCartHandler = () => {
    useCartStore.getState().addToCart(data.id, quantity);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="red.500">Failed to load product details.</Text>
      </Box>
    );
  }

  const { title, description, price, rating, thumbnail, images, stock } = data;
  const mainImage = selectedImage || images[0]; // use first image if no selection

  return (
    <Box maxW="6xl" mx="auto" py={10} px={6}>
      <Grid templateColumns={{ base: "1fr", md: "120px 1fr 1fr" }} gap={10}>
        {/* Thumbnails */}
        <GridItem>
          <VStack spacing={3} align="flex-start">
            {images?.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`${title} ${idx}`}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
                cursor="pointer"
                border={
                  mainImage === img
                    ? `2px solid ${primary}`
                    : "1px solid #E2E8F0"
                }
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </VStack>
        </GridItem>

        {/* Main Image */}
        <GridItem>
          <Image
            src={mainImage}
            alt={title}
            w="100%"
            h="400px"
            objectFit="cover"
          />
        </GridItem>

        {/* Details */}
        <GridItem>
          <VStack align="flex-start" spacing={5}>
            <Heading size="lg">{title}</Heading>

            <HStack spacing={1} align="center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.round(rating) ? primary : "none"}
                    color={i < Math.round(rating) ? primary : "#CBD5E0"}
                  />
                ))}
              <Text fontWeight="bold" color={"text"} ml={2}>
                {rating.toFixed(1)}
              </Text>
            </HStack>

            <Text fontSize="md" color="gray.600">
              {description}
            </Text>

            {/* Stock Badge */}
            <Badge
              color={stock > 0 ? "brand.600" : "red.600"}
              bg={stock > 0 ? "brand.100" : "red.100"}
              px={3}
              py={1}
              rounded="md"
              fontWeight="bold"
            >
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </Badge>

            <Text fontSize="2xl" fontWeight="bold" color={primary}>
              ${price}
            </Text>

            {/* Quantity + Add to Cart */}
            <HStack spacing={4}>
              <NumberInput
                value={quantity}
                onChange={(value) => setQuantity(Number(value))}
                min={1}
                max={stock || 100}
                size="md"
                isDisabled={stock === 0}
              >
                <NumberInputField
                  borderColor={primary}
                  _focus={{ borderColor: primary }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper borderColor={primary} />
                  <NumberDecrementStepper borderColor={primary} />
                </NumberInputStepper>
              </NumberInput>

              <Button
                leftIcon={<ShoppingCart />}
                isDisabled={stock === 0}
                colorScheme="brand"
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
