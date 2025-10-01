import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Heading,
  Stack,
  Button,
  HStack,
  useColorModeValue,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Spacer,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useGetProductList } from "../../services/products";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { dark } from "../../constants";

const getPageNumbers = (current, total) => {
  const delta = 1; // pages around current
  const range = [];
  const left = Math.max(1, current - delta);
  const right = Math.min(total, current + delta);

  for (let i = 1; i <= total; i++) {
    if (i <= 2 || i > total - 2 || (i >= left && i <= right)) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }
  return range;
};

const ProductList = () => {
  // pagination states
  const [page, setPage] = useState(1);
  const limit = 10;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const { data, isLoading, isError } = useGetProductList(
    search,
    sortBy,
    order,
    page,
    limit
  );

  return (
    <Box px={8} py={6}>
      {/* Search + Sorting */}
      <HStack mb={8} justify="space-between">
        {/* Left: Search */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={18} color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            borderRadius="full"
            bg={useColorModeValue("white", "gray.700")}
            shadow="sm"
            transition="all 0.3s ease" // ✅ smooth animation
            w={{ base: "200px", md: "300px" }} // default width
            _focus={{
              borderColor: "pink.400",
              boxShadow: "0 8px 30px rgba(255, 84, 152, 0.4)",
              w: { base: "250px", md: "500px" }, // ✅ expand on focus
            }}
          />
        </InputGroup>

        {/* Right: Sorting */}
        <Select
          maxW="200px"
          value={`${sortBy}-${order}`}
          onChange={(e) => {
            const [newSort, newOrder] = e.target.value.split("-");
            setSortBy(newSort);
            setOrder(newOrder);
          }}
          color="text"
          bg={useColorModeValue("white", "gray.700")}
          rounded="full"
          transition="all 0.3s ease"
          _focus={{
            borderColor: "pink.400",
            boxShadow: "0 15px 30px rgba(255, 84, 152, 0.4)", // pink glow
            outline: "none",
          }}
        >
          <option value="title-asc">Title - A - Z</option>
          <option value="title-desc">Title - Z - A</option>
          <option value="price-asc">Price - Low - High</option>
          <option value="price-desc">Price - High - Low</option>
        </Select>
      </HStack>

      {/* States */}
      {isLoading && (
        <Center py={20}>
          <Spinner size="xl" color="brand.400" />
        </Center>
      )}

      {isError && (
        <Center py={20}>
          <Text color="red.500">Failed to load products</Text>
        </Center>
      )}

      {!isLoading && !isError && (!data || data?.products?.length === 0) && (
        <Center py={20} flexDir="column" textAlign="center">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
            alt="No products"
            boxSize="120px"
            opacity={0.7}
            mb={4}
          />
          <Heading size="md" mb={2} color="pink.500">
            No Products Found
          </Heading>
          <Text color="gray.500">Try adjusting your search or sorting</Text>
        </Center>
      )}

      {/* Product Cards */}
      {!isLoading && !isError && data?.products?.length > 0 && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {data.products.map((product) => (
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
                key={product.id}
                maxW="sm"
                bg={useColorModeValue("white", dark)}
                borderRadius="2xl"
                boxShadow="0 8px 20px rgba(112, 129, 129, 0.25)"
                border="2px solid transparent"
                role="group" // ✅ important for group hover
                transition="all 0.4s ease"
                _hover={{
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(255, 84, 152, 0.4)",
                }}
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
                    _groupHover={{
                      transform: "translateY(-40px) scale(1.25) rotate(10deg)",
                    }} // ✅ image lift + zoom
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
            </Tilt>
          ))}
        </SimpleGrid>
      )}

      {data && data.total && (
        <HStack spacing={2} justify="center" mt={8} wrap="wrap">
          {/* Previous button */}
          <Button
            size={{ base: "xs", sm: "sm", md: "md" }}
            onClick={() => setPage((prev) => prev - 1)}
            isDisabled={page === 1}
            colorScheme="brand"
          >
            Previous
          </Button>

          {/* Page numbers */}
          {getPageNumbers(page, Math.ceil(data.total / limit)).map((p, i) =>
            p === "..." ? (
              <Text key={i} px={2}>
                ...
              </Text>
            ) : (
              <Button
                key={i}
                bg={
                  p === page
                    ? "brand.300"
                    : useColorModeValue("gray.200", "gray.700")
                }
                onClick={() => setPage(p)}
                size={{ base: "xs", sm: "sm", md: "md" }}
              >
                {p}
              </Button>
            )
          )}

          {/* Next button */}
          <Button
            size={{ base: "xs", sm: "sm", md: "md" }}
            onClick={() => setPage((prev) => prev + 1)}
            isDisabled={page === Math.ceil(data.total / limit)}
            colorScheme="brand"
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ProductList;
