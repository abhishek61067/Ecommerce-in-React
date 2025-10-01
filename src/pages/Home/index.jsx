// HomePage.tsx
import {
  Box,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useGetProductList } from "../../services/products";
import Tilt from "react-parallax-tilt";
import { dark } from "../../constants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Import your product card dependencies (same as ProductList)
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, isLoading, isError } = useGetProductList("", "", "", 1, 10);

  return (
    <Box w="full" bgGradient="linear(to-b, gray.800, gray.900)" color="white">
      {/* Hero Section */}
      <Box
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px={4}
      >
        <VStack spacing={6}>
          <Text
            bgGradient="linear(to-r, purple.400, blue.300)"
            bgClip="text"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
          >
            One-stop Shopify Theme
          </Text>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="extrabold"
            lineHeight="short"
          >
            Prime Quality <br /> Premium Design
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" maxW="2xl">
            Craft a beautiful and high-converting Shopify store with Kalles
            multipurpose theme. Optimized for eCommerce, speed and user
            experiences.
          </Text>
        </VStack>
      </Box>

      {/* Product Slider */}
      <Box px={6} py={12} maxW="7xl" mx="auto">
        <Heading
          size="lg"
          textAlign="center"
          mb={8}
          bgGradient="linear(to-r, pink.400, purple.400)"
          bgClip="text"
        >
          Featured Products
        </Heading>

        {!isLoading && !isError && data?.products?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {data.products.map((product) => (
              <SwiperSlide key={product.id}>
                {/* ⬇️ Using the SAME card code as ProductList ⬇️ */}
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.0}
                  scale={1.1}
                  transitionSpeed={2500}
                  tiltMaxAngleX={25}
                  tiltMaxAngleY={25}
                  className="w-[300px]"
                >
                  <Card
                    zIndex={1000}
                    maxW="sm"
                    bg={useColorModeValue("white", dark)}
                    borderRadius="2xl"
                    boxShadow="0 8px 20px rgba(112, 129, 129, 0.25)"
                    border="2px solid transparent"
                    role="group"
                    transition="all 0.4s ease"
                    _hover={{
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(255, 84, 152, 0.4)",
                    }}
                  >
                    <CardBody>
                      {/* Discount + Category badges */}
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
                          colorScheme="green"
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
                        _groupHover={{
                          transform:
                            "translateY(-40px) scale(1.25) rotate(10deg)",
                        }}
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

                        {/* Price */}
                        <HStack mt={2} spacing={3} align="center">
                          <Badge
                            colorScheme="green"
                            borderRadius="full"
                            px={4}
                            py={2}
                            width="fit-content"
                            fontSize="md"
                            fontWeight="bold"
                          >
                            ${(product.price * 0.9).toFixed(2)}
                          </Badge>
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
                </Tilt>
                {/* ⬆️ Same card code as ProductList ⬆️ */}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
