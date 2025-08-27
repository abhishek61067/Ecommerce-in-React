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
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useGetProductList } from "../../services/products";

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
          color="primary"
          bg={useColorModeValue("white", "gray.700")}
          rounded="full"
          transition="all 0.3s ease"
          _focus={{
            borderColor: "pink.400",
            boxShadow: "0 8px 30px rgba(255, 84, 152, 0.4)", // pink glow
            outline: "none",
          }}
        >
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </Select>
      </HStack>

      {/* States */}
      {isLoading && (
        <Center py={20}>
          <Spinner size="xl" color="pink.400" />
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
            <Card
              key={product.id}
              maxW="sm"
              bg={"bg"}
              borderRadius="2xl"
              boxShadow="lg"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "0 8px 30px rgba(255, 84, 152, 0.4)",
              }}
              transition="all 0.3s"
            >
              <CardBody>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  borderRadius="lg"
                  w="100%"
                  h="200px"
                  objectFit="cover"
                  mb={4}
                />
                <Stack spacing={3}>
                  <Heading size="md" color={"primary"}>
                    {product.title}
                  </Heading>
                  <Text noOfLines={2} color="muted" fontSize="sm">
                    {product.description}
                  </Text>
                  <Text fontWeight="bold" color="brand.600" fontSize="lg">
                    ${product.price}
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter>
                <Button
                  flex={1}
                  bg="primary"
                  color="white"
                  _hover={{ bg: "primary.900", boxShadow: "md" }}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {data && data.total && (
        <HStack spacing={2} justify="center" mt={8} wrap="wrap">
          {/* Previous button */}
          <Button
            size={{ base: "xs", sm: "sm", md: "md" }}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
            onClick={() =>
              setPage((prev) =>
                prev < Math.ceil(data.total / limit) ? prev + 1 : prev
              )
            }
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
