import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import landingImage from  "@/assets/images/landing/landing.png"
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/navigation/types";

const Landing = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <VStack style={styles.container}>
      <Image source={landingImage} style={styles.image} alt="landing" />

      <VStack style={styles.textContainer}>
        <Heading 
          className="text-primary" 
          size="2xl"
        style={{ fontFamily: 'GeneralSans-Bold' }}
      >
        Rent Affordable Homes
      </Heading>
      <Text 
        className="text-gray text-center"
        style={{ fontFamily: 'GeneralSans-Medium' }}>
        Rent a furnished and unfurnished room or an a entire House an a affordable price
      </Text>
      <Button 
        size="md" 
        variant="solid" 
        action="default" 
        className="bg-primary w-full"
        onPress={() => navigation.navigate('Register' as never)}
      >
        <ButtonText 
          style={{ fontFamily: 'GeneralSans-Medium' }}
          className="capitalize"
        >
          GET STARTED
        </ButtonText>
      </Button>
      </VStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 24,
    gap: 64,
  },
  textContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    gap: 24,
    marginTop: 32,
  },
  image: {
    width: "100%",
    height: 350,
    marginTop: 48,
  },
});
export default Landing