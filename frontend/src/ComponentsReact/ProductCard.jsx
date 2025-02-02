import { Box,Heading,HStack,Image,IconButton ,Text, useColorModeValue,Modal,useToast,useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input,ModalFooter,Button } from "@chakra-ui/react";

import { DeleteIcon,EditIcon } from '@chakra-ui/icons'
import { useProductStore } from "../store/product";
import { useState } from "react";


function ProductCard({product}) {
  const toast = useToast()
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue("gray.600","gray.200")
  const bg = useColorModeValue("white","gray.800")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {deleteProduct,updateProduct} = useProductStore()
  const handleDeleteProduct = async(pid)=>{
    const {message,success} = await deleteProduct(pid)
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? 'success' : 'error',
      isClosable: true,
    });
  }

  const handleUpdateProduct = async (pid,updatedProduct)=>{
    const {message,success} = await updateProduct(pid,updatedProduct)
    onClose()
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? 'success' : 'error',
      isClosable: true,
    });
  }

  return (
   <Box 
   shadow='lg'
   rounded='lg'
   overflow='hidden'
   transition='all 0.5s'
   _hover={{transform:'translateY(-5px)',shadow:'xl'}}
   bg={bg}
   >
    <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
    <Box p={4}>
      <Heading as='h3' size='md' mb={2}>
        {product.name}
      </Heading>
      <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
      $ {product.price}
      </Text>
      <HStack spacing={2}>
        <IconButton  icon={<EditIcon />} 
        onClick={onOpen}
        colorScheme='blue' />
        <IconButton 
        onClick={()=>handleDeleteProduct(product._id)}
        icon={<DeleteIcon />} colorScheme='red' />
      </HStack>
    </Box>
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Update Product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              onChange={(e)=>setUpdatedProduct({...updatedProduct,name:e.target.value})}
            />
            <Input
              placeholder="Product Price"
              name="price"
              value={updatedProduct.price}
              onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}
            />
            <Input
              placeholder="Product Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}
            />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} 
            onClick={()=>handleUpdateProduct(product._id, updatedProduct)}
            >
              Update Product
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
   </Box>
  )
}

export default ProductCard
