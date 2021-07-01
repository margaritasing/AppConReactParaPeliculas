import React, { useState, useRef } from "react";
import {
  ThemeProvider,
  theme,
  CSSReset,
  Flex,
  Stack,
  Box,
  Alert,
  AlertIcon,
  Heading,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Tag
} from "@chakra-ui/core";

import "./styles.css";

const data = [
  {
    type: "pelicula",
    year: 2002,
    gender: "terror",
    title: "Harry Potter y la cámara secreta",
    imageUrl:
      "https://assets.cinepolisklic.com/images/ae0dacc3e95640ec8a3974efba7fe57d_250X375.jpg"
  },
  {
    type: "serie",
    year: 2017,
    gender: "Ciencia ficción",
    title: "Dark",
    imageUrl:
      "https://www.latercera.com/resizer/e3LUdpyrzt3zjLj5gOKDLLIIviA=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/2GQ7GJM6RFHF3A4RLKZQSOX3DM.jpg"
  },
  {
    type: "pelicula",
    year: 2002,
    gender: "terror",
    title: "Harry Potter y la cámara secreta",
    imageUrl:
      "https://assets.cinepolisklic.com/images/ae0dacc3e95640ec8a3974efba7fe57d_250X375.jpg"
  },
  {
    type: "serie",
    year: 2017,
    gender: "Ciencia ficción",
    title: "Dark",
    imageUrl:
      "https://www.latercera.com/resizer/e3LUdpyrzt3zjLj5gOKDLLIIviA=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/2GQ7GJM6RFHF3A4RLKZQSOX3DM.jpg"
  },
  {
    type: "pelicula",
    year: 2002,
    gender: "terror",
    title: "Harry Potter y la cámara secreta",
    imageUrl:
      "https://assets.cinepolisklic.com/images/ae0dacc3e95640ec8a3974efba7fe57d_250X375.jpg"
  },
  {
    type: "serie",
    year: 2017,
    gender: "Ciencia ficción",
    title: "Dark",
    imageUrl:
      "https://www.latercera.com/resizer/e3LUdpyrzt3zjLj5gOKDLLIIviA=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/2GQ7GJM6RFHF3A4RLKZQSOX3DM.jpg"
  }
];

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const urlRef = useRef(null);
  const yearRef = useRef(null);
  const typeRef = useRef(null);

  const handleSearch = () => {
    let url = urlRef.current.value;
    let type = typeRef.current.value;
    let year = yearRef.current.value;

    if (type && year) {
      url += `?type=${type}&year=${year}`;
    } else if (type) {
      url += `?type=${type}`;
    } else if (year) {
      url += `?year=${year}`;
    }

    setLoading(true);
    setError(false);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Flex flexDir="column">
          <Heading as="h1" size="2xl" mb={5}>
            Buscador de Series y Películas
          </Heading>
          <Input
            maxW="sm"
            type="text"
            id="url"
            placeholder="URL API"
            ref={urlRef}
          />
          <Box>
            <Heading as="h2" mb={5} mt={8}>
              Filtros
            </Heading>
            <Stack spacing={5} direction="row" align="flex-end">
              <FormControl>
                <FormLabel htmlFor="country">Tipo</FormLabel>
                <Select
                  id="country"
                  placeholder="Seleccione tipo"
                  ref={typeRef}
                >
                  <option value="todos">Todos</option>
                  <option value="pelicula">Película</option>
                  <option value="serie">Serie</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Año de estreno</FormLabel>
                <Input
                  type="number"
                  id="email"
                  min="1900"
                  placeholder="Ingrese año"
                  ref={yearRef}
                />
              </FormControl>
              <Button
                variantColor="teal"
                size="md"
                onClick={handleSearch}
                isLoading={loading}
              >
                Buscar
              </Button>
            </Stack>
          </Box>
        </Flex>
        <Heading as="h2" mt={8} mb={5}>
          Resultados
        </Heading>
        <Flex wrap="wrap">
          {loading && <Text>Cargando</Text>}
          {error && (
            <Alert status="error">
              {" "}
              <AlertIcon />
              Hubo un error, inténtelo de nuevo
            </Alert>
          )}
          {data.map((resultado, index) => (
            <Box key={index} w="xs" mb={8} mr={4}>
              <Image
                size="sm"
                objectFit="cover"
                src={resultado.imageUrl}
                w="100%"
              />
              <Heading as="h3" size="md" mb={3} mt={5}>
                {resultado.title}
              </Heading>
              <Text>{resultado.year}</Text>
              <Tag variantColor="red" mt={3}>
                {resultado.gender}
              </Tag>
            </Box>
          ))}
        </Flex>
      </ThemeProvider>
    </>
  );
}
