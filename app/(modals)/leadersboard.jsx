import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import ImageLoader from "../../components/ImageLoader";
import ScreenWrapper from "../../components/ScreenWrapper";
import { getImageForExam } from "../../services/ImageServices";

const Leadersboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examsLoading, setExamsLoading] = useState(false);

  const bottomSheetRef = useRef(null);
  const { height: screenHeight } = Dimensions.get("window");

  // Calculate snap points based on screen height
  const snapPoints = useMemo(() => ["50%", "70%", "90%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        style={[props.style, styles.backdrop]}
        opacity={0.8}
      />
    ),
    []
  );

  useEffect(() => {
    fetchLeaders();
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      fetchLeaders(selectedExam._id);
    } else {
      fetchLeaders(); // Fetch overall leaders
    }
  }, [selectedExam]);

  const fetchLeaders = async (examId = null) => {
    try {
      setLoading(true);

      const url = examId ? `/user/leaders/exam/${examId}` : `/user/leaders`;

      const { data } = await axios.get(url);

      let transformedUsers = data.map((user, index) => {
        // If examId present, use that exam’s score from examPoints object
        const score = examId
          ? (user.examPoints?.[examId] ?? 0)
          : (user.totalPoints ?? 0);

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          country: user.country,
          score, // score is dynamic based on examId
          rank: index + 1,
          examSubscriptions: user.examSubscriptions || [],
          totalPoints: user.totalPoints, // keep original
        };
      });

      setLeaderboardData(transformedUsers);
      setFilteredData(transformedUsers);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExams = async () => {
    try {
      setExamsLoading(true);
      // Option 1: If you need to get exams from subscriptions
      const { data } = await axios.get("/subscriptions/my-subscriptions");

      // Extract exams from subscriptions if needed
      const userExams = data.data.map((sub) => sub.exam);
      setExams(userExams);

      // OR Option 2: Get all available exams
      // const { data } = await axios.get("/exams");
      // setExams(data.data || data);
    } catch (error) {
      console.error("Error fetching exams:", error);
      // Optional: Set empty array instead of failing silently
      setExams([]);
    } finally {
      setExamsLoading(false);
    }
  };

  const openFilterSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const closeFilterSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleExamSelect = (exam) => {
    setSelectedExam(exam._id === selectedExam?._id ? null : exam);
    closeFilterSheet();
  };

  const getDisplayData = () => {
    return selectedExam ? filteredData : leaderboardData;
  };

  const renderTopThree = () => {
    const data = getDisplayData();
    if (data.length < 3) return null;

    return (
      <View className="items-center my-6">
        <View className="flex-row justify-center items-end gap-10">
          {/* 2nd Place */}
          {renderTopUser(data[1], 2, "border-gray-300")}

          {/* 1st Place */}
          {renderTopUser(data[0], 1, "border-yellow-400")}

          {/* 3rd Place */}
          {renderTopUser(data[2], 3, "border-amber-500")}
        </View>
      </View>
    );
  };

  const renderTopUser = (user, rank, borderColor) => (
    <View className="items-center">
      <View className="relative mb-2">
        {/* <View
          className={`w-6 h-6 ${
            rank === 1
              ? "w-7 h-7 bg-yellow-500"
              : rank === 2
                ? "bg-gray-400"
                : "bg-amber-600"
          } rounded-full flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2 z-10`}
        >
          {rank === 1 ? (
            <MaterialIcons name="emoji-events" size={16} color="white" />
          ) : (
            <Text className="text-white text-[14px] font-sans">{rank}</Text>
          )}
        </View> */}
        <Image
          source={{ uri: user.image }}
          className={`w-14 h-14 rounded-full border-2 ${borderColor}`}
        />
      </View>
      <Text className="font-medium font-sans-medium text-[15px] text-white text-center">
        {user.name}
      </Text>

      {user?.country && (
        <View className="flex-row items-center my-1 gap-1">
          <Image
            source={{
              uri: `https://flagcdn.com/w40/${user.country.code.toLowerCase()}.png`,
            }}
            style={styles.flagImage}
          />
          <Text className="text-gray-100 text-[13px] font-sans tracking-wider">
            {user.country.name?.length > 10
              ? `${user.country.name.substring(0, 10)}...`
              : user.country.name}
          </Text>
        </View>
      )}

      <Text className="text-gray-200 font-poppins-bold text-body">
        {user.score} pts
      </Text>
    </View>
  );

  const renderLeaderboardItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      className="flex-row items-center justify-between bg-white p-4 my-2 rounded-xl shadow"
    >
      <View className="flex-row items-center gap-3">
        <Text className="font-sans-medium text-[15px]">
          {item.rank}
          {item.rank === 1
            ? "st"
            : item.rank === 2
              ? "nd"
              : item.rank === 3
                ? "rd"
                : "th"}
        </Text>
        <Image
          source={{ uri: item.image }}
          className="w-10 h-10 rounded-full"
        />

        <View>
          <Text className="text-lg text-gray-800 font-sans-medium text-[15px]">
            {item.name}
          </Text>

          {item?.country && (
            <View className="flex-row items-center gap-1">
              <Image
                source={{
                  uri: `https://flagcdn.com/w40/${item.country.code.toLowerCase()}.png`,
                }}
                style={styles.flagImage}
              />
              <Text className="text-gray-700 text-[13px] font-sans tracking-wider">
                {item.country.name}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Text className="font-poppins-bold text-body text-blue-900">
        {item.score} pts
      </Text>
    </TouchableOpacity>
  );

  const renderFilterSheet = () => (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "#fff" }}
      style={styles.bottomSheet} // Add this line
    >
      <BottomSheetView style={styles.contentContainer}>
        <View className="px-4 z-50 pt-4 pb-2">
          <Text className="font-poppins-bold text-2xl text-gray-900 tracking-tight">
            Filter Leaderboard
          </Text>
          <Text className="font-sans text-sm text-gray-500 text-[14px] mb-6">
            Filter by exam subscription
          </Text>
        </View>

        {/* Use ScrollView instead of FlatList for better control */}
        <BottomSheetScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View className="px-4 pb-6">
            {/* All Exams Option */}

            {examsLoading ? (
              <ActivityIndicator size="small" color="#1E4B9B" />
            ) : exams.length === 0 ? (
              <Text className="text-gray-500 text-center py-4">
                No exam subscriptions found
              </Text>
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {/* All Exams */}
                <View className="w-[48%] mb-4">
                  <TouchableOpacity
                    className={`px-4 py-2 rounded-xl items-center gap-2 flex-row border-2 ${
                      !selectedExam
                        ? "border-[#1E4B9B] bg-[#F0F7FF]"
                        : "border-gray-200 bg-white"
                    }`}
                    onPress={() => setSelectedExam(null)}
                  >
                    <View className="bg-indigo-100 h-10 w-10 rounded-full items-center justify-center">
                      <FontAwesome5
                        name="graduation-cap"
                        size={18}
                        color="#4f46e5"
                      />
                    </View>
                    <Text
                      className={`font-sans-medium text-center ${
                        !selectedExam ? "text-[#1E4B9B]" : "text-gray-800"
                      }`}
                    >
                      All Exams
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Exam List */}
                {exams.map((exam) => (
                  <View key={exam._id} className="w-[48%] mb-4">
                    <TouchableOpacity
                      className={`px-4 py-2 rounded-xl items-center gap-2 flex-row border-2 ${
                        selectedExam?._id === exam._id
                          ? "border-[#1E4B9B] bg-[#F0F7FF]"
                          : "border-gray-200 bg-white"
                      }`}
                      onPress={() => handleExamSelect(exam)}
                    >
                      {getImageForExam(exam.title) ? (
                        <Image
                          source={getImageForExam(exam.title)}
                          className="w-10 h-10"
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
                        className={`font-sans-medium text-center ${
                          selectedExam?._id === exam._id
                            ? "text-[#1E4B9B]"
                            : "text-gray-800"
                        }`}
                        numberOfLines={2}
                      >
                        {exam.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );

  if (loading) {
    return <ImageLoader />;
  }

  const displayData = getDisplayData();

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      {/* Header */}
      <View className="px-3 py-4 flex-row items-center justify-between">
        <BackButton iconColor="#fff" backgroundColor="transparent" />

        <View className="flex-1 ml-3 mr-3">
          <Text className="font-sans-bold text-[22px] text-white tracking-wider text-center">
            Leaderboard
          </Text>
          <Text className="text-white opacity-80 text-center text-[14px] font-sans">
            {selectedExam
              ? `${selectedExam.title} Top Performers`
              : "Exam Prep Top 10 Performers"}
          </Text>
        </View>

        <TouchableOpacity
          className="p-2"
          onPress={openFilterSheet}
          accessibilityLabel="Filter options"
          accessibilityRole="button"
        >
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top 3 Users */}
      {renderTopThree()}

      {/* Leaderboard List */}
      <View className="flex-1 bg-gray-100 pb-20 rounded-t-3xl pt-6 px-6">
        {displayData.length > 0 ? (
          <FlatList
            data={displayData.slice(3)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderLeaderboardItem}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-gray-500 font-sans text-center">
              {selectedExam
                ? `No users found for ${selectedExam.title}`
                : "No leaderboard data available"}
            </Text>
          </View>
        )}
      </View>

      {renderFilterSheet()}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flagImage: {
    width: 15,
    height: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  bottomSheetContainer: {
    zIndex: 100, // Higher than the rank badges
  },
  bottomSheet: {
    zIndex: 20, // Higher than the rank badges
  },
  contentContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30, // Add extra padding at the bottom
  },
});

export default Leadersboard;
