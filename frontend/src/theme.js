import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light", // Default color mode ('light' or 'dark')
  useSystemColorMode: false, // Change to true to use the system's color preference
};

const theme = extendTheme({ config });

export default theme;
