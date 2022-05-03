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
import React from 'react';
import { BrandGithub, BrandGoogle } from 'tabler-icons-react';

export default function AuthenticationForm() {
  const [type, toggle] = useToggle('login', ['login', 'register']);

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
        <form>
          <Group direction="column" grow>
            <TextInput
              required
              type="email"
              label="Email"
              placeholder="example@example.dev"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
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
