import { View } from "react-native";

const Header = ({ logo, leftIcon, rightIcon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* Left icon - absolutely positioned */}
      <View style={{ position: "absolute", left: 0 }}>{leftIcon}</View>

      {/* Logo - centered */}
      <View>{logo}</View>

      {/* Right icon - absolutely positioned */}
      <View style={{ position: "absolute", right: 0 }}>{rightIcon}</View>
    </View>
  );
};

export default Header;
