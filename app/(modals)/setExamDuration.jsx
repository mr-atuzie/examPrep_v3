import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DurationImage from "../../assets/images/duration.svg";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";

const durations = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1 hour 30 minutes" },
];

const convertMinutesToSeconds = (minutes) => {
  return parseInt(minutes, 10) * 60; // Minutes → Seconds
};

export default function SetExamDuration() {
  const [selectedDuration, setSelectedDuration] = useState("");
  const { subject, id } = useLocalSearchParams();
  const router = useRouter();

  const setMockExamDuration = async () => {
    if (!selectedDuration) return;

    try {
      const timeLimit = convertMinutesToSeconds(selectedDuration);

      //   const { data } = await axios.patch(`/mock-exam/${id}/time-limit`, {
      //     timeLimit,
      //   });
      await axios.patch(`/mock-exam/${id}/time-limit`, {
        timeLimit,
      });

      router.push({
        pathname: "/exam/timed",
        params: {
          subject,
          id,
          duration: timeLimit.toString(),
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString() ||
        "Failed to Set Exam Duration";

      Alert.alert("Failed to Set Exam Duration", message);
    }
  };

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      <ScrollView
        className="flex-1 bg-white rounded-t-3xl  px-4  py-10"
        showsVerticalScrollIndicator={false}
      >
        <Header leftIcon={<BackButton />} />
        {/* Progress Indicator */}
        {/* <View className="items-center mt-4 mb-6">
            <Text className=" font-sans text-[14px]  text-gray-400">
              Step 2 of 2
            </Text>
          </View> */}

        {/* Illustration */}
        <View className="items-center justify-center mb-6">
          <DurationImage width={280} height={180} />
        </View>

        {/* Heading */}
        <Text className=" text-center text-gray-900 mb-2 font-poppins-extrabold text-[24px]">
          Set your <Text className=" text-primary">{subject} </Text>exam
          duration
        </Text>

        <Text className="text-center font-sans text-[14px] text-gray-600 mb-8 leading-6 px-2">
          How long do you want this exam to last?
        </Text>

        {/* Duration Selection Cards */}
        <View className="gap-4 mb-8">
          {durations.map((duration) => (
            <TouchableOpacity
              key={duration.value}
              className={`px-5 py-2 rounded-2xl flex-row items-center justify-between border-2 ${
                selectedDuration === duration.value
                  ? "border-[#1E4B9B] bg-[#F0F7FF]"
                  : "border-gray-200 bg-white"
              }`}
              onPress={() => setSelectedDuration(duration.value)}
              activeOpacity={0.8}
              accessibilityLabel={`Select ${duration.label}`}
            >
              <View className="flex-row items-center">
                <View
                  className={`w-10 h-10 rounded-full mr-4 items-center justify-center ${
                    selectedDuration === duration.value
                      ? "bg-[#1E4B9B]"
                      : "bg-[#E6F0FF]"
                  }`}
                >
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={
                      selectedDuration === duration.value ? "white" : "#1E4B9B"
                    }
                  />
                </View>
                <View>
                  <Text
                    className={`font-sans-medium text-[15px]
                      ${
                        selectedDuration === duration.value
                          ? "text-[#1E4B9B]"
                          : "text-gray-800"
                      }`}
                  >
                    {duration.label}
                  </Text>
                </View>
              </View>
              {selectedDuration === duration.value && (
                <Ionicons name="checkmark-circle" size={24} color="#1E4B9B" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className={`w-full py-4 rounded-2xl mb-8 flex-row items-center justify-center ${
            selectedDuration ? "bg-[#1E4B9B]" : "bg-gray-300"
          }`}
          onPress={setMockExamDuration}
          disabled={!selectedDuration}
          activeOpacity={0.8}
          accessibilityLabel="Continue to exam"
        >
          <Text className="text-white font-sans-medium text-body">
            Start Exam
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}
