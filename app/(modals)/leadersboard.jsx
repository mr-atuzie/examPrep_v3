import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import axios from "axios";
import BackButton from "../../components/BackButton";
import ImageLoader from "../../components/ImageLoader";
import ScreenWrapper from "../../components/ScreenWrapper";
import UserAvatar from "../../components/UserAvatar";

const Leadersboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getBadge = (rank) => {
  //   switch (rank) {
  //     case 1:
  //       return "Grandmaster"; // Top champion
  //     case 2:
  //       return "Master Solver"; // Elite puzzle expert
  //     case 3:
  //       return "Fastest Solver"; // Speed demon
  //     case 4:
  //       return "Streak Master"; // Unstoppable consistency
  //     case 5:
  //       return "High Achiever"; // Strong performance
  //     case 6:
  //       return "Bronze Brain"; // Solid & clever
  //     case 7:
  //       return "Rising Star"; // Up-and-coming talent
  //     case 8:
  //       return "Relentless Solver"; // Never gives up
  //     default:
  //       return "Consistent Performer"; // Steady & reliable
  //   }
  // };

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user/leaders`);

        // Transform the API data to match your frontend structure
        const transformedData = data.map((user, index) => ({
          id: user._id,
          name: user.name,
          score: user.totalPoints,
          rank: index + 1,
          avatar:
            user.image ||
            "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg", // fallback avatar
          // badge: getBadge(index + 1), // Helper function to assign badges,
          country: user.country, // Helper function to assign badges
        }));

        setLeaderboardData(transformedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString() ||
          "Something went wrong";

        Alert.alert("Error", message);
      }
    };
    fetchLeaders();
  }, []);

  if (loading || leaderboardData.length === 0) {
    return <ImageLoader />;
  }

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      {/* Header */}
      <View className="px-3 py-4 flex-row items-center">
        <BackButton iconColor="#fff" backgroundColor="transparent" />

        <View className="flex-1 ml-3">
          <Text className=" font-sans-bold text-[22px] text-white tracking-wider text-center">
            Leadersboard
          </Text>
          <Text className="text-white opacity-80 text-center  text-[14px] font-sans">
            Exam Prep Top 10 Performers
          </Text>
        </View>
        <UserAvatar />
      </View>

      {/* Compact Top 3 Users - Only render if we have at least 3 users */}
      {leaderboardData.length >= 3 && (
        <View className="items-center my-6">
          <View className="flex-row justify-center items-end gap-10 ">
            {/* 2nd Place */}
            <View className="items-center">
              <View className="relative mb-2">
                <View className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Text className="text-white font-sans text-[14px]">2</Text>
                </View>
                <Image
                  source={{ uri: leaderboardData[1].avatar }}
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
              </View>
              <Text className="font-medium font-sans-medium text-[15px] text-white  text-center">
                {leaderboardData[1].name}
              </Text>

              {/* <Text className="text-green-600 tracking-wider font-sans text-[13px] mt-1">
                {leaderboardData[1].badge}
              </Text> */}

              {leaderboardData[1]?.country && (
                <View className=" flex-row items-center my-1 gap-1">
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${leaderboardData[1]?.country?.code.toLowerCase()}.png`,
                    }}
                    style={styles.flagImage}
                    contentFit="cover"
                  />

                  <Text className="text-gray-100 text-[13px] font-sans tracking-wider">
                    {leaderboardData[1]?.country?.name
                      ? leaderboardData[1].country.name.length > 10
                        ? `${leaderboardData[1].country.name.substring(
                            0,
                            10
                          )}...`
                        : leaderboardData[1].country.name
                      : ""}
                  </Text>
                </View>
              )}

              <Text className="text-gray-200 font-poppins-bold  text-body">
                {leaderboardData[1].score} pts
              </Text>
            </View>

            {/* 1st Place */}
            <View className="items-center">
              <View className="relative mb-2">
                <View className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <MaterialIcons name="emoji-events" size={16} color="white" />
                </View>
                <Image
                  source={{ uri: leaderboardData[0].avatar }}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400"
                />
              </View>
              <Text className="text-white font-sans-medium text-[15px] text-center">
                {leaderboardData[0].name}
              </Text>

              {/* <Text className="text-yellow-400 text-[13px] font-sans tracking-wider mt-1">
                {leaderboardData[0].badge}
              </Text> */}

              {leaderboardData[0]?.country && (
                <View className=" flex-row items-center my-1 gap-1">
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${leaderboardData[0]?.country?.code.toLowerCase()}.png`,
                    }}
                    style={styles.flagImage}
                    contentFit="cover"
                  />
                  <Text className="text-gray-100 text-[13px] font-sans tracking-wider ">
                    {leaderboardData[0]?.country?.name
                      ? leaderboardData[0].country.name.length > 10
                        ? `${leaderboardData[0].country.name.substring(
                            0,
                            8
                          )}...`
                        : leaderboardData[0].country.name
                      : ""}
                  </Text>
                </View>
              )}
              <Text className="text-gray-200 font-poppins-bold  text-body">
                {leaderboardData[0].score} pts
              </Text>
            </View>

            {/* 3rd Place */}
            <View className="items-center">
              <View className="relative mb-2">
                <View className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Text className="text-white text-[14px] font-sans">3</Text>
                </View>
                <Image
                  source={{ uri: leaderboardData[2].avatar }}
                  className="w-16 h-16 rounded-full border-2 border-amber-500"
                />
              </View>
              <Text className="text-white text-[15px] font-sans  text-center">
                {leaderboardData[2].name}
              </Text>

              {/* <Text className="text-amber-500 tracking-wider text-[13px] font-sans my-1">
                {leaderboardData[2].badge}
              </Text> */}

              {leaderboardData[2]?.country && (
                <View className=" my-1 flex-row items-center gap-1">
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${leaderboardData[2]?.country?.code.toLowerCase()}.png`,
                    }}
                    style={styles.flagImage}
                    contentFit="cover"
                  />
                  <Text className="text-gray-100 text-[13px] font-sans tracking-wider ">
                    {/* {leaderboardData[2]?.country?.name} */}

                    {leaderboardData[2]?.country?.name
                      ? leaderboardData[2].country.name.length > 14
                        ? `${leaderboardData[2].country.name.substring(
                            0,
                            14
                          )}...`
                        : leaderboardData[2].country.name
                      : ""}
                  </Text>
                </View>
              )}
              <Text className="text-gray-200 font-poppins-bold  text-body">
                {leaderboardData[2].score} pts
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Leaderboard List */}
      <View className="flex-1 bg-gray-100 rounded-t-3xl pt-6  px-6">
        {leaderboardData.length > 3 ? (
          <FlatList
            data={leaderboardData.slice(3)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                className="flex-row items-center justify-between bg-white p-4 my-2 rounded-xl shadow"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="  font-sans-medium text-[15px] ">
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
                    source={{ uri: item.avatar }}
                    className="w-10 h-10 rounded-full"
                  />

                  <View>
                    <Text className="text-lg text-gray-800 font-sans-medium text-[15px]">
                      {item?.name}
                    </Text>

                    {item?.country && (
                      <View className=" flex-row items-center gap-1">
                        <Image
                          source={{
                            uri: `https://flagcdn.com/w40/${item?.country?.code.toLowerCase()}.png`,
                          }}
                          style={styles.flagImage}
                          contentFit="cover"
                        />
                        <Text className="text-gray-700 text-[13px] font-sans tracking-wider ">
                          {item?.country?.name}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text className=" font-poppins-bold text-body text-blue-900">
                  {item.score} pts
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text>No leaderboard data available</Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flagImage: {
    width: 15,
    height: 10,
    // marginRight: 12,
  },
});

export default Leadersboard;
