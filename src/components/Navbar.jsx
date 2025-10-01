// components/Navbar.jsx
"use client";
import React from "react";
import {
  Box,
  HStack,
  Link,
  IconButton,
  useColorMode,
  Spacer,
  Badge,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  // Get cart items from store
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box
      bg={"bg"}
      px={8}
      py={4}
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
      w={"full"}
    >
      <HStack spacing={8} alignItems="center">
        {/* Logo */}
        <Box fontWeight="bold" fontSize="xl" color={"primary"}>
          MyLogo
        </Box>


        {/* Links */}
        <HStack spacing={4}>
          <Link
            as={RouterLink}
            to={"/products"}
            color={"text"}
            _hover={{ textDecoration: "underline" }}
          >
            Products

          </Link>
          <Link
            as={RouterLink}
            to={"/contact"}
            color={"text"}
            _hover={{ textDecoration: "underline" }}
          >
            Contact
          </Link>
        </HStack>

        <Spacer />

        {/* Cart Icon with Badge */}
        <Box position="relative">
          <IconButton
            aria-label="Cart"
            icon={<ShoppingCart size={20} />}
            variant="ghost"
            as={RouterLink}
            to="/cart" // navigate to cart page
          />
          {totalItems > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              bg="red.500"
              color="white"
              rounded="full"
              fontSize="0.7rem"
              px={2}
            >
              {totalItems}
            </Badge>
          )}
        </Box>

        {/* Dark/Light mode toggle */}
        <IconButton
          aria-label="Toggle theme"
          icon={colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </HStack>
    </Box>
  );
};

export default Navbar;
