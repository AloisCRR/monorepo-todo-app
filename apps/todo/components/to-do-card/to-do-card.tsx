import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Text,
  Tooltip
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Checks, Pencil, TrashX } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[7]
  },
  expand: {
    flex: 1
  },
  section: {
    borderBottom: `1px solid ${theme.colors.dark[4]}`
  }
}));

interface ToDoCardProps {
  title: string;
  description: string;
  onClickDelete: () => void;
  onClickEdit: () => void;
}

export default function ToDoCard({
  title,
  description,
  onClickDelete,
  onClickEdit
}: ToDoCardProps) {
  const { classes, theme } = useStyles();

  const isDesktopView = useMediaQuery('(min-width: 900px)', false);

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.section} p="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
          <Badge size="sm" color="green">
            To Do
          </Badge>
        </Group>
        <Text mt="xs" size="sm">
          {description}
        </Text>
      </Card.Section>
      <Group pt="md">
        <Tooltip
          disabled={!isDesktopView}
          label="Mark as completed"
          withArrow
          className={classes.expand}
        >
          <Button variant="default" radius="md" fullWidth>
            <Checks color={theme.colors.green[5]} />
          </Button>
        </Tooltip>
        <Tooltip
          disabled={!isDesktopView}
          label="Edit"
          withArrow
          className={classes.expand}
        >
          <Button
            onClick={() => {
              onClickEdit();
            }}
            variant="default"
            radius="md"
            fullWidth
          >
            <Pencil color={theme.colors.yellow[5]} />
          </Button>
        </Tooltip>
        <Tooltip
          disabled={!isDesktopView}
          label="Delete"
          withArrow
          className={classes.expand}
        >
          <Button
            onClick={() => {
              onClickDelete();
            }}
            variant="default"
            radius="md"
            fullWidth
          >
            <TrashX color={theme.colors.red[5]} />
          </Button>
        </Tooltip>
      </Group>
    </Card>
  );
}
