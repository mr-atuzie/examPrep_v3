import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <View className=" flex flex-1 justify-center items-center bg-gray-200">
      <Text className="text-green-800  font-bold text-3xl">Hello world</Text>

      <Text className="text-gray-800 text-center">
        keep working, God sees you, i sincerely believe in him
      </Text>
    </View>
  );
}
