import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Modal,
  SimpleGrid,
  Text,
  Textarea,
  TextInput
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { useState } from 'react';
import { AlertCircle, Plus } from 'tabler-icons-react';
import ToDoCard from '../components/to-do-card/to-do-card';

const useStyles = createStyles((theme) => ({
  new: {
    backgroundColor: theme.colors.dark[5],
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    transition: 'background-color 250ms ease-out 100ms',
    '&:hover': {
      backgroundColor: theme.colors.dark[4],
      cursor: 'pointer'
    }
  },
  innerNew: {
    border: `3px dashed ${theme.colors.dark[3]}`,
    borderRadius: theme.radius.lg,
    height: '100%'
  }
}));

export function Index() {
  const [editOrCreateModalOpen, setEditOrCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [todoData, setTodoData] = useSetState({ title: '', description: '' });

  const { classes } = useStyles();

  return (
    <>
      <Modal
        centered
        opened={editOrCreateModalOpen}
        onClose={() => {
          setEditOrCreateModalOpen(false);
        }}
        title={modalTitle}
      >
        <form>
          <TextInput
            defaultValue={todoData.title}
            placeholder="Title"
            label="Title"
            required
          />
          <Textarea
            mt="xs"
            defaultValue={todoData.description}
            placeholder="Long description..."
            label="Description"
            required
          />
          <Group mt="xl" position="right">
            <Button
              onClick={() => {
                setEditOrCreateModalOpen(false);
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEditOrCreateModalOpen(false);
              }}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
      <Modal
        centered
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        title="Delete"
      >
        <Text>
          Are you sure you want to delete this To Do?{' '}
          <strong>You wont be able to recover it.</strong>
        </Text>
        <Group mt="xl" position="right">
          <Button
            onClick={() => {
              setEditOrCreateModalOpen(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setEditOrCreateModalOpen(false);
            }}
            color="red"
            rightIcon={<AlertCircle />}
          >
            Delete
          </Button>
        </Group>
      </Modal>
      <Container size="xl">
        <SimpleGrid
          breakpoints={[
            { minWidth: 768, cols: 4, spacing: 'sm' },
            { minWidth: 500, cols: 2, spacing: 'sm' },
            { maxWidth: 300, cols: 1, spacing: 'sm' }
          ]}
        >
          <Box
            onClick={() => {
              setModalTitle('New todo');
              setTodoData({ description: '', title: '' });
              setEditOrCreateModalOpen(true);
            }}
            className={classes.new}
          >
            <Box className={classes.innerNew}>
              <Center style={{ height: '100%' }}>
                <Group direction="column" spacing={0} align="center">
                  <Plus size={40} />
                  <Text mt="xs" size="xl" weight="bold">
                    Add new To Do
                  </Text>
                </Group>
              </Center>
            </Box>
          </Box>
          <ToDoCard
            onClickDelete={() => {
              setDeleteModalOpen(true);
            }}
            onClickEdit={() => {
              setModalTitle('Edit');
              setEditOrCreateModalOpen(true);
              setTodoData({
                description:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, sint!',
                title: 'Hola'
              });
            }}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, sint!"
            title="Hola"
          />
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Index;
