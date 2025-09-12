import { FontAwesome5 } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExamCard = ({ exam = {}, onPress = () => {} }) => {
  // Safely destructure with defaults
  const {
    _id,
    title = "Untitled Exam",
    description = "",
    desc = description,
    questionCount,
  } = exam;

  const getImageForExam = (title, logo) => {
    const lower = title.toLowerCase().replace(/[.\s]/g, "");

    if (lower.includes("jamb")) return require("../assets/images/jamb.png");
    if (lower.includes("waec")) return require("../assets/images/waec.webp");
    if (lower.includes("ncee") || lower.includes("bece"))
      return require("../assets/images/neco.png");
    if (lower.includes("nda")) return require("../assets/images/NDA.png");
    if (lower.includes("sat")) return require("../assets/images/sat.png");
    if (lower.includes("toefl")) return require("../assets/images/toefl.png");
    if (lower.includes("act")) return require("../assets/images/act.png");

    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[48%] bg-white p-3 mb-4 rounded-2xl shadow-sm shadow-gray-300 active:bg-gray-50"
      activeOpacity={0.85}
      key={_id}
    >
      {/* Header Row */}
      <View className="flex-row items-center">
        {getImageForExam(title) ? (
          <View className="mr-2">
            <Image
              source={getImageForExam(title)}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
              onLoadStart={() => (
                <ActivityIndicator size="small" color="#4f46e5" />
              )}
            />
          </View>
        ) : (
          <View className="bg-indigo-100 h-10 w-10 mr-2 rounded-full items-center justify-center">
            <FontAwesome5 name="graduation-cap" size={18} color="#4f46e5" />
          </View>
        )}

        <View className="flex-1">
          <Text className=" font-sans-medium text-[15px] ">{title}</Text>
        </View>
      </View>

      {/* Body Content */}
      <View className="mt-1">
        <Text className=" text-[13px] text-gray-800 font-sans">
          {desc?.length > 42
            ? `${desc.substring(0, 42)}...`
            : desc || "No description"}
        </Text>

        <View className="flex-row justify-between items-center mt-2">
          <Text className=" font-sans-medium tracking-wider text-indigo-500 text-[12px]">
            {questionCount?.toLocaleString() || "0"} Questions
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExamCard;
