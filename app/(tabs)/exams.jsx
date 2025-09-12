import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import UserAvatar from "../../components/UserAvatar";

import axios from "axios";
import ExamsSkeletonLoader from "../../components/ExamsSkeletonLoader";

const Exams = () => {
  const router = useRouter();
  const [groupedExams, setGroupedExams] = useState({
    basic: [],
    js: [],
    ss: [],
    professional: [],
    foreign: [],
  });
  const [loading, setLoading] = useState(true);

  const getImageForExam = (title, logo) => {
    const lower = title.toLowerCase().replace(/[.\s]/g, "");

    if (lower.includes("jamb")) return require("../../assets/images/jamb.png");
    if (lower.includes("waec")) return require("../../assets/images/waec.webp");
    if (lower.includes("ncee") || lower.includes("bece"))
      return require("../../assets/images/neco.png");
    if (lower.includes("nda")) return require("../../assets/images/NDA.png");
    if (lower.includes("sat")) return require("../../assets/images/sat.png");
    if (lower.includes("toefl"))
      return require("../../assets/images/toefl.png");
    if (lower.includes("act")) return require("../../assets/images/act.png");

    return null;
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await axios.get("/exams/by-grade");
        if (data.success) {
          setLoading(false);
          setGroupedExams(data.data);
        }
      } catch (err) {
        setLoading(false);
        console.error("Failed to fetch exams", err);
      }
    };

    fetchExams();
  }, []);

  const gradeDisplayNames = {
    basic: "Basic Education",
    js: "Junior Secondary",
    ss: "Senior Secondary",
    professional: "Professional",
    foreign: "Foreign",
  };

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      {/* Header */}
      <View className="px-4 py-2 flex-row items-center">
        <UserAvatar />

        <View className="flex-1">
          <Text className="text-white text-center text-[22px] font-bold tracking-wider">
            All Examinations
          </Text>
        </View>

        <View className="w-10" />
      </View>

      {/* Content */}
      <View className="flex-1 bg-gray-100 rounded-t-[30px] p-5">
        {loading ? (
          <ExamsSkeletonLoader />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            hitSlop={true}
          >
            {/* Render exams by grade */}
            {Object.keys(groupedExams).map(
              (grade) =>
                groupedExams[grade]?.length > 0 && (
                  <View key={grade} className="mt-5 ">
                    {/* Section Header */}

                    <Text className="text-gray-800 tracking-wider text-[17px] font-sans-bold mb-3">
                      {gradeDisplayNames[grade] || grade}
                    </Text>

                    <View className="flex-row flex-wrap justify-between">
                      {groupedExams[grade].map((exam, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            router.push({
                              pathname: "/(modals)/examDetails",
                              params: { examId: exam._id },
                            })
                          }
                          className=" w-[48%] bg-white p-2.5 mb-4  rounded-xl shadow-sm shadow-gray-200 active:bg-gray-50"
                          activeOpacity={0.9}
                        >
                          {/* Card Header */}
                          <View className="flex-row gap-2 items-center mb-2">
                            {getImageForExam(exam.title) ? (
                              <Image
                                source={getImageForExam(exam.title)}
                                className="w-8 h-8"
                                resizeMode="contain"
                              />
                            ) : (
                              <View className="bg-indigo-100 h-10 w-10 rounded-full items-center justify-center">
                                <FontAwesome5
                                  name="graduation-cap"
                                  size={18}
                                  color="#4f46e5"
                                />
                              </View>
                            )}

                            <Text
                              className="text-[15px] font-medium flex-1"
                              numberOfLines={1}
                            >
                              {exam.title}
                            </Text>
                          </View>

                          {/* Card Body */}
                          <Text
                            className="text-gray-800 mb-3 text-[12px]"
                            numberOfLines={3}
                          >
                            {exam.description}
                          </Text>

                          {/* Card Footer */}
                          <Text className="text-indigo-600 font-sans-medium text-[11px] tracking-wider">
                            {exam.questionCount?.toLocaleString() || "0"}{" "}
                            Questions
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )
            )}
          </ScrollView>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Exams;
