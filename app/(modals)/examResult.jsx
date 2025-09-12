import { Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import { getImageForExam } from "../../services/ImageServices";

const ExamResult = () => {
  const router = useRouter();

  const {
    subjectName,
    examTitle,
    score,
    totalQuestions,
    unanswered,
    timeSpent,
    points,
    mode,
  } = useLocalSearchParams();

  const wrong = totalQuestions - score;

  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return { bg: "#E8F5E9", text: "#2E7D32" };
    if (percentage >= 60) return { bg: "#FFF3E0", text: "#EF6C00" };
    return { bg: "#FFEBEE", text: "#C62828" };
  };

  const scoreColor = getScoreColor();

  const handleLeave = () => {
    router.replace("/(tabs)/home");
  };

  const confirmExit = () => {
    Alert.alert(
      "Exit Exam?",
      "Your progress has been saved. You can review your results later.",
      [
        {
          text: "Continue Review",
          style: "cancel",
        },
        {
          text: "Exit Exam",
          style: "destructive",
          onPress: handleLeave,
        },
      ],
      { cancelable: true }
    );
  };

  const InfoBox = ({ title, value, icon, color }) => (
    <View
      style={{
        width: "30%",
        marginBottom: 16,
        padding: 5,
        borderRadius: 12,
        backgroundColor: `${color}10`,
        alignItems: "center",
        justifyContent: "center",
        height: 80,
      }}
    >
      <Text
        style={{ color }}
        className={
          "text-center tracking-wider mb-1 font-sans-medium text-[11px]"
        }
      >
        {title}
      </Text>
      <Text
        style={{ color }}
        className=" text-[20px] text-center font-poppins-semibold"
      >
        {value}
      </Text>
    </View>
  );

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      <Header
        leftIcon={
          <BackButton iconColor="white" backgroundColor="transparent" />
        }
      />
      <View className="items-center mb-6">
        {/* Exam Logo or Placeholder */}
        {getImageForExam(examTitle) ? (
          <Image
            source={getImageForExam(examTitle)}
            style={{ width: 64, height: 64, resizeMode: "contain" }}
            className="mb-1"
          />
        ) : (
          <View className="bg-indigo-50 h-14 w-14 rounded-full items-center justify-center mb-4 shadow-sm">
            <FontAwesome5 name="graduation-cap" size={25} color="#4f46e5" />
          </View>
        )}

        {/* Exam Title */}
        <Text className="text-center text-[17px] font-poppins-semibold text-white">
          {examTitle}
        </Text>

        <Text className="text-center mb-2 text-[15px] font-sans-medium text-gray-200">
          {subjectName}
        </Text>

        {/* Summary Description */}
        <View className="  px-6">
          <Text className="text-center text-[12px] font-sans text-gray-300 ">
            You answered {totalQuestions} questions and scored {score} mark
            {score !== 1 ? "s" : ""}. Keep practicing to improve and achieve
            mastery.
          </Text>
        </View>
      </View>

      <View className="bg-white rounded-t-[30px]  py-10">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 500 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Score Section */}
          <View className="items-center mb-6 flex-col">
            <Text
              style={{ color: scoreColor.text }}
              className="tracking-wider -mb-4 text-[14px] font-sans-medium"
            >
              You Scored
            </Text>
            <Text
              style={{ color: scoreColor.text }}
              className="text-center text-[90px] -mb-4 font-poppins-semibold"
            >
              {percentage}%
            </Text>
            <Text
              style={{ color: scoreColor.text, marginTop: -15 }}
              className="tracking-wider  text-[14x] font-sans-medium"
            >
              {percentage >= 80
                ? "Excellent work, Keep it up"
                : percentage >= 60
                ? "Good Job, you can be better"
                : "Below average, keep practicing"}
            </Text>
          </View>

          {/* Info Boxes */}
          <View className="flex-row my-4  gap-3 flex-wrap">
            <InfoBox
              title="Total Questions"
              value={totalQuestions}
              icon="list"
              color="#1E4B9B"
            />

            {mode === "timed" && (
              <InfoBox
                title="Time Spent"
                value={timeSpent}
                icon="clock"
                color="#FF9800"
              />
            )}

            <InfoBox
              title="Points Earned"
              value={points}
              icon="star"
              color="#9C27B0"
            />
            <InfoBox
              title="Correct Answer"
              value={score}
              icon="check-circle"
              color="#2E7D32"
            />
            <InfoBox
              title="Wrong Answer"
              value={wrong}
              icon="x-circle"
              color="#F44336"
            />
            <InfoBox
              title="Unanswered"
              value={unanswered}
              icon="help-circle"
              color="#9E9E9E"
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between gap-4">
            <TouchableOpacity
              className="flex-1 bg-blue-50 py-4 rounded-lg items-center flex-row justify-center"
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Feather name="book-open" size={18} color="#1E4B9B" />
              <Text className="text-[#1E4B9B] ml-2 font-sans-medium text-[14px]">
                Review Answers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-blue-900 py-4 rounded-lg items-center flex-row justify-center"
              onPress={confirmExit}
              activeOpacity={0.8}
            >
              <Octicons name="home" size={18} color="#fff" />

              <Text className="ml-2 text-white text-[14px] font-sans-medium">
                Return Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ExamResult;
