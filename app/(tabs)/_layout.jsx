import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;

        if (user) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Still loading — avoid rendering
  if (isLoading) return null;

  // Not authenticated — redirect to login screen
  if (!isAuth) return <Redirect href="/auth/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1E4B9B",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: ({ color }) => (
            <Text className="font-sans-medium text-[12px]" style={{ color }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          tabBarLabel: ({ color }) => (
            <Text className="font-sans-medium text-[12px]" style={{ color }}>
              Exams
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: ({ color }) => (
            <Text className="font-sans-medium text-[12px]" style={{ color }}>
              Search
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Octicons name="search" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ color }) => (
            <Text className="font-sans-medium text-[12px]" style={{ color }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
  },
});
