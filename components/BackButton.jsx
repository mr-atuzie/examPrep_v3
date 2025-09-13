import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const BackButton = ({
  btnStyle,
  iconSize = 20,
  iconColor = "black",
  backgroundColor = "#f3f4f6", // default gray-100
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="rounded-xl p-2 items-center justify-center"
      style={{
        backgroundColor,
        alignSelf: "flex-start",
        ...btnStyle,
      }}
      onPress={() => router.back()}
    >
      <Ionicons name="chevron-back-outline" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default BackButton;
