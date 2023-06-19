import {
  Box,
  Button,
  Collapse,
  Container,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpellDetails } from '../../context/SpellContext';
import SpellDetail from './SpellDetail';
import { Spells } from '../../services/Spells';
import Loading from '../PageLayout/Loading';

export default function SpellCardBody({ spell, spellDetails }) {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const { spellDetailsList, setSpellDetailsList } = useSpellDetails();
  const [isLoading, setIsLoading] = useState(false);

  const randomImage = Math.floor(Math.random() * 10 + 1);

  const classes = spell.classes?.toString().replace(/,/g, ', ');

  const findSpellDetails = (spellName) =>
    spellDetailsList.find((spell) => spell.name === spellName);

  const handleClick = () => {
    if (spell.id && !isOpen) {
      setIsLoading(true);
      const detailsExist = spellDetailsList.some((spellDetail) => spellDetail.name === spell.name);

      if (detailsExist) {
        setIsLoading(false);
        onToggle();
      } else {
        const fetchSpellDetails = async () => {
          const newSpellDetails = await Spells.getDetails(spell.id);
          setSpellDetailsList([...spellDetailsList, newSpellDetails]);
          setIsLoading(false);
          onToggle();
        };

        fetchSpellDetails();
      }
    } else {
      onToggle();
    }
  };

  return (
    <>
      <VStack maxWidth={'90vw'}>
        <Button
          onClick={location.pathname === '/prepared-spells' ? onToggle : handleClick}
          display={'block'}
          width={{ base: '90vw', md: '60vw', lg: '50vw' }}
          height={{ base: '60px', md: '75px', lg: '90px' }}
          marginTop={'5'}
          marginBottom={'1'}
          style={{ backgroundImage: `url(${randomImage}.png)` }}
          sx={{
            boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
          _hover={{
            transform: 'translateY(-3px)',
            boxShadow: '4xl',
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Heading fontFamily={'Kalam-Regular'} fontSize={{ base: 'xl', lg: '3xl' }}>
                {spell.name}
              </Heading>
              <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'sm', lg: 'lg' }}>
                {spell.school}
              </Text>

              {location.pathname === '/all-spells' ? (
                <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'sm', lg: 'lg' }}>
                  {classes}
                </Text>
              ) : null}
            </>
          )}
        </Button>
      </VStack>

      <Container maxWidth={{ base: '90vw', md: '60vw', lg: '50vw' }} centerContent>
        <Collapse in={isOpen} animateOpacity>
          <Box
            padding="5px"
            rounded="md"
            shadow="md"
            sx={{
              backgroundImage:
                'radial-gradient(circle at 75% 15%, white 1px, pink 6%, lightblue 60%, yellow 100%)',
              boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            }}
          >
            {!isLoading ? (
              <SpellDetail
                spellDetails={
                  location.pathname === '/prepared-spells'
                    ? spellDetails
                    : findSpellDetails(spell.name)
                }
              />
            ) : (
              <Loading />
            )}
          </Box>
        </Collapse>
      </Container>
    </>
  );
}
