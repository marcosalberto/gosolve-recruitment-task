import { useState } from 'react'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Field,
  NumberInput
} from '@chakra-ui/react'
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import './App.css'
import APIConfig from "./config/API"

function App() {
  const [value, setValue] = useState<string>()
  const [found, setFound] = useState<number | null>()

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFound(undefined)
    setValue(ev.target.value)
  }
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    fetch(`${APIConfig.API_ADDRESS}/search/${value}/`)
    .then(res => res.json())
    .then(res => {
      if (!res.success) return setFound(null);

      setFound(res.result)
    })
  }

  return (
    <>
       <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          padding={5}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Search for value <br />
              <Text as={'span'} color={'green.400'}>
                position
              </Text>
          </Heading>
          <Stack
            direction={'column'}
            padding={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
              <form onSubmit={onSubmit}>
                <Field.Root margin={5}>
                  <Field.Label>Enter Number</Field.Label>
                  <NumberInput.Root
                      maxW="200px"
                      value={value?.toString()}
                      onChange={handleInputChange}
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                  </NumberInput.Root>
                </Field.Root>
                <Button
                  type="submit"
                  colorScheme={'green'}
                  bg={'green.400'}
                  rounded={'full'}
                  px={6}
                  mt={5}
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  Search
                </Button>
              </form>
          </Stack>

          { found != null && (
            <Stack
              as={Box}
              textAlign={'center'}
            >
              <div style={
                  {
                  color: 'green', 
                  display: 'flex', 
                  justifyContent: 'center',
                  marginTop: 50
                  }
                }
              >
                <FaCheckCircle size={'50'} />
              </div>
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Number found on position 
                <Text as={'span'} color={'green.400'} ml={2} fontSize={30}>
                   { found }
                </Text>
                .
              </Heading>
            </Stack>
          )}

          { found === null && (
            <Stack
              as={Box}
              textAlign={'center'}
            >
              <div style={
                  {
                  color: 'red', 
                  display: 'flex', 
                  justifyContent: 'center',
                  marginTop: 50
                  }
                }
              >
                <FaCircleXmark size={'50'} />
              </div>
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Cannot found number position.
              </Heading>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default App
