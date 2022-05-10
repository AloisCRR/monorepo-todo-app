import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Text,
  Title
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'tabler-icons-react';
import phoneMockup from '../public/images/phone-mockup.png';

const gradientStyles = {
  backgroundSize: '100%',
  backgroundRepeat: 'repeat',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  '-moz-background-clip': 'text',
  '-moz-text-fill-color': 'transparent'
};

const useStyles = createStyles((theme) => ({
  inner: {
    paddingTop: theme.spacing.xl * 2,
    display: 'flex',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },
  nxGradientText: {
    backgroundColor: 'navy',
    backgroundImage: 'linear-gradient(0deg, #133157, #5b91b5)',
    ...gradientStyles
  },
  nextGradientText: {
    backgroundColor: 'grey',
    backgroundImage: 'linear-gradient(180deg, #97A4A9, #5F535E)',
    ...gradientStyles
  },
  nestGradientText: {
    backgroundColor: 'grey',
    backgroundImage: 'linear-gradient(0deg, #af1129, #f8704a)',
    ...gradientStyles
  },
  graphqlGradientText: {
    backgroundColor: 'grey',
    backgroundImage: 'linear-gradient(0deg, #e10098, #cd4b85)',
    ...gradientStyles
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing.xl * 3,
    [theme.fn.smallerThan('md')]: {
      marginRight: 0
    }
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily || ''}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,
    [theme.fn.smallerThan('xs')]: {
      fontSize: 28
    }
  },
  control: {
    alignSelf: 'flex-start'
  },
  image: {
    marginTop: '-3rem',
    [theme.fn.smallerThan('md')]: {
      marginTop: theme.spacing.xl,
      maxWidth: '25rem'
    }
  }
}));

export function Index() {
  const { classes } = useStyles();

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Monorepo To Do app built with{' '}
            <span className={classes.nxGradientText}>Nx</span>,{' '}
            <span className={classes.nextGradientText}>Next.js</span>,{' '}
            <span className={classes.nestGradientText}>NestJS</span> and{' '}
            <span className={classes.graphqlGradientText}>GraphQL</span>
          </Title>
          <Text color="dimmed" mt="md">
            Basic implementation to test integration between multiple frameworks
            and GraphQL using code generation and shared types.
          </Text>
          <Link href="/app" passHref>
            <Button
              mt={30}
              color="teal"
              radius="sm"
              size="md"
              rightIcon={<ArrowRight />}
              className={classes.control}
            >
              Go to app
            </Button>
          </Link>
        </div>
        <Center>
          <Box className={classes.image}>
            <Image src={phoneMockup} alt="App mockup in phone" />
          </Box>
        </Center>
      </div>
    </Container>
  );
}

export default Index;
