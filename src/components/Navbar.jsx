// components/Navbar.tsx
"use client"; // if using Next.js 13+ app dir
import React from "react";
import {
  Box,
  HStack,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { Sun, Moon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
