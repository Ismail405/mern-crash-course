import { Container, Flex, Text, HStack, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4} >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          cursor="pointer"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <HStack spacing={3} align="center">
          <Link to="/create">
            <Button colorScheme="blue" variant="solid" size="sm">
              <AddIcon fontSize="16px" />
            </Button>
          </Link>

          {/* Dark Mode Toggle Button */}
          <Button onClick={toggleColorMode} variant="solid" size="sm">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}
