import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import ImageLoader from "../../components/ImageLoader";
import ScreenWrapper from "../../components/ScreenWrapper";
import UserAvatar from "../../components/UserAvatar";
import { getImageForExam } from "../../services/ImageServices";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user subscriptions
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data } = await axios.get("/subscriptions/my-subscriptions");
        setSubscriptions(data.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load subscriptions";
        Alert.alert("Error", message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  // Format currency (example: $49.99)
  const formatCurrency = (amount) => {
    return `${parseFloat(amount || 0).toFixed(2)}`;
  };

  if (loading) return <ImageLoader />;

  return (
    <ScreenWrapper backgroundColor="#1E4B9B" statusBarStyle="light-content">
      {/* Header */}
      <View className="px-3 py-4 flex-row items-center">
        <BackButton iconColor="#fff" backgroundColor="transparent" />
        <View className="flex-1 ml-3">
          <Text className="font-sans-bold text-[22px] text-white tracking-wider text-center">
            My Subscriptions
          </Text>
          <Text className="text-white opacity-80 text-center text-[14px] font-sans">
            Active exam access plans
          </Text>
        </View>
        <UserAvatar />
      </View>

      {/* Subscription Cards */}
      <View className="flex-1 bg-gray-100 rounded-t-[30px] py-6 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          {subscriptions.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10 font-sans">
              No active subscriptions found.
            </Text>
          ) : (
            subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub._id}
                subscription={sub}
                formatCurrency={formatCurrency}
                getExamLogo={getImageForExam}
              />
            ))
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

// Subscription Card Component
const SubscriptionCard = ({ subscription, formatCurrency, getExamLogo }) => {
  const subscribedAt = new Date(subscription.subscribedAt);
  const expiresAt = new Date(subscription.expiresAt);
  const now = new Date();

  const totalDuration = Math.ceil(
    (expiresAt - subscribedAt) / (1000 * 60 * 60 * 24)
  );
  const daysRemaining = Math.max(
    0,
    Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24))
  );
  const progress = Math.min(1, daysRemaining / totalDuration); // between 0 and 1

  return (
    <View className="bg-white flex-col rounded-xl p-4 shadow-sm mb-4 border border-gray-200">
      {/* Header Section */}

      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-row items-center flex-1">
          {/* <Image
            source={getExamLogo(subscription.exam.title)}
            className="w-10 h-10 mr-3"
            resizeMode="contain"
          /> */}

          {getExamLogo(subscription.exam.title) ? (
            <Image
              source={getExamLogo(subscription.exam.title)}
              className="w-10 h-10 mr-3"
              resizeMode="contain"
            />
          ) : (
            <View className="bg-indigo-100 h-10 w-10 mr-2 rounded-full items-center justify-center">
              <FontAwesome5 name="graduation-cap" size={18} color="#4f46e5" />
            </View>
          )}
          <View className="flex-1">
            <Text className="text-gray-800 font-sans-bold text-[16px]">
              {subscription.exam.title}
            </Text>
            <Text className="text-gray-500 font-sans text-[12px]">
              Expires in {daysRemaining} day(s)
            </Text>
          </View>
        </View>
        <Text className="text-primary  text-[14px] font-poppins-bold">
          &#8358;{formatCurrency(subscription.exam.price)}
        </Text>
      </View>

      {/* Status Bar */}
      <View className="mb-3">
        <View className="h-2 bg-gray-200 rounded-sm overflow-hidden">
          <View
            className={`h-full ${
              daysRemaining > 15
                ? "bg-primary"
                : daysRemaining > 7
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${progress * 100}%` }}
          />
        </View>
      </View>

      {/* <View className=" flex-row ">
        <Text className="text-gray-500 font-sans text-[13px]">
          Next payment is on
        </Text>
        <Text className="font-sans-medium text-[13px]">
          {new Date(subscription.expiresAt).toLocaleDateString()}
        </Text>
      </View> */}

      {/* Dates Section */}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity className=" flex-row bg-gray-100 p-2 items-center rounded-[10px] gap-1">
          <MaterialCommunityIcons
            name="calendar-range-outline"
            size={14}
            color="#6B7280"
          />

          <Text className="text-gray-600 font-sans text-[12px]">
            Expires On
          </Text>
          <Text className="font-sans-medium text-[12px]">
            {format(new Date(subscription.expiresAt), "EEEE, MMM do")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subscription;
