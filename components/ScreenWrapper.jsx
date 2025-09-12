import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({
  children,
  backgroundColor = "white",
  statusBarStyle = "dark-content",
  // statusBarTranslucent = false,
}) => {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor,
        // Android-specific padding fix when translucent status bar
        // paddingTop:
        //   Platform.OS === "android" && statusBarTranslucent
        //     ? StatusBar.currentHeight
        //     : 0,
      }}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        // translucent={statusBarTranslucent}
      />
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
