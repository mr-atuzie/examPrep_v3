import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import { getImageForExam } from "../../services/ImageServices";

import axios from "axios";
import SubjectsSkeletonLoader from "../../components/SubjectsSkeletonLoader";

const ExamSubjects = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [exam, setExam] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const { examId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await axios.get(`/exams/${examId}/subjects`);

        setLoading(false);
        setExam(data.exam);
        setSubjects(data.subjects);
      } catch (error) {
        setLoading(false);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString() ||
          "Something went wrong";

        console.log(message);
        Alert.alert("Error", message);
      }
    };
    fetchExam();
  }, [examId]);

  const fetchSearchedExams = async (query) => {
    try {
      const { data } = await axios.get(`/exams/subjects/search`, {
        params: {
          examId,
          keyword: query,
        },
      });

      setSubjects(data.data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Error searching exams";

      console.log(error);

      Alert.alert("Search Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExam = async () => {
    try {
      const { data } = await axios.get(`/exams/${examId}/subjects`);

      setLoading(false);
      setExam(data.exam);
      setSubjects(data.subjects);
    } catch (error) {
      setLoading(false);

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Something went wrong";

      console.log(message);
      Alert.alert("Error", message);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      fetchExam();
    } else {
      fetchSearchedExams(query);
    }
  };

  const createMockExam = async (subject) => {
    try {
      const { data } = await axios.post("/mock-exam", {
        examId,
        subjectId: subject._id,
      });

      router.push({
        pathname: "/(modals)/setExamMode",
        params: { subject: subject.name, id: data.data._id },
      });
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
      <Header
        leftIcon={
          <BackButton iconColor="white" backgroundColor="transparent" />
        }
      />

      {/* Hero Section */}
      <View className="items-center">
        {getImageForExam(exam?.title) ? (
          <Image
            source={getImageForExam(exam?.title)}
            style={{ width: 64, height: 64, resizeMode: "contain" }}
            className="mb-2"
            accessibilityLabel={`${exam?.title} logo`}
            accessible
          />
        ) : (
          <View className="bg-indigo-50 h-28 w-28 rounded-full items-center justify-center shadow-sm">
            <FontAwesome5 name="graduation-cap" size={48} color="#4f46e5" />
          </View>
        )}
      </View>

      {/* Exam Info */}
      <View className="px-4 mb-6">
        <Text className=" text-center text-gray-100 leading-6 font-sans">
          {exam?.description}
        </Text>
      </View>

      <View className="px-4 bg-gray-100 flex-1 rounded-t-3xl pt-6">
        {loading ? (
          <SubjectsSkeletonLoader />
        ) : (
          <>
            {/* Search Bar */}
            <View className="flex-row items-center bg-white rounded-2xl mb-6 px-4 py-2 shadow-sm">
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                placeholder="Search Math, English, JAMB, WAEC, Post UTME..."
                className="flex-1 ml-2 text-gray-700"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={handleSearch}
                returnKeyType="search"
                onSubmitEditing={() => fetchExam()}
              />
            </View>

            <ScrollView
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            >
              <Text className=" mb-4 font-sans-bold text-[20px] tracking-wide">
                Subjects Available
              </Text>

              {subjects?.map((subject, index) => {
                // const { icon, color } = getSubjectIconAndColor(
                //   subject.name,
                //   exam?.title
                // );

                return (
                  <Animated.View
                    key={subject?._id}
                    entering={FadeInDown.delay(index * 70)
                      .springify()
                      .damping(14)}
                  >
                    <TouchableOpacity
                      className="flex-row items-center bg-white p-4 rounded-xl mb-4 shadow-sm"
                      onPress={() => createMockExam(subject)}
                    >
                      {/* <View
                        className="p-3 rounded-full mr-4"
                        style={{
                          backgroundColor: `${color}20`,
                        }}
                      >
                        <FontAwesome5 name={icon} size={20} color={color} />
                      </View> */}
                      <View
                        className="p-3 bg rounded-[10px] mr-4"
                        style={{
                          backgroundColor: "#1E4B9B20",
                        }}
                      >
                        <Feather name="book-open" size={24} color="#1E4B9B" />
                      </View>

                      <View className="flex-1">
                        <Text className=" font-sans-medium text-[15px]">
                          {subject.name}
                        </Text>
                        <Text className=" text-indigo-600 tracking-wide font-sans text-[13px]">
                          {subject?.questionCount?.toLocaleString()} Questions
                        </Text>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ExamSubjects;
