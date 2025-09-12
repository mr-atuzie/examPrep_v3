import { Feather, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ScreenWrapper from "../../components/ScreenWrapper";

const ExamInfo = () => {
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [examInstructions, setExamInstructions] = useState([]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Replace with your actual API call
        const { data } = await axios.get(`/mock-exam/${id}`);

        setExamInstructions(data.mockExam.instructions || []);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        Alert.alert("Error", "Failed to load exam data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      <View className="bg-white flex-1 roundedt px-4 rounded-t-[40px] py-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header leftIcon={<BackButton />} />
            <View className="items-center mb-6">
              <View className="bg-blue-50 p-4 rounded-full">
                <FontAwesome5 name="info-circle" size={40} color="#1E4B9B" />
              </View>
            </View>
            <Text className="text-center text-display-md font-poppins-bold text-primary mb-6">
              Exam Instructions
            </Text>
            {/* Instructions List */}
            <View className="mb-8 space-y-4">
              {examInstructions && examInstructions.length > 0 ? (
                examInstructions.map((text, index) => (
                  <View key={index} className="flex-row items-start gap-1 mb-4">
                    <Feather name="check" size={20} color="#1E4B9B" />
                    <Text className="text-gray-700 text-body flex-1">
                      {text}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-gray-500 text-center">
                  No instructions available for this exam.
                </Text>
              )}
            </View>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ExamInfo;
