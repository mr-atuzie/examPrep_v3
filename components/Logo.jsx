import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function Logo({
  onPress,
  size = 23,
  color = "#fff",
  backgroundColor = "bg-primary",
  className = "",
  accessibilityLabel = "Logo button",
  testID = "logo-button",
}) {
  return (
    <TouchableOpacity
      className={`${backgroundColor}  rounded flex justify-center items-center  p-1.5 self-start ${className}`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      activeOpacity={0.8}
    >
      <FontAwesome5 name="graduation-cap" size={size} color={color} />
    </TouchableOpacity>
  );
}
