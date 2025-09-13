import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import natureImage from "../assets/images/Secondary-school-student.jpg";

const { height, width } = Dimensions.get("window");

const ImageLoader = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={natureImage}
        resizeMode="cover"
        // style={{ width, height: height + 1 }} // Add 1 pixel to ensure full coverage
        style={{
          width: "100%",
          height: "100%", // Use percentage instead of Dimensions
        }}
        imageStyle={{ blurRadius: 5 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
          style={{ flex: 1 }}
        >
          {/* Remove SafeAreaView from the main container */}
          <View className="flex-1 justify-center items-center mx-5 pt-6">
            <View className="items-center">
              <View className="flex-row items-end justify-center mb-6">
                <Text className="font-poppins-extrabold text-[30px] tracking-wider text-white ">
                  EX
                </Text>
                <FontAwesome5 name="graduation-cap" size={48} color="#fff" />
                <Text className="font-poppins-extrabold text-[30px] tracking-wider text-white">
                  M PREP
                </Text>
              </View>
            </View>

            {/* Activity Indicator */}
            <ActivityIndicator className="mt-14" size="large" color="#ffffff" />
          </View>
          {/* Add SafeAreaView only for status bar spacing */}
          <SafeAreaView
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          />
          <StatusBar style="light" />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ImageLoader;
