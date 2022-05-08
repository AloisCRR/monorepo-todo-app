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
import { useRegisterMutation } from '@monorepo-todo-app/todo-api-hooks';
import { GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BrandGithub, BrandGoogle } from 'tabler-icons-react';
import { object, string, type SchemaOf } from 'yup';

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
  const [type, toggle] = useToggle('login', ['login', 'register']);

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

  const { mutate: registerUser } = useRegisterMutation(
    new GraphQLClient('http://localhost:3333/graphql')
  );

  const { replace, query } = useRouter();

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
                  onSuccess: async ({ register: { jwt } }) => {
                    toast.success('Register completed!');
                    localStorage.setItem('jwt-monorepo-app', jwt);

                    await replace({ pathname: String(query['returnUrl']) });
                  }
                }
              );
            }
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
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
