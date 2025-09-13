import { Text, View } from "react-native";

const Header = ({ logo, title, leftIcon, rightIcon, textStyle }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left icon container */}
      <View style={{ flex: 1, alignItems: "flex-start" }}>{leftIcon}</View>

      {/* Center content - either logo or title */}
      <View style={{ alignItems: "center" }}>
        {logo || (title && <Text style={textStyle}>{title}</Text>)}
      </View>

      {/* Right icon or spacer */}
      <View style={{ flex: 1, alignItems: "flex-end" }}>{rightIcon}</View>
    </View>
  );
};

export default Header;
