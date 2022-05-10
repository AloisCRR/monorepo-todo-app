/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Modal,
  SegmentedControl,
  SimpleGrid,
  Text,
  Textarea,
  TextInput
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import {
  useCreateNewTodoMutation,
  useDeleteToDoMutation,
  useGetAllToDoQuery,
  useUpdateToDoMutation,
  useUpdateToDoStateMutation
} from '@monorepo-todo-app/todo-api-hooks';
import {
  GetAllToDoQuery,
  ToDoState
} from '@monorepo-todo-app/todo-api-interfaces';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AlertCircle, Check, Checks, Clock, Plus } from 'tabler-icons-react';
import { object, SchemaOf, string } from 'yup';
import ToDoCard from '../components/to-do-card/to-do-card';
import graphQlClient from '../utils/graphql-client';

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
    height: '100%',
    padding: theme.spacing.xl
  }
}));

type ToDoForm = {
  title: string;
  description: string;
};

const formValidation: SchemaOf<ToDoForm> = object({
  description: string()
    .max(255, 'Maximum amount of characters is 255')
    .required(),
  title: string().max(255, 'Maximum amount of characters is 255').required()
});

export function Index() {
  const [editOrCreateModalOpen, setEditOrCreateModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [modalTitle, toggleModalTitle] = useToggle('New todo', [
    'New todo',
    'Edit'
  ]);

  const todoId = useRef('');

  const todoState = useRef<ToDoState>(ToDoState.Todo);

  const [todoFilter, setTodoFilter] = useState(ToDoState.Todo);

  const [token, setToken] = useState('');

  const { classes, theme } = useStyles();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ToDoForm>({
    resolver: yupResolver(formValidation)
  });

  useEffect(() => {
    setToken(localStorage.getItem('jwt-monorepo-app') || '');
  }, []);

  const { data: query } = useGetAllToDoQuery(
    graphQlClient,
    {
      data: { jwt: token }
    },
    {
      enabled: !!token,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  );

  const { mutate: createNewTodo, isLoading: loadingNewTodo } =
    useCreateNewTodoMutation(graphQlClient);

  const { mutate: deleteTodo, isLoading: loadingTodoDelete } =
    useDeleteToDoMutation(graphQlClient);

  const { mutate: updateTodo, isLoading: loadingTodoUpdate } =
    useUpdateToDoMutation(graphQlClient);

  const { mutate: updateTodoState, isLoading: loadingTodoStateUpdate } =
    useUpdateToDoStateMutation(graphQlClient);

  const queryClient = useQueryClient();

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
        <form
          onSubmit={handleSubmit((data) => {
            if (modalTitle === 'New todo') {
              createNewTodo(
                {
                  data: {
                    ...data,
                    state: todoFilter
                  },
                  user: { jwt: localStorage.getItem('jwt-monorepo-app') || '' }
                },
                {
                  onSuccess: ({ addNewToDo }) => {
                    if (addNewToDo) {
                      queryClient.setQueryData<GetAllToDoQuery>(
                        [
                          'GetAllToDo',
                          {
                            data: { jwt: token }
                          }
                        ],
                        {
                          getAllTodosFromUser: [
                            ...(query?.getAllTodosFromUser || []),
                            addNewToDo
                          ]
                        }
                      );

                      setEditOrCreateModalOpen(false);

                      toast.success('To Do successfully created!');
                    }
                  },
                  onError: () => {
                    toast.error('There was an error trying to create a To Do!');
                  }
                }
              );

              return;
            }

            updateTodo(
              {
                data: {
                  ...data,
                  id: todoId.current
                },
                user: { jwt: localStorage.getItem('jwt-monorepo-app') || '' }
              },
              {
                onSuccess: ({ updateToDo: { error } }) => {
                  if (!error) {
                    queryClient.setQueryData<GetAllToDoQuery>(
                      [
                        'GetAllToDo',
                        {
                          data: { jwt: token }
                        }
                      ],
                      {
                        getAllTodosFromUser:
                          query?.getAllTodosFromUser.map((todo) => {
                            if (todo.id === todoId.current) {
                              return {
                                ...data,
                                id: todoId.current,
                                state: todoState.current
                              };
                            }

                            return todo;
                          }) || []
                      }
                    );

                    setEditOrCreateModalOpen(false);

                    toast.success('To Do successfully updated!');
                  }
                },
                onError: () => {
                  toast.error('There was an error trying to update a To Do');
                }
              }
            );
          })}
        >
          <TextInput
            placeholder="Title"
            label="Title"
            required
            error={errors.title?.message}
            {...register('title')}
          />
          <Textarea
            mt="xs"
            placeholder="Long description..."
            label="Description"
            required
            error={errors.description?.message}
            {...register('description')}
          />
          <Group mt="xl" position="right">
            <Button
              onClick={() => {
                setEditOrCreateModalOpen(false);
                reset();
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button loading={loadingNewTodo || loadingTodoUpdate} type="submit">
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
              setDeleteModalOpen(false);
              reset();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={!todoId.current}
            loading={loadingTodoDelete}
            onClick={() => {
              deleteTodo(
                { data: { id: todoId.current }, user: { jwt: token } },
                {
                  onSuccess: ({ deleteToDo: { error } }) => {
                    if (!error) {
                      queryClient.setQueryData<GetAllToDoQuery>(
                        [
                          'GetAllToDo',
                          {
                            data: { jwt: token }
                          }
                        ],
                        {
                          getAllTodosFromUser:
                            query?.getAllTodosFromUser.filter(
                              ({ id }) => id !== todoId.current
                            ) || []
                        }
                      );

                      setDeleteModalOpen(false);

                      toast.success('To Do successfully deleted!');
                    }
                  },
                  onError: () => {
                    toast.error('There was an error trying to delete a To Do');
                  }
                }
              );
            }}
            color="red"
            rightIcon={<AlertCircle />}
          >
            Delete
          </Button>
        </Group>
      </Modal>
      <Center mb="lg">
        <SegmentedControl
          onChange={(value: ToDoState) => {
            setTodoFilter(value);
          }}
          transitionDuration={500}
          transitionTimingFunction="ease-in-out"
          data={[
            {
              label: (
                <Center>
                  <Clock size={16} color={theme.colors.red[5]} />
                  <Box ml={10}>To Do</Box>
                </Center>
              ),
              value: ToDoState.Todo
            },
            {
              label: (
                <Center>
                  <Check size={16} color={theme.colors.orange[5]} />
                  <Box ml={10}>In progress</Box>
                </Center>
              ),
              value: ToDoState.InProgress
            },
            {
              label: (
                <Center>
                  <Checks size={16} color={theme.colors.green[5]} />
                  <Box ml={10}>Done</Box>
                </Center>
              ),
              value: ToDoState.Done
            }
          ]}
        />
      </Center>
      <Container size="xl">
        <SimpleGrid
          breakpoints={[
            { minWidth: 1024, cols: 4, spacing: 'sm' },
            { minWidth: 768, cols: 3, spacing: 'sm' },
            { minWidth: 500, cols: 2, spacing: 'sm' },
            { maxWidth: 300, cols: 1, spacing: 'sm' }
          ]}
        >
          <Box
            onClick={() => {
              toggleModalTitle('New todo');

              reset();

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
          {query?.getAllTodosFromUser
            .filter(({ state }) => state === todoFilter)
            .map(({ description, id, title, state }) => (
              <ToDoCard
                key={id}
                loading={
                  loadingTodoDelete ||
                  loadingTodoUpdate ||
                  loadingTodoStateUpdate
                }
                onClickDelete={() => {
                  todoId.current = id;

                  todoState.current = state;

                  setDeleteModalOpen(true);
                }}
                onClickEdit={() => {
                  toggleModalTitle('Edit');

                  todoId.current = id;

                  todoState.current = state;

                  setValue('title', title);

                  setValue('description', description);

                  setEditOrCreateModalOpen(true);
                }}
                onChangeState={(status) => {
                  updateTodoState(
                    {
                      data: { state: status, id },
                      user: { jwt: token }
                    },
                    {
                      onSuccess: ({ updateToDoState: { error } }) => {
                        if (!error) {
                          queryClient.setQueryData<GetAllToDoQuery>(
                            [
                              'GetAllToDo',
                              {
                                data: { jwt: token }
                              }
                            ],
                            {
                              getAllTodosFromUser:
                                query?.getAllTodosFromUser.map((todo) => {
                                  if (todo.id === id) {
                                    return {
                                      ...todo,
                                      state: status
                                    };
                                  }

                                  return todo;
                                }) || []
                            }
                          );

                          setEditOrCreateModalOpen(false);

                          toast.success('To Do successfully updated!');
                        }
                      },
                      onError: () => {
                        toast.error(
                          'There was an error trying to update a To Do'
                        );
                      }
                    }
                  );
                }}
                description={description}
                title={title}
                state={state}
              />
            ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Index;
