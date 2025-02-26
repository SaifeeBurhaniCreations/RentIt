import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from "@/screens/Landing";
import LoginScreen from "@/screens/Login";
import RegisterScreen from "@/screens/Register";
import OtpScreen from "@/screens/Otp";
import AgreementSummaryScreen from "@/screens/AgreementSummary";
import HomeScreen from "@/screens/Home";
import InboxScreen from "@/screens/Inbox";

import { useFonts } from 'expo-font';
import BottomBar from "@/shared/BottomBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
export default function RootLayout() {
  const queryClient = new QueryClient();
  
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
      <QueryClientProvider client={queryClient}>
      <Stack.Navigator initialRouteName="Register">
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgreementSummary" component={AgreementSummaryScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
      
      </Stack.Navigator>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
