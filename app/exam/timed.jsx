import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageLoader from "../../components/ImageLoader";
import QuestionCard from "../../components/QuestionCard";
import ScreenWrapper from "../../components/ScreenWrapper";
import { getImageForExam } from "../../services/ImageServices";

export default function TimedScreen() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [mockExam, setMockExam] = useState(null);
  const [timerActive, setTimerActive] = useState(true);

  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const { data } = await axios.get(`/mock-exam/${params.id}`);

        setExamData(data);
        setQuestions(data.questions);
        setMockExam(data.mockExam);
        setTimeLeft(data.mockExam.timeLimit);

        if (data.mockExam.completed) {
          setTimerActive(false);
          setScore(data.mockExam.score);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        Alert.alert("Error", "Failed to load exam data");
        setLoading(false);
      }
    };

    fetchExamData();
  }, [params.id]);

  const handleLeave = () => {
    router.dismissTo("/(tabs)/home");
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     const handleLeave = () => {
  //       router.dismissTo("/(tabs)/home");
  //     };

  //     const backAction = () => {
  //       Alert.alert(
  //         "Discard changes?",
  //         "You have unsaved changes. Are you sure you want to leave?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           { text: "Leave", style: "destructive", onPress: handleLeave },
  //         ]
  //       );
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       backAction
  //     );

  //     return () => backHandler.remove();
  //   }, [router])
  // );

  useFocusEffect(
    useCallback(() => {
      const handleLeave = () => {
        router.dismissTo("/(tabs)/home");
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
              onPress: () => router.replace("/(tabs)/home"),
            },
          ],
          { cancelable: true }
        );
      };

      const backAction = () => {
        if (mockExam?.completed) {
          confirmExit();
        } else {
          Alert.alert(
            "Discard changes?",
            "You have unsaved changes. Are you sure you want to leave?",
            [
              { text: "Don't leave", style: "cancel", onPress: () => {} },
              { text: "Leave", style: "destructive", onPress: handleLeave },
            ]
          );
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [router, mockExam?.completed])
  );

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    if (timeLeft === 0 && score === null && !loading && timerActive) {
      handleSubmit();
    }
  });

  const handleSelect = (questionId, selectedLetter) => {
    if (mockExam?.completed) return; // Disable selection if exam is completed

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedLetter,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatTimeReadable = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    let result = "";
    if (mins > 0) result += `${mins} min${mins !== 1 ? "s" : ""}`;
    if (mins > 0 && secs > 0) result += " ";
    if (secs > 0) result += `${secs} sec${secs !== 1 ? "s" : ""}`;

    return result || "0 seconds";
  };

  const confirmSubmit = () => {
    if (mockExam?.completed) {
      return router.push({
        pathname: "/(modals)/examResult",
        params: {
          score: mockExam.score,
          totalQuestions: questions.length,
          examTitle: mockExam?.exam?.title,
          subjectName: mockExam?.subject?.name,
          mode: mockExam?.mode,
          unanswered: mockExam?.results?.unanswered || 0,
          duration: mockExam?.results?.duration,
          timeSpent: mockExam?.results?.timeSpent,
          points: mockExam?.results?.points,
        },
      });
    }

    const unanswered = questions.filter((q) => !selectedAnswers[q._id]);
    if (unanswered.length > 0) {
      return Alert.alert(
        "Incomplete Exam",
        "You haven't answered all questions. Submit anyway?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Submit", onPress: handleSubmit },
        ]
      );
    }

    Alert.alert("Submit Answers?", "Are you sure you want to submit?", [
      { text: "Cancel", style: "cancel" },
      { text: "Submit", onPress: handleSubmit },
    ]);
  };

  const confirmRestart = () => {
    if (mockExam?.completed) {
      return Alert.alert(
        "Exam Already Completed",
        "This exam has already been completed and cannot be restarted."
      );
    }

    Alert.alert(
      "Restart Exam",
      "Are you sure you want to restart this exam? All current answers will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Restart", onPress: restartExam },
      ]
    );
  };

  const confirmSwitchMode = () => {
    if (mockExam?.completed) {
      return Alert.alert(
        "Exam Already Completed",
        "This exam has already been completed and cannot be restarted."
      );
    }

    Alert.alert(
      "Switch to Study Mode?",
      "You're about to switch this exam from Timed Mode to Study Mode. All current progress and answers will be lost. Do you want to continue?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Switch", onPress: () => setExamMode("study") },
      ]
    );
  };

  const setExamMode = async (mode) => {
    try {
      const { data } = await axios.patch(`/mock-exam/${params.id}/mode`, {
        mode: mode,
      });

      router.replace({
        pathname: "/exam/study",
        params: { subject: mockExam?.subject?.name, id: data.data._id },
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "Failed to switch exam mode";

      Alert.alert("Error", message);
    }
  };

  const handleSubmit = async () => {
    if (!questions.length || mockExam?.completed) return;

    let correctCount = 0;

    questions.forEach((q) => {
      const selected = selectedAnswers[q._id];
      const correct = q.correctAnswer;

      const normalizedSelected = selected ? selected.toLowerCase() : "";
      const normalizedCorrect = correct ? correct.toLowerCase() : "";

      if (normalizedSelected === normalizedCorrect) {
        correctCount++;
      }
    });

    const score = correctCount;
    const totalTimeSpent = Number(mockExam?.timeLimit) - Number(timeLeft);
    const unansweredCount = questions.filter(
      (q) => !selectedAnswers[q._id]
    ).length;

    const basePoints = score * 10;
    const accuracy = score / questions.length;
    const finishedOnTime = timeLeft > 0;
    let bonus = 0;
    if (accuracy >= 0.9) bonus += 20;
    if (finishedOnTime) bonus += 10;

    const totalPoints = basePoints + bonus;

    setScore(score);
    setTimerActive(false);

    // Create result object to send to backend
    const resultData = {
      score,
      totalQuestions: questions.length,
      examTitle: mockExam?.exam?.title,
      subjectName: mockExam?.subject?.name,
      mode: mockExam?.mode,
      unanswered: unansweredCount,
      duration: formatTimeReadable(mockExam?.timeLimit),
      timeSpent: formatTimeReadable(totalTimeSpent),
      points: totalPoints,
      completed: true,
    };

    try {
      // Send results to backend
      const { data } = await axios.post(
        `/mock-exam/${params.id}/submit`,
        resultData
      );

      setMockExam(data.data);

      if (data.data.completed) {
        setTimerActive(false);
        setScore(data.data.score);
      }

      router.push({
        pathname: "/(modals)/examResult",
        params: {
          score,
          totalQuestions: questions.length,
          examTitle: mockExam?.exam?.title,
          subjectName: mockExam?.subject?.name,
          unanswered: unansweredCount.toString(),
          duration: formatTimeReadable(mockExam?.timeLimit),
          timeSpent: formatTimeReadable(totalTimeSpent),
          points: totalPoints,
          mode: mockExam?.mode,
        },
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Error submitting exam results";

      Alert.alert("Eror", message);
    }
  };

  const restartExam = () => {
    setSelectedAnswers({});
    setTimeLeft(mockExam?.timeLimit || 1800);
    setScore(null);
    setTimerActive(true);
  };

  if (loading) {
    return <ImageLoader />;
  }

  if (!examData || !questions.length) {
    return (
      <ScreenWrapper backgroundColor={"#1E4B9B"}>
        <View className="flex-1 justify-center items-center">
          <Text className=" text-white text-body font-sans">
            No questions available for this exam.
          </Text>
          <TouchableOpacity
            className="mt-4 bg-white px-6 py-2 rounded-md"
            onPress={handleLeave}
          >
            <Text className="text-blue-900 font-sans-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      {/* Header Section */}
      <View className=" relative p-4 flex-col gap-4  ">
        {/* Main Header Content */}
        <View className="flex-row items-center justify-between ">
          {/* Exam Title and Logo - Enhanced with better spacing */}
          <View className="flex-row items-center gap-2">
            {getImageForExam(mockExam?.exam?.title) ? (
              <Image
                source={getImageForExam(mockExam?.exam?.title)}
                className="w-11 h-11"
                accessibilityLabel={`${mockExam?.exam?.title} logo`}
              />
            ) : (
              <View className="bg-indigo-50 h-12 w-12 rounded-full items-center justify-center  shadow-sm">
                <FontAwesome5 name="graduation-cap" size={20} color="#4f46e5" />
              </View>
            )}

            <View>
              <Text className=" text-white font-poppins-semibold text-body">
                {mockExam?.exam?.title}
              </Text>

              <Text className="text-gray-100 font-sans text-[14px] opacity-90">
                {mockExam?.subject?.name?.length > 24
                  ? `${mockExam.subject.name.substring(0, 15)}...`
                  : mockExam?.subject?.name || "No description"}{" "}
                ● {questions.length} Questions
              </Text>
            </View>
          </View>

          {/* Timer - Modern pill design with gradient */}
          <View className="relative">
            {/* Glow effect behind timer */}
            <View className="absolute -inset-1 bg-blue-300/20 blur rounded-md"></View>

            <View
              className={`bg-gradient-to-r from-blue-50 to-white px-3 py-2 rounded-md flex-row items-center border border-blue-100 ${
                mockExam?.completed ? "opacity-80 " : ""
              }`}
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={20}
                  color="#fff"
                />
                <Text className="text-gray-100 font-sans-medium text-[14px]">
                  {formatTime(timeLeft)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Navigation Controls */}
        <View className="flex-row justify-between items-center bg-white/10 px-8 py-2 rounded-md">
          <TouchableOpacity
            className=" items-center"
            onPress={confirmSwitchMode}
          >
            <FontAwesome5 name="book-reader" size={22} color={"white"} />
            <Text className="text-white text-[11px] font-sans-medium mt-1 text-center">
              Study mode
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() =>
              router.push({
                pathname: "/(modals)/examInfo",
                params: {
                  id: params.id,
                },
              })
            }
          >
            <FontAwesome5 name="info-circle" size={22} color="white" />
            <Text className="text-white text-[11px] font-sans-medium mt-1 text-center">
              Instructions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="item-center" onPress={confirmRestart}>
            <MaterialCommunityIcons
              name="restart"
              size={22}
              color={mockExam?.completed ? "gray" : "white"}
            />
            <Text
              className={`mt-1 font-sans-medium text-[11px] ${
                mockExam?.completed ? "text-gray-400" : "text-white"
              }`}
            >
              Restart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center" onPress={confirmSubmit}>
            <FontAwesome
              name="paper-plane"
              size={20}
              color={mockExam?.completed ? "#4ade80" : "white"}
            />
            <Text
              className={`text-center font-sans-medium text-[11px] mt-1 ${
                mockExam?.completed ? "text-green-300" : "text-white"
              }`}
            >
              {mockExam?.completed ? "Results" : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Questions List */}
      <View className="flex-1 bg-gray-100 rounded-t-[24px] py-6 ">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="flex-col gap-6">
            {questions.map((q, index) => (
              <QuestionCard
                key={q._id}
                question={{
                  id: q._id,
                  questionIndex: index + 1,
                  question: q.questionText,
                  options: Object.entries(q.options).map(([key, value]) => ({
                    key,
                    value,
                  })),
                  correctAnswer: q.correctAnswer,
                  explanation: q.explanation, // Make sure your API returns this field
                }}
                selectedAnswer={selectedAnswers[q._id]}
                handleSelect={handleSelect}
                disabled={mockExam?.completed}
                showAnswers={mockExam?.completed || score !== null}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
