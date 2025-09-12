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
        style={{ width, height }} // Makes image background full screen
        imageStyle={{ blurRadius: 5 }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
          style={{ flex: 1 }}
        >
          <SafeAreaView className="flex-1 justify-center items-center mx-5">
            {/* <View className="items-center">
              <View className="flex-row items-end mb-6">
                <Text className="font-poppins-extrabold text-[35px] tracking-wider text-white">
                  EX
                </Text>
                <FontAwesome5 name="graduation-cap" size={50} color="#fff" />
                <Text className="font-poppins-extrabold text-[35px] tracking-wider text-white">
                  M PREP
                </Text>
              </View>
            </View> */}

            <View className="items-center">
              <View className="flex-row  items-end justify-center mb-6">
                <Text className="font-poppins-extrabold text-[30px] tracking-wider text-white ">
                  EX
                </Text>
                <FontAwesome5
                  name="graduation-cap"
                  size={48}
                  color="#fff"
                  // className="mx-2"
                />
                <Text className="font-poppins-extrabold text-[30px] tracking-wider text-white">
                  M PREP
                </Text>
              </View>
            </View>

            {/* Activity Indicator */}
            <ActivityIndicator className="mt-14" size="large" color="#ffffff" />
            <StatusBar style="light" />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ImageLoader;
