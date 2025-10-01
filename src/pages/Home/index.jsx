import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  IconButton,
  useColorModeValue,
  Card,
  CardBody,
  HStack,
  Badge,
  Image,
  Stack,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetProductList } from "../../services/products";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { dark } from "../../constants";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, isLoading, isError } = useGetProductList("", "", "", 1, 10);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Assign refs to swiper navigation after components mount
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const navBg = useColorModeValue("black", "white");
  const navColor = useColorModeValue("white", "black");

  return (
    <Box w="full" color="white">
      {/* Hero Section */}
      <Box
        h="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={4}
      >
        <VStack spacing={6}>
          <Text
            bgGradient="linear(to-r, brand.400, blue.300)"
            bgClip="text"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
          >
            One-stop Ecommerce Solution
          </Text>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="extrabold"
            lineHeight="short"
            color={useColorModeValue("gray.800", "gray.200")}
          >
            Prime Quality <br /> Premium Design
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.500" maxW="2xl">
            Craft a beautiful and high-converting Shopify store with this
            tutorial. Optimized for eCommerce, speed and user experiences.
          </Text>
        </VStack>
      </Box>

      {/* Product Slider */}
      <Box px={6} py={12} maxW="7xl" mx="auto" position="relative">
        <Text
          bgGradient="linear(to-r, brand.400, blue.300)"
          bgClip="text"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          textAlign={"center"}
          mb={4}
        >
          Featured Products
        </Text>

        {!isLoading && !isError && data?.products?.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            onSwiper={setSwiperInstance}
          >
            {data.products.map((product) => (
              <SwiperSlide key={product.id}>
                {/* Product Card */}
                <Card
                  key={product.id}
                  maxW="sm"
                  bg={useColorModeValue("white", dark)}
                  borderRadius="2xl"
                  boxShadow="0 8px 20px rgba(112, 129, 129, 0.25)"
                  border="2px solid transparent"
                  role="group" // ✅ important for group hover
                >
                  <CardBody>
                    {/* Discount coupon badge */}
                    <HStack>
                      <Badge
                        position="absolute"
                        top={2}
                        left={2}
                        colorScheme="brand"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="9px"
                        shadow="md"
                      >
                        {product.category}
                      </Badge>
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="blue"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="9px"
                        shadow="md"
                      >
                        10% OFF
                      </Badge>
                    </HStack>
                    <Box
                      overflow="hidden"
                      borderRadius="lg"
                      transition="transform 0.4s ease"
                    >
                      <Image
                        src={product?.images?.[0]}
                        alt={product.title}
                        w="100%"
                        h="200px"
                        objectFit="cover"
                      />
                    </Box>

                    <Stack spacing={2} mt={4}>
                      <Heading
                        size={{ base: "sm", "2xl": "md" }}
                        color={"primary"}
                      >
                        {product.title}
                      </Heading>
                      <Text noOfLines={2} color="muted" fontSize="sm">
                        {product.description}
                      </Text>

                      {/* Price section */}
                      <HStack mt={2} spacing={3} align="center">
                        {/* Discounted price */}
                        <Badge
                          colorScheme="blue" // or "brand"
                          borderRadius="full"
                          px={4}
                          py={2}
                          width="fit-content"
                          fontSize="md"
                          fontWeight="bold"
                        >
                          ${(product.price * 0.9).toFixed(2)} {/* ✅ 10% off */}
                        </Badge>

                        {/* Original price */}
                        <Text
                          fontSize="lg"
                          color="gray.500"
                          textDecoration="line-through"
                        >
                          ${product.price}
                        </Text>
                      </HStack>
                    </Stack>
                  </CardBody>
                  <CardFooter>
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      flex={1}
                      bg="primary"
                      color="white"
                      _hover={{ bg: "primary.900", boxShadow: "md" }}
                      rounded={"full"}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <HStack mt={8} justify={"center"}>
          <Button
            as={Link}
            to={`/products/`}
            bg="primary"
            color="white"
            _hover={{ bg: "primary.900", boxShadow: "md" }}
            rounded={"full"}
          >
            Explore Products
          </Button>{" "}
        </HStack>

        {/* Custom Navigation Buttons */}
        <IconButton
          ref={prevRef}
          aria-label="Previous"
          icon={<FaArrowLeft />}
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          bg={navBg}
          color={navColor}
          rounded="full"
          size="lg"
          zIndex={10}
          _hover={{ opacity: 0.8 }}
        />
        <IconButton
          ref={nextRef}
          aria-label="Next"
          icon={<FaArrowRight />}
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          bg={navBg}
          color={navColor}
          rounded="full"
          size="lg"
          zIndex={10}
          _hover={{ opacity: 0.8 }}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
