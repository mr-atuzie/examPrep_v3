import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const UserAvatar = ({ details }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue != null) {
          const parsedData = JSON.parse(jsonValue);
          setUser(parsedData);
        } else {
          console.log("No data found");
        }
      } catch (e) {
        console.error("Error reading value", e);
      }
    };

    getData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const greetings = {
      morning: [
        "Early bird,rise and revise",
        "Start your day with a win",
        "Tackle a few questions",
      ],
      afternoon: [
        "Keep pushing — every question counts!",
        "Perfect time for a quick revision!",
        "Smash that syllabus",
      ],
      evening: [
        "Evening grind?  Keep pushing",
        "Stay sharp, practice makes perfect.",
        "One more quiz before you relax?",
      ],
      night: [
        "Prep smarter tonight!",
        "Consistency beats cramming",
        "Night owl,End the day strong",
      ],
    };

    if (hour < 12)
      return greetings.morning[
        Math.floor(Math.random() * greetings.morning.length)
      ];
    if (hour < 18)
      return greetings.afternoon[
        Math.floor(Math.random() * greetings.afternoon.length)
      ];
    if (hour < 22)
      return greetings.evening[
        Math.floor(Math.random() * greetings.evening.length)
      ];
    return greetings.night[Math.floor(Math.random() * greetings.night.length)];
  };

  return (
    <View className=" flex-row gap-2 items-center">
      <TouchableOpacity>
        <Image
          source={
            user?.image
              ? { uri: user?.image }
              : require("../assets/images/defaultAvatar.png")
          }
          className="w-12 h-12 rounded-full"
          resizeMode="cover"
        />
      </TouchableOpacity>
      {details && (
        <View>
          <Text className=" text-gray-300 text-[12px] tracking-wider text-body font-sans -mb-1">
            {getGreeting()}
          </Text>

          <Text className=" text-white tracking-wider text-[20px] font-poppins-semibold">
            {user?.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserAvatar;
