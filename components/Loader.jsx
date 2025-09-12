import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Loader = () => {
  // Animation values
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);
  const logoScale = useSharedValue(1);

  // Spinner dimensions
  const size = 80;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Infinite rotation
    rotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1
    );

    // Progress animation (for spinner stroke)
    progress.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
      -1
    );

    // Logo pulsing animation
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, [logoScale, progress, rotation]);

  const animatedSpinner = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const animatedStroke = useAnimatedStyle(() => ({
    strokeDashoffset: interpolate(progress.value, [0, 1], [circumference, 0]),
  }));

  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.spinnerWrapper}>
        {/* Background Track */}
        <Svg width={size} height={size} style={styles.svg}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E3F2FD"
            strokeWidth={strokeWidth}
            strokeOpacity={0.5}
            fill="transparent"
          />
        </Svg>

        {/* Animated Spinner */}
        <Animated.View style={[styles.svg, animatedSpinner]}>
          <Svg width={size} height={size}>
            <AnimatedCircle
              cx={center}
              cy={center}
              r={radius}
              stroke="#1E88E5"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeLinecap="round"
              fill="transparent"
              style={animatedStroke}
            />
          </Svg>
        </Animated.View>

        {/* Logo */}
        <Animated.View style={[styles.logoWrapper, animatedLogo]}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="graduation-cap" size={28} color="#0D47A1" />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  spinnerWrapper: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  svg: {
    position: "absolute",
  },
  logoWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#BBDEFB",
  },
});

export default Loader;
