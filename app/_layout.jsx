import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import "../global.css";
import { store } from "../store/store";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

axios.defaults.baseURL = process.env.EXPO_PUBLIC_BACKEND_URI;
axios.defaults.withCredentials = true;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;

        if (user) {
          return router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuthStatus();
  }, [router]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/login"
            options={{
              title: "Login",
              animation: "slide_from_right",
              headerShown: false, // or customize header
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              title: "Register",
              animation: "slide_from_left",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="auth/verifyEmail"
            options={{
              title: "Verify Email",
              animation: "slide_from_left",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="auth/forgotPassword"
            options={{
              title: "Forgot Password",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="auth/resetPassword"
            options={{
              title: "Reset Password",
              animation: "slide_from_right",
              headerShown: false,
            }}
          />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="(modals)"
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "slide_from_bottom",
              gestureEnabled: true,
            }}
          />

          <Stack.Screen
            name="exam/study"
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="exam/timed"
            options={{
              headerShown: false,
              animation: "fade_from_bottom",
            }}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
