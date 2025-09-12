import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const SkeletonLoader = ({ width, height, style, borderRadius = 0 }) => {
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1
    );
  }, [width, translateX]);

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
          position: "relative", // Ensure proper positioning
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
            width: "50%", // Make the gradient wider than the container
            height: "100%",
          },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.7)", "transparent"]}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

const SubjectsSkeletonLoader = () => {
  return (
    <View className="flex-col gap-4">
      {[...Array(6)].map((_, index) => (
        <SkeletonLoader
          key={index}
          height={60}
          width={"100%"}
          borderRadius={8}
          style={{ opacity: 0.9 - index * 0.1 }}
        />
      ))}
    </View>
  );
};

export default SubjectsSkeletonLoader;
