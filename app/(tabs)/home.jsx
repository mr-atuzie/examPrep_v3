import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Components
import DashboardSkeletonLoader from "../../components/DashboardSkeletonLoader";
import ExamCard from "../../components/ExamCard";
import ScreenWrapper from "../../components/ScreenWrapper";
import UserAvatar from "../../components/UserAvatar";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState([]);

  const [rank, setRank] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/exams");
        const { data: points } = await axios.get("/user/rank");

        setExams(data.data);

        setRank(points);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while fetching exams. Please try again.";
        Alert.alert("Error", message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      {/* Header */}
      <View className="flex-col gap-4 px-4 py-2">
        <UserAvatar details />
      </View>

      {/* Content */}
      <View className="flex-1 bg-gray-100 rounded-t-[30px] py-6 px-4">
        {isLoading ? (
          <DashboardSkeletonLoader />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Recommended Exams Section */}
            <View className="mb-10">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-sans-bold tracking-wider text-[17px]  ">
                  Top Recommended Exams
                </Text>
                <TouchableOpacity>
                  <Link
                    href="/exams"
                    className="text-sm text-gray-800 font-medium"
                  >
                    See more
                  </Link>
                </TouchableOpacity>
              </View>

              {/* Exams Grid */}
              <View className="flex-row flex-wrap justify-between">
                {exams?.slice(0, 6).map((exam) => (
                  <ExamCard
                    key={exam._id || Math.random().toString()}
                    exam={exam}
                    onPress={() =>
                      router.push({
                        pathname: "/(modals)/examDetails",
                        params: { examId: exam._id },
                      })
                    }
                  />
                ))}
              </View>
            </View>

            {/* Leaderboard Section */}
            <View>
              <Text className="mb-2 tracking-wider font-sans-bold text-[17px]">
                Leadersboard
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/(modals)/leadersboard")}
                activeOpacity={0.8}
                className="flex-row items-center bg-white justify-between p-4 rounded-xl shadow-md"
              >
                {/* Points Section */}
                <View className="flex-row items-center gap-3">
                  <Ionicons name="trophy" size={50} color="#FFA500" />
                  <View>
                    <Text className="text-gray-500">Points</Text>
                    <Text className="text-blue-600 text-2xl font-extrabold">
                      {rank?.totalPoints}
                    </Text>
                  </View>
                </View>

                <View className="w-0.5 bg-gray-300 self-stretch mx-2" />

                {/* Ranking Section */}
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons
                    name="trophy-award"
                    size={50}
                    color="#7C3AED"
                  />
                  <View>
                    <Text className="text-gray-400">Ranking</Text>
                    <Text className="text-blue-600 text-2xl font-extrabold">
                      {rank?.position}

                      {rank?.position === 1
                        ? "st"
                        : rank?.position === 2
                        ? "nd"
                        : rank?.position === 3
                        ? "rd"
                        : "th"}
                    </Text>
                  </View>
                </View>

                {/* Chevron Icon */}
                <Feather name="chevron-right" size={24} color="#9CA3AF" />
              </TouchableOpacity>

              <Text className="text-sm text-gray-400 text-center mt-2">
                Tap to view full leaderboard
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </ScreenWrapper>
  );
}
