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

const SkeletonBox = ({ height, width, radius = 8, className = "" }) => {
  const shimmerWidth = 180;
  const translateX = useSharedValue(-shimmerWidth);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width + shimmerWidth, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false
    );
  }, [width, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className={`overflow-hidden bg-gray-200 ${className}`}
      style={{ height, width, borderRadius: radius }}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            height: "100%",
            width: shimmerWidth,
            position: "absolute",
          },
        ]}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.9)",
            "rgba(255,255,255,0)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const ProfileSkeletonLoader = () => {
  return (
    <>
      {/* Logo or Icon */}
      <View className="items-center p-4 mb-6">
        <SkeletonBox height={140} width={140} radius={70} />
        {/* Exam Title */}
        <SkeletonBox height={28} width="70%" className="mt-6 mb-2" />
        {/* Description */}

        {/* Question Count */}
        <SkeletonBox height={28} width={200} className=" mb-6" radius={14} />
        {/* Subscription Info */}
        <View className="bg-indigo-50 w-full flex-col justify-center items-center rounded-2xl p-5 mb-8">
          <SkeletonBox height={22} width="60%" className="mb-2" />
          <SkeletonBox height={16} width="90%" className="mb-1" />
        </View>
        {/* Action Button */}
        <SkeletonBox height={50} width="100%" className="mb-4" radius={12} />
        <SkeletonBox height={50} width="100%" className="mb-4" radius={12} />
        <SkeletonBox height={50} width="100%" className="mb-4" radius={12} />
        <SkeletonBox height={50} width="100%" className="mb-4" radius={12} />
      </View>
    </>
  );
};

export default ProfileSkeletonLoader;
