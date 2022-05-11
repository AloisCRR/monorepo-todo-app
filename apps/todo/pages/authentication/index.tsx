/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput
} from '@mantine/core';
import { upperFirst, useToggle } from '@mantine/hooks';
import {
  useLoginMutation,
  useRegisterMutation
} from '@monorepo-todo-app/todo-api-hooks';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BrandGithub, BrandGoogle } from 'tabler-icons-react';
import { object, string, type SchemaOf } from 'yup';
import graphQlClient from '../../utils/graphql-client';

type LoginRegisterForm = {
  email: string;
  password: string;
};

const formValidation: SchemaOf<LoginRegisterForm> = object({
  email: string().email().required(),
  password: string()
    .when('$formType', {
      is: 'register',
      then: (schema) => schema.min(8, 'Must have at least 8 characters')
    })
    .required()
});

export default function AuthenticationForm() {
  const [type, toggle] = useToggle<'login' | 'register'>('login', [
    'login',
    'register'
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginRegisterForm>({
    resolver: yupResolver(formValidation),
    context: {
      formType: type
    }
  });

  const { mutate: registerUser, isLoading: loadingRegister } =
    useRegisterMutation(graphQlClient);

  const { mutate: loginUser, isLoading: loadingLogin } =
    useLoginMutation(graphQlClient);

  const router = useRouter();

  const redirect = useCallback(async () => {
    await router.replace({
      pathname: router.query['returnUrl']
        ? String(router.query['returnUrl'])
        : '/app'
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        {type === 'login' ? (
          <Text size="lg" weight="bold">
            Login
          </Text>
        ) : (
          <Text mb="sm" size="lg" weight="bold">
            New account
          </Text>
        )}
        {type === 'login' && (
          <>
            <Group grow mb="md" mt="md">
              <Button variant="outline" leftIcon={<BrandGoogle />}>
                Google
              </Button>
              <Button variant="outline" leftIcon={<BrandGithub />}>
                GitHub
              </Button>
            </Group>
            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />
          </>
        )}
        <form
          onSubmit={handleSubmit((data) => {
            if (type === 'register') {
              registerUser(
                { data },
                {
                  onSuccess: async ({ register: { jwt, message } }) => {
                    if (!jwt) {
                      toast.error(
                        message || 'Error when registering, try again'
                      );

                      return;
                    }

                    toast.success('Register completed!');

                    localStorage.setItem('jwt-monorepo-app', jwt);

                    await redirect();
                  }
                }
              );

              return;
            }

            loginUser(
              { data },
              {
                onSuccess: async ({ login: { jwt, message } }) => {
                  if (!jwt) {
                    toast.error(message || 'Error when registering, try again');

                    return;
                  }

                  toast.success('Login completed!');
                  localStorage.setItem('jwt-monorepo-app', jwt);

                  await redirect();
                }
              }
            );
          })}
        >
          <Group direction="column" grow>
            <TextInput
              required
              type="email"
              label="Email"
              placeholder="example@example.dev"
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              error={errors.password?.message}
              {...register('password')}
            />
          </Group>
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              color="teal"
              loading={loadingLogin || loadingRegister}
              type="submit"
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
