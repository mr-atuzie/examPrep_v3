import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Svg from "react-native-svg";
import WelcomeIcon from "../assets/images/graduation.svg";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import ScreenWrapper from "../components/ScreenWrapper";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedView = Animated.View;

export default function WelcomeScreen() {
  const router = useRouter();
  const handleSignIn = () => router.push("/auth/login");
  const handleGetStarted = () => router.push("/auth/register");

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-between p-4">
        {/* Header with Logo and Sign In button */}
        <View className="flex-row justify-between items-center mb-4">
          <Logo />
          <TouchableOpacity
            onPress={handleSignIn}
            className="flex-row items-center bg-primary rounded-full px-4 py-2"
            accessibilityRole="button"
            accessible
          >
            <Text className="text-white text-body font-sans-medium mr-2">
              Sign In
            </Text>
            <FontAwesome name="arrow-right" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center">
          {/* Main Illustration */}
          <View className="items-center justify-center h-[370px] w-full mb-8">
            <AnimatedSvg entering={FadeIn.duration(1500)}>
              <WelcomeIcon width="100%" height="100%" />
            </AnimatedSvg>
          </View>

          {/* Footer Content */}
          <View>
            <AnimatedView
              entering={FadeInDown.duration(1500).springify().damping(12)}
              style={{ alignItems: "center" }}
            >
              <Text className="text-center text-display-lg font-poppins-extrabold">
                Always take control{"\n"}of your learning
              </Text>
            </AnimatedView>

            <AnimatedView
              entering={FadeInDown.duration(1500)
                .delay(200)
                .springify()
                .damping(12)}
              style={{ alignItems: "center", marginVertical: 8 }}
            >
              <Text className="text-gray-800 font-sans text-center text-body">
                Access 20,000+ past questions from JAMB, WASSCE, and Post-UTME
                across multiple subjects.
              </Text>
            </AnimatedView>

            <AnimatedView
              entering={FadeInDown.duration(1500)
                .delay(300)
                .springify()
                .damping(12)}
              style={{ marginTop: 16 }}
            >
              <CustomButton
                backgroundColor="#1E4B9B"
                onPress={handleGetStarted}
              >
                <Text className="text-white text-body font-sans-medium">
                  Get Started
                </Text>
              </CustomButton>
            </AnimatedView>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
