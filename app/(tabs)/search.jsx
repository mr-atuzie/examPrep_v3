import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
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
import Loader from "../../components/Loader";
import ScreenWrapper from "../../components/ScreenWrapper";
import UserAvatar from "../../components/UserAvatar";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/exams`);
      setExams(response.data.data || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedExams = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`/exams/me/search`, {
        params: {
          keyword: query,
        },
      });
      setExams(response.data.data || []);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Error searching exams:";

      Alert.alert("Search Failed", message);

      console.error("Error searching exams:", error);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch when component mounts - no params
    fetchExams();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      fetchExams(); // if search is empty, fetch all exams
    } else {
      fetchSearchedExams(query); // otherwise fetch with search term
    }
  };

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      <View className="px-4 py-4 flex-col gap-2">
        <View className="flex-row items-center gap-2">
          <UserAvatar />
          <View className="flex-1 bg-white px-2 py-1 rounded-xl shadow-sm">
            <View className="flex-row items-center">
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                placeholder="JAMB • WAEC • NECO • Post-UTME • NDA "
                placeholderTextColor="#6B7280"
                className="flex-1 ml-2 text-gray-800 font-[Roboto-Regular]"
                value={searchQuery}
                onChangeText={handleSearch}
                returnKeyType="search"
                onSubmitEditing={() => fetchExams()}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-gray-100 rounded-t-[30px] py-6 px-4">
        {loading ? (
          <Loader />
        ) : exams.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="mb-4">
              <Text className="text-gray-800 tracking-wider text-[18px] font-bold">
                {searchQuery ? "Search Results" : "Recommended Exams"}
              </Text>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {exams.map((exam, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInDown.delay(index * 80)
                    .springify()
                    .damping(14)}
                  className="w-[48%]  p-2.5 bg-white rounded-md shadow-md mb-4"
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(modals)/examDetailsModal",
                        params: { examId: exam?._id },
                      })
                    }
                  >
                    <View className="flex-row gap-2 items-center mb-2">
                      {getImageForExam(exam?.title) ? (
                        <Image
                          source={getImageForExam(exam?.title)}
                          style={{
                            width: 35,
                            height: 35,
                            resizeMode: "contain",
                          }}
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
                      <View>
                        <Text className="text-gray-800 text-[14px] font-medium">
                          {exam?.title}
                        </Text>
                        <Text className="mt-0.5 font-sans-medium tracking-wider text-indigo-500 text-[12px]">
                          {exam?.questionCount?.toLocaleString()} Questions
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <Text className="text-center text-gray-600">
            {searchQuery
              ? "No results found for your search."
              : "No exams available."}
          </Text>
        )}
      </View>
    </ScreenWrapper>
  );
}
