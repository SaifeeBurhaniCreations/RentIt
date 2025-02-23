import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from "@/screens/Landing";
import LoginScreen from "@/screens/Login";
import RegisterScreen from "@/screens/Register";
import OtpScreen from "@/screens/Otp";
import AgreementSummaryScreen from "@/screens/AgreementSummary";
import HomeScreen from "@/screens/Home";
import InboxScreen from "@/screens/Inbox";

import { useFonts } from 'expo-font';
import BottomBar from "@/shared/BottomBar";

const Stack = createStackNavigator();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'GeneralSans-Regular': require('@/assets/fonts/OTF/GeneralSans-Regular.otf'),
    'GeneralSans-Medium': require('@/assets/fonts/OTF/GeneralSans-Medium.otf'),
    'GeneralSans-Bold': require('@/assets/fonts/OTF/GeneralSans-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GluestackUIProvider mode="light">
      <Stack.Navigator initialRouteName="Inbox">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgreementSummary" component={AgreementSummaryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <BottomBar />
    </GluestackUIProvider>
  );
}
