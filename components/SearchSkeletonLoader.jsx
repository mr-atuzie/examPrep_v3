import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const SkeletonLoader = ({ width, height, style, borderRadius = 0 }) => {
  const actualWidth =
    typeof width === "string" && width.includes("%")
      ? (parseFloat(width) / 100) * screenWidth
      : width;

  const translateX = useSharedValue(-actualWidth);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(actualWidth, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1
    );
  }, [actualWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: "#e3e3e3",
          overflow: "hidden",
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.5)", "transparent"]}
          style={{
            width: "60%",
            height: "100%",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

const SearchSkeletonLoader = () => {
  return (
    <View style={{ backgroundColor: "transparent", paddingBottom: 80 }}>
      <View style={{ marginTop: 20, marginBottom: 30 }}>
        <SkeletonLoader width={180} height={20} borderRadius={8} />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <SkeletonLoader
            key={item}
            width={"48%"}
            height={55}
            borderRadius={8}
            style={{
              marginBottom: 15,
              marginRight: index % 2 === 0 ? "4%" : 0, // simulate gap
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default SearchSkeletonLoader;
