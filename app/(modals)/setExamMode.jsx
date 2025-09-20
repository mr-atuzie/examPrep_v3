import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ExamModeImage from "../../assets/images/mode2.svg";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";

const SetExamMode = () => {
  const { subject, id } = useLocalSearchParams();
  const router = useRouter();

  const setMockExamMode = async (mode) => {
    try {
      const { data } = await axios.patch(`/mock-exam/${id}/mode`, {
        mode: mode,
      });

      if (mode === "timed") {
        router.push({
          pathname: "/(modals)/setExamDuration",
          params: { subject, id: data.data._id },
        });
      } else {
        router.push({
          pathname: "/exam/study",
          params: { subject, id: data.data._id },
        });
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Error in starting exam";

      Alert.alert("Failed to start exam", message);
    }
  };

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      <View className="flex-1 bg-white rounded-t-3xl py-10 px-5">
        <Header leftIcon={<BackButton />} />

        {/* Progress Indicator (Visual Bar) */}
        <View className="items-center mt-12 mb-4">
          <Text className=" text-gray-400 text-[14px] font-sans">
            Step 1 of 2
          </Text>
        </View>

        {/* Illustration */}
        <View className="items-center justify-center mb-6">
          <ExamModeImage width={280} height={180} />
        </View>

        {/* Heading */}
        <Text className=" text-center text-gray-900  text-[22px]  font-poppins-extrabold">
          How do you want to practice for your{" "}
          <Text className=" text-[#1E4B9B]  ">{subject}</Text> exam?
        </Text>

        <Text className="text-center text-gray-600 mb-8 leading-6 px-2 font-sans text-[14px]">
          Select between time exam mode or study mode.
        </Text>

        {/* Options */}
        <View className=" flex-col gap-4">
          {/* Timed Mode (Primary Action) */}
          <TouchableOpacity
            onPress={() => setMockExamMode("timed")}
            className="bg-[#1E4B9B] p-5 rounded-2xl flex-row items-center justify-between shadow-lg active:scale-95"
            activeOpacity={0.85}
            accessibilityLabel="Timed Exam Mode"
          >
            <View className="flex-row items-center">
              <View className="bg-white p-3 mr-2 rounded-full">
                <Ionicons name="alarm" size={24} color="#1E4B9B" />
              </View>
              <View>
                <Text className=" font-sans-medium  text-[15px] text-white ">
                  Timed Exam Mode
                </Text>
                <Text className=" text-white opacity-90 font-sans text-[12px]">
                  Simulate real test conditions with a timer.
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          {/* Study Mode (Secondary Action) */}
          <TouchableOpacity
            onPress={() => setMockExamMode("study")}
            className="bg-white border border-gray-200 p-5 rounded-2xl flex-row items-center justify-between shadow-sm active:scale-95"
            activeOpacity={0.85}
            accessibilityLabel="Study Mode"
          >
            <View className="flex-row items-center">
              <View className="bg-[#E6F0FF] p-3 mr-2 rounded-full">
                <FontAwesome5 name="book-reader" size={20} color="#1E4B9B" />
              </View>
              <View>
                <Text className=" text-[#1E4B9B] text-[15px] font-sans-medium text-body">
                  Study Mode
                </Text>
                <Text className=" text-gray-700 text-[12px] font-sans">
                  Learn at your own pace with no time limits.
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#1E4B9B" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SetExamMode;
