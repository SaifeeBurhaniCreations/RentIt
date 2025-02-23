import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { StyleSheet } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Link, LinkText } from '@/components/ui/link';
import { HStack } from '@/components/ui/hstack';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Box } from '@/components/ui/box';
import { Input, InputField } from "@/components/ui/input"
import { useState, useRef } from 'react';
import { TextInput } from 'react-native';

const Otp = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [isError, setIsError] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const navigation = useNavigation();

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <VStack style={styles.container}>
            <VStack space="xl">
                <HStack className="items-center justify-between w-full">
                    <Pressable
                        onPress={() => navigation.goBack()}>
                        <Box style={{ transform: [{ scale: 1.2 }] }}>
                            <Icon size="xl" as={ArrowLeftIcon} />
                        </Box>
                    </Pressable>
                    <VStack style={{ flex: 1, alignItems: 'center' }}>
                        <Heading size="xl">Rent IT</Heading>
                    </VStack>
                </HStack>
                <Heading size="2xl" className='text-center'>OTP Verification</Heading>

                <VStack space="sm">
                    <Heading size="lg">We will send your One Time Password on this mobile number +91 6356056865</Heading>

                    <Link>
                        <LinkText className='text-primary no-underline'>Change Number?</LinkText>
                    </Link>
                </VStack>
                <VStack space='sm'>
                <HStack className='items-center justify-between w-full gap-4'>
                    {otp.map((value, index) => (
                        <Input key={index} style={{ flex: 1 }} className={`border border-dark-500`} isInvalid={isError}>
                            <InputField
                                type="text"
                                className={`text-center ${isError ? 'text-error-500' : 'text-dark-500'}`}
                                maxLength={1}
                                value={value}
                                onChangeText={(text) => handleChange(text, index)}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                            />
                        </Input>
                    ))}

                </HStack>
                {isError && <Text size="lg" className='text-error-500'>Wrong OTP enter</Text>}
                </VStack>

                <Heading size="lg">
                    Your code will expire in <Text className='text-primary' size="lg">1:32</Text>
                </Heading>
                <Link>
                    <LinkText className='text-primary no-underline'>Resend OTP</LinkText>
                </Link>
            </VStack>

            <Button
                size="md"
                variant="solid"
                action="default"
                className={`${otp.some(value => value === '') ? 'bg-primary-disabled' : 'bg-primary'} w-full`}
                disabled={otp.some(value => value === '')}
            >
                <ButtonText
                    style={{ fontFamily: 'GeneralSans-Medium' }}
                    className="capitalize"
                >
                    Verify
                </ButtonText>
            </Button>
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

export default Otp;
