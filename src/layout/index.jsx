import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Layout = () => {
  return (
    <VStack>
      <Navbar />
      <Outlet />
    </VStack>
  );
};

export default Layout;
