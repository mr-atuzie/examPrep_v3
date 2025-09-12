import { ActivityIndicator, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  children,
  containerStyles,
  onPress,
  loading,
  backgroundColor,
}) => {
  if (loading) {
    return (
      <View
        style={{ backgroundColor }}
        className={` bg-transparent rounded-[10px] min-h-[52px] justify-center items-center ${containerStyles}`}
      >
        <ActivityIndicator size={"small"} color={"#fff"} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ backgroundColor }}
      className={`rounded-[10px] min-h-[52px] tracking-wider justify-center items-center ${containerStyles}`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
