import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Link, LinkText } from '@/components/ui/link';
import { HStack } from '@/components/ui/hstack';
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select"
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
} from "@/components/ui/checkbox"
import { CheckIcon, EyeOffIcon, EyeIcon } from "@/components/ui/icon"
import { ChevronDownIcon } from "@/components/ui/icon"
import { CircleIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { ScrollView } from 'react-native';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@/schema/authenticationSchema';
import type { RegisterTypes } from '@/types/types';
import dialCodes from '@/json/dial_code.json';
import { Box } from '@/components/ui/box';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '@/services/user.service';

import colors from "tailwindcss/colors"
const Register = () => {
  const [userType, setUserType] = useState('tenant');
  const [dialCode, setDialCode] = useState('');
  const [visibleDialCodes, setVisibleDialCodes] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const [termsConditions, setTermsConditions] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const navigation = useNavigation();

  const onSubmit = async (data: any) => {
    data.userType = userType;
    data.dial_code = dialCode;

    console.log('Form Data:', data);

    const response = await registerUser(data);
    console.log(response);
    setIsLoading(false);
  };

  const loadMoreItems = () => {
    setVisibleDialCodes((prev) => Math.min(prev + 10, dialCodes.length));
  };

  return (
    <VStack style={styles.container}>
      <VStack space="sm">
        <HStack className="items-center justify-between w-full">
          <VStack style={{ flex: 1, alignItems: 'center' }}>
            <Heading size="xl">Rent IT</Heading>
          </VStack>
          <Heading>Skip</Heading>
        </HStack>
        <VStack space="xl">
          <Heading size="xl">Register</Heading>
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
                    placeholder="Username"
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
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg" isInvalid={!!errors.email}>
                  <InputField
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
            {errors.email && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>{errors.email.message}</Text>
            )}
          </VStack>

          <VStack>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg" isInvalid={!!errors.password}>
                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                  />
                  <InputSlot style={{
                    paddingRight: 10
                  }} onPress={() => setShowPassword((showState) => {
                    return !showState
                  })}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            {errors.password && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>{errors.password.message}</Text>
            )}
          </VStack>

          <VStack>
            <Controller
              control={control}
              name="conf_password"
              render={({ field: { onChange, value } }) => (
                <Input variant="outline" size="lg" isInvalid={!!errors.conf_password}>
                  <InputField
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
            {errors.conf_password && (
              <Text style={[styles.errorText, { marginTop: 2 }]}>{errors.conf_password.message}</Text>
            )}
          </VStack>

          <HStack className='gap-4 items-center'>
            <Select style={{ flex: 0.3 }} onValueChange={(value) => setDialCode(value)}>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput placeholder="Select option" />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <ScrollView
                    style={{ maxHeight: 200 }}
                    className='w-full'
                    onScroll={({ nativeEvent }) => {
                      const isBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
                      if (isBottom) {
                        loadMoreItems();
                      }
                    }}
                    scrollEventThrottle={400}
                  >
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {dialCodes.slice(0, visibleDialCodes).map((code) => (
                      <SelectItem key={code.name + code.dial_code} label={`${code.name} (${code.dial_code})`} value={code.dial_code} />
                    ))}
                  </ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
            <VStack style={{ flex: 0.7 }}>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <Input variant="outline" size="lg" isInvalid={!!errors.phone}>
                    <InputField
                      placeholder="Phone"
                      value={value}
                      onChangeText={onChange}
                    />
                  </Input>
                )}
              />
              {errors.phone && (
                <Text style={[styles.errorText, { marginTop: 2 }]}>{errors.phone.message}</Text>
              )}
            </VStack>
          </HStack>

          <CheckboxGroup
            value={termsConditions}
            onChange={(keys) => {
              setTermsConditions(keys)
            }}
          >
            <VStack space="2xl">
              <Box>
                <Checkbox value="newsletter" className='flex items-end'>
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel style={{ marginLeft: 10, maxWidth: '95%' }}>
                    I agree to be contacted by Rent It and other for similar properties or related services via WhatsApp, Phone, SMS, E-mail, etc.
                  </CheckboxLabel>
                </Checkbox>
              </Box>
              <Box>
                <Checkbox value="terms_conditions" className='flex items-end'>
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>
                    I agree all
                  </CheckboxLabel>
                  <Link href="/Login">
                    <LinkText className="text-primary">term & Condition</LinkText>
                  </Link>
                </Checkbox>

              </Box>
            </VStack>
          </CheckboxGroup>
        </VStack>
      </VStack>
      <VStack style={styles.linkContainer}>

        {

          isLoading ?
            (
              <Button
                size="md"
                variant="solid"
                action="default"
                className={`${control._formValues.username && control._formValues.email && control._formValues.password && control._formValues.conf_password && control._formValues.phone ? 'bg-primary' : 'bg-primary-disabled'} w-full`}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonSpinner color={colors.white} />

                <ButtonText
                  style={{
                    fontFamily: 'GeneralSans-Medium',
                  }}
                  className="capitalize"
                >
                  Registering...
                </ButtonText>
              </Button>
            ) :
            (
              <Button
                size="md"
                variant="solid"
                action="default"
                className={`${control._formValues.username && control._formValues.email && control._formValues.password && control._formValues.conf_password && control._formValues.phone ? 'bg-primary' : 'bg-primary-disabled'} w-full`}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonText
                  style={{ fontFamily: 'GeneralSans-Medium' }}
                  className="capitalize"
                >
                  Register
                </ButtonText>
              </Button>
            )
        }


        <HStack className="items-center gap-2">
          <Text style={{ fontFamily: 'GeneralSans-Medium' }}>Existing User?</Text>
          <Link onPress={() => navigation.navigate('Login' as never)}>
            <LinkText className="text-primary">Login</LinkText>
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
    marginTop: 4
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Register;
