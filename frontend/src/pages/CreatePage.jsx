import { Container, VStack, Text, Box, useColorModeValue, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from '@chakra-ui/react'

function CreatePage() {

  // Toast
  const toast = useToast()

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "", // Fix: Add "image" here for the product image
  });

  const {createProduct} = useProductStore()
  const handleAddProduct = async()=>{
    const {success,message} = await createProduct(newProduct)
   if(!success){
    toast({
      title:"Error",
      description:message,
      status:'error',
      isClosable:true
    })
   }else{
    toast({
      title:"Success",
      description:message,
      status:'success',
      isClosable:true
    })
   }
    setNewProduct({
      name: "",
      price: "",
      image: "", 
    })
  }

  return (
    <Container maxW={"container.sm"}>
      
      <VStack spacing={8}>
         <Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            bgClip="text"
            cursor="pointer"
            
          >
             Create Products 
         </Text>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" 
            onClick={handleAddProduct}
            w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
