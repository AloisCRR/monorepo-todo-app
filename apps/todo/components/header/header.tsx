import {
  ActionIcon,
  Container,
  createStyles,
  Header,
  Title
} from '@mantine/core';
import React from 'react';
import { BrandGithub } from 'tabler-icons-react';

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default function ToDoAppHeader() {
  const { classes } = useStyles();

  return (
    <Header p="md" height="fit-content">
      <Container className={classes.container}>
        <Title align="center" order={3}>
          ToDo App
        </Title>
        <ActionIcon>
          <BrandGithub size={18} />
        </ActionIcon>
      </Container>
    </Header>
  );
}
