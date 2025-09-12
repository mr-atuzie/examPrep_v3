import { Text, View } from "react-native";

const Header = ({ title, leftIcon, textStyle }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      {/* Left icon container */}
      <View style={{ flex: 1, alignItems: "flex-start" }}>{leftIcon}</View>

      {/* Center title */}
      <View style={{ flex: 2, alignItems: "center" }}>
        {title && (
          <Text className="text-center text-[22px] font-sans-bold tracking-wider">
            {title}
          </Text>
        )}
      </View>

      {/* Right spacer to balance the layout */}
      <View style={{ flex: 1 }} />
    </View>
  );
};

export default Header;
