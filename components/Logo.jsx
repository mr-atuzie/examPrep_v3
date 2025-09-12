import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function Logo() {
  return (
    <View className="flex-row items-end">
      <Text
        style={{ fontSize: 18 }}
        className="tracking-widest text-primary font-poppins-extrabold"
      >
        EX
      </Text>
      <FontAwesome5 name="graduation-cap" size={22} color="#1E4B9B" />
      <Text
        style={{ fontSize: 18 }}
        className="tracking-widest text-primary font-poppins-extrabold"
      >
        M{"  "} PREP
      </Text>
    </View>
  );
}
