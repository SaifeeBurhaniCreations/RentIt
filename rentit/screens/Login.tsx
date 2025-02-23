import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Link, LinkText } from '@/components/ui/link';
import { HStack } from '@/components/ui/hstack';
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio';
import { CircleIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '@/schema/authenticationSchema';
import type { LoginTypes } from '@/types/types';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [userType, setUserType] = useState('tenant');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const navigation = useNavigation();

  const onSubmit = (data: LoginTypes) => {
    data.userType = userType;
    // console.log('Form Data:', data);
  };

  return (
    <VStack style={styles.container}>
      <VStack space="4xl">
        <HStack className="items-center justify-between w-full">
          <VStack style={{ flex: 1, alignItems: 'center' }}>
            <Heading size="xl">Rent IT</Heading>
          </VStack>
          <Heading>Skip</Heading>
        </HStack>
        <VStack space="2xl">
          <Heading size="xl">Login</Heading>
          <RadioGroup value={userType} onChange={setUserType}>
            <HStack className="justify-between">
              <Radio value="tenant" size="md">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Tenant</RadioLabel>
              </Radio>
              <Radio value="landlord" size="md">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Landlord</RadioLabel>
              </Radio>
              <Radio value="agent" size="md">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Agent</RadioLabel>
              </Radio>
            </HStack>
          </RadioGroup>
          <VStack>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg" isInvalid={!!errors.username}>
                  <InputField
                    placeholder="Phone Number, Email, Username"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
            {errors.username && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>{errors.username.message}</Text>
            )}
          </VStack>
          <VStack>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg" isInvalid={!!errors.password}>
                  <InputField
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                </Input>
              )}
            />
            {errors.password && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>{errors.password.message}</Text>
            )}
          </VStack>

        </VStack>
      </VStack>

      <VStack style={styles.linkContainer}>
        <Button
          size="md"
          variant="solid"
          action="default"
          className={`${control._formValues.username && control._formValues.password ? 'bg-primary' : 'bg-primary-disabled'} w-full`}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText
            style={{ fontFamily: 'GeneralSans-Medium' }}
            className="capitalize"
          >
            Login
          </ButtonText>
        </Button>
        <HStack className="items-center gap-2">
          <Text style={{ fontFamily: 'GeneralSans-Medium' }}>New to Rent it?</Text>
          <Link onPress={() => navigation.navigate('Register' as never)}>
            <LinkText className="text-primary">Register</LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 24,
  },
  linkContainer: {
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Login;
