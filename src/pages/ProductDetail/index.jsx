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
  Center,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetProductDetail } from "../../services/products";
import { Star, ShoppingCart, DollarSign } from "lucide-react";
import { primary, shadow } from "@/constants";
import { main } from "framer-motion/client";
import Tilt from "react-parallax-tilt";
import { green } from "./../../constants/index";
import SpinnerComponent from "./../../components/Spinner";

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
    return <SpinnerComponent />;
  }

  if (isError || !data) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="red.500">Failed to load product details.</Text>
      </Box>
    );
  }

  const {
    title,
    description,
    price,
    rating,
    thumbnail,
    images,
    stock,
    category,
  } = data;
  const mainImage = selectedImage || images[0]; // use first image if no selection

  return (
    <VStack h={"90vh"} maxW="6xl" mx="auto" py={10} px={6} justify="center">
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
                transition={"transform 0.25s"}
                _hover={{
                  transform: "scale(1.05) rotate(5deg)",
                }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </VStack>
        </GridItem>

        {/* Main Image */}
        <GridItem>
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.0}
            scale={1.5}
            transitionSpeed={1500}
            tiltMaxAngleX={30}
            tiltMaxAngleY={40}
            className="w-[300px]"
          >
            <Image
              src={mainImage}
              alt={title}
              w="100%"
              h="400px"
              objectFit="cover"
            />
          </Tilt>
        </GridItem>

        {/* Details */}
        <GridItem>
          <VStack align="flex-start" spacing={5}>
            {/* gradient color */}
            <Heading
              size="lg"
              // bgGradient={`linear(to-r, brand.300, #0cebc2ff ,text)`}
              // bgClip="text"
              color={"text"}
            >
              {title}
            </Heading>
            <Badge
              colorScheme="brand"
              px={3}
              py={1}
              rounded="full"
              fontWeight="bold"
            >
              {category}
            </Badge>

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

            <Text fontSize="md" color="gray.500">
              {description}
            </Text>

            {/* Stock Badge */}
            <Badge
              colorScheme="blue"
              px={3}
              py={1}
              rounded="md"
              fontWeight="bold"
            >
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </Badge>
            <Text fontSize="2xl" fontWeight="bold" color={"blue.200"}>
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
                rounded={"full"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <Button
                leftIcon={<ShoppingCart />}
                isDisabled={stock === 0}
                onClick={addToCartHandler}
                bg={primary}
                color={"white"}
                _hover={{
                  bg: "brand.600",
                }}
              >
                Add to Cart
              </Button>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default ProductDetail;
