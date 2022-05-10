import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Menu,
  Spoiler,
  Text,
  Tooltip
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ToDoState } from '@monorepo-todo-app/todo-api-interfaces';
import React from 'react';
import { Check, Checks, Clock, Dots, Pencil, TrashX } from 'tabler-icons-react';

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
  onChangeState: (status: ToDoState) => void;
  state: ToDoState;
  loading?: boolean;
}

export default function ToDoCard({
  title,
  description,
  onClickDelete,
  onClickEdit,
  state,
  onChangeState,
  loading = false
}: ToDoCardProps) {
  const { classes, theme, cx } = useStyles();

  const badgeColor = cx({
    green: state === ToDoState.Done,
    orange: state === ToDoState.InProgress,
    red: state === ToDoState.Todo
  });

  const isDesktopView = useMediaQuery('(min-width: 900px)', false);

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.section} p="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
          <Badge size="sm" color={badgeColor}>
            {state === ToDoState.Done && 'Done'}
            {state === ToDoState.InProgress && 'In progress'}
            {state === ToDoState.Todo && 'To Do'}
          </Badge>
        </Group>
        <Spoiler mt="xs" maxHeight={90} showLabel="Show more" hideLabel="Hide">
          <Text size="sm">{description}</Text>
        </Spoiler>
      </Card.Section>
      <Group pt="md">
        <Menu
          control={
            <Button variant="default" radius="md" fullWidth>
              <Dots />
            </Button>
          }
          className={classes.expand}
        >
          <Menu.Item
            disabled={loading || state === ToDoState.Done}
            onClick={() => {
              onChangeState(ToDoState.Done);
            }}
            icon={<Checks size={14} color={theme.colors.green[5]} />}
          >
            Mark as done
          </Menu.Item>
          <Menu.Item
            disabled={loading || state === ToDoState.InProgress}
            onClick={() => {
              onChangeState(ToDoState.InProgress);
            }}
            icon={<Check size={14} color={theme.colors.orange[5]} />}
          >
            Mark in progress
          </Menu.Item>
          <Menu.Item
            disabled={loading || state === ToDoState.Todo}
            onClick={() => {
              onChangeState(ToDoState.Todo);
            }}
            icon={<Clock size={14} color={theme.colors.red[5]} />}
          >
            Mark to do
          </Menu.Item>
        </Menu>
        <Tooltip
          disabled={!isDesktopView}
          label="Edit"
          withArrow
          className={classes.expand}
        >
          <Button
            disabled={loading}
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
            disabled={loading}
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
