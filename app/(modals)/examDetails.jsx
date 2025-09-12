import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import CustomButton from "../../components/CustomButton";
import ScreenWrapper from "../../components/ScreenWrapper";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import BackButton from "../../components/BackButton";
import ExamSkeleton from "../../components/ExamSkeleton";
import { getImageForExam } from "../../services/ImageServices";

const formatCurrency = (amount) => `₦${amount?.toFixed(0)}`;

const BenefitItem = ({ text, isActive }) => (
  <View className="flex-row  mb-2 items-start">
    <View
      className={`p-1 rounded-full mr-3 ${
        isActive ? "bg-green-100" : "bg-gray-100"
      }`}
    >
      <Ionicons
        name={isActive ? "checkmark" : "information-circle"}
        size={16}
        color={isActive ? "#10B981" : "#6B7280"}
      />
    </View>
    <Text
      className={`flex-1 font-sans ${
        isActive ? "text-gray-800" : "text-gray-600"
      }`}
    >
      {text}
    </Text>
  </View>
);

export default function ExamDetails() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [exam, setExam] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { examId } = useLocalSearchParams();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const { data } = await axios.get("/exams/" + examId);

        setExam(data.data);
        setLoading(false);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString() ||
          "Something went wrong";

        Alert.alert("Error", message);
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  const benefits = [
    "Unlimited access to all past questions",
    "Instant results with explanations",
    "Track your progress and score insights",
    "Learn anytime, anywhere",
  ];

  const bottomSheetRef = useRef(null);

  // snap points
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        style={[props.style, styles.backdrop]} // Add custom styles
        opacity={0.8}
      />
    ),
    []
  );

  const generatePaymentReference = () => {
    return `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleSubscribe = async () => {
    if (!examId) {
      Alert.alert("Error", "No exam selected");
      return;
    }
    try {
      setIsSubscribing(true);

      await axios.post("/subscriptions/", {
        examId,
        paymentRef: generatePaymentReference(),
        durationInMonths: 1,
      });

      // 2. Show success feedback
      // Alert.alert(
      //   "Subscribed!",
      //   `You now have access to ${exam.title} for ${
      //     exam.duration || 1
      //   } month(s)`,
      //   [
      //     {
      //       text: "Continue",
      //       onPress: () => console.log("subscribed"),

      //     },
      //   ]
      // );

      router.push({
        pathname: "/(modals)/examSubjects",
        params: { examId },
      });
    } catch (error) {
      const errorMessage = (
        error.response?.data?.message ||
        error.message ||
        "Subscription failed. Please try again."
      ).replace("Error: ", "");

      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      <View className="flex-1 bg-white rounded-t-[20px] py-6">
        {loading ? (
          <ExamSkeleton />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <BackButton />
            {/* Hero Section */}
            <View className="items-center ">
              {getImageForExam(exam?.title) ? (
                <Image
                  source={getImageForExam(exam?.title)}
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                  className="mb-3"
                  accessibilityLabel={`${exam?.title} logo`}
                  accessible
                />
              ) : (
                <View className="bg-indigo-50 h-28 w-28 rounded-full items-center justify-center mb-6 shadow-sm">
                  <FontAwesome5
                    name="graduation-cap"
                    size={48}
                    color="#4f46e5"
                  />
                </View>
              )}
            </View>

            {/* Exam Info */}
            <View className="space-y-4 mb-4">
              <Text className=" text-center text-[24px] font-sans-bold">
                {exam?.title}
              </Text>

              <Text className=" text-center font-sans text-gray-800 text-[14px] leading-6">
                {exam?.description}
              </Text>

              <View className="bg-gray-50 shadow-sm rounded-xl py-3 px-4 self-center mt-2">
                <Text className=" text-center text-gray-700 tracking-wider font-sans-medium">
                  🎯 {exam?.questionCount.toLocaleString()} Practice Questions
                </Text>
              </View>
            </View>
            {/* 
            {!exam?.hasActiveSubscription && (
              <View className="bg-indigo-100 rounded-2xl px-5 py-5 mb-8">
                <Text className=" capitalize text-center mb-2 text-body font-sans-bold">
                  Access this exam for just {formatCurrency(exam?.price)}
                  /month
                </Text>
                <Text className=" text-gray-700 text-center font-sans text-[14px]">
                  Unlock all questions, explanations, and progress tracking
                  features.
                </Text>
              </View>
            )} */}

            {!exam?.hasActiveSubscription && (
              <View className="bg-indigo-100 rounded-2xl px-5 py-5 mb-8">
                <Text className="capitalize text-center mb-2 text-body font-sans-bold">
                  Access this exam for just {formatCurrency(exam?.price)}/month
                </Text>
                <Text className="text-gray-700 text-center font-sans text-[14px]">
                  Unlock all questions, explanations, and progress tracking
                  features.
                </Text>
              </View>
            )}

            {!exam?.hasActiveSubscription ? (
              <>
                {/* CTA Button */}
                <CustomButton
                  backgroundColor="#1E4B9B"
                  onPress={() => bottomSheetRef.current?.snapToIndex(1)}
                  loading={loading}
                  disabled={loading}
                  className="mb-10"
                >
                  <Text className=" text-body text-white font-sans-medium">
                    Subscribe to access
                  </Text>
                </CustomButton>
              </>
            ) : (
              <>
                {/* Continue Button */}
                <CustomButton
                  backgroundColor="#1E4B9B"
                  onPress={() =>
                    router.push({
                      pathname: "/(modals)/examSubjects",
                      params: { examId },
                    })
                  }
                  loading={loading}
                  disabled={loading}
                  className="mb-10"
                >
                  <Text className=" text-body text-white font-sans-medium">
                    Continue Practing
                  </Text>
                </CustomButton>
              </>
            )}

            {/* Benefits Section */}
            <View className="my-6">
              <Text className="text-body tracking-wide font-sans-bold mb-4 text-gray-800">
                What you&#39;ll get:
              </Text>
              <View className="space-y-4">
                {benefits.map((benefit, index) => (
                  <BenefitItem
                    key={`benefit-${index}`}
                    text={benefit}
                    isActive={exam?.hasActiveSubscription}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#fff" }}
      >
        <BottomSheetView style={[styles.contentContainer]}>
          {/* Header with Paystack logo */}
          <View className="items-center mb-6 ">
            <Image
              source={require("../../assets/images/paystack.png")}
              className="w-32 h-8"
              resizeMode="contain"
            />
          </View>

          {/* Course Card */}
          <View className="bg-gray-100 rounded-xl p-4 shadow-sm mb-6 border border-gray-100">
            {/* Header Section - Course Title and Price */}
            <View className="flex-row justify-between items-center mb-6">
              {/* Course Info */}
              <View className="flex-row items-center flex-1 mr-2">
                {getImageForExam(exam?.title) && (
                  <View className="mr-3 p-2 bg-white rounded-lg">
                    <Image
                      source={getImageForExam(exam?.title)}
                      style={{ width: 24, height: 24, resizeMode: "contain" }}
                      accessibilityLabel={`${exam?.title} image`}
                    />
                  </View>
                )}

                <View className="flex-1">
                  <Text className="text-gray-800 font-sans-bold text-[15px]">
                    {exam?.title}
                  </Text>
                  <Text className="text-gray-700  text-[12px]  font-sans ">
                    Full course access with all questions and explanations
                  </Text>
                </View>
              </View>

              {/* Price */}
              <View className="items-end">
                <Text className="text-indigo-600   font-poppins-semibold">
                  {formatCurrency(exam?.price)}
                </Text>
                <Text
                  fontFamily="Roboto-Regular"
                  fontSize={11}
                  className="text-gray-700  font-sans text-[11px]"
                >
                  /month
                </Text>
              </View>
            </View>

            {/* Payment Section */}
            <View>
              <Text className="text-gray-800 font-sans mb-1 text-[12px]">
                Pay securely with your card
              </Text>

              {/* Payment Icons */}
              <View className="flex-row">
                {[
                  require("../../assets/images/visa.png"),
                  require("../../assets/images/mastercard.png"),
                  require("../../assets/images/verve.png"),
                ].map((icon, index) => (
                  <View
                    key={index}
                    className="bg-white p-1 rounded-md shadow-sm w-12 h-8 items-center justify-center mr-2"
                  >
                    <Image
                      source={icon}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Payment Section */}
          <View className="mb-6 mt-2">
            {/* <PaystackPayment
              amount={exam?.price}
              email="user@example.com"
              onSuccess={() => {
                bottomSheetRef.current?.close();
                router.push({
                  pathname: "/(modals)/subjects",
                  params: { examId },
                });
              }}
              onClose={() => bottomSheetRef.current?.close()}
            /> */}

            <CustomButton
              backgroundColor="#1E4B9B"
              onPress={handleSubscribe}
              loading={isSubscribing}
              disabled={isSubscribing}
              className="mb-10"
            >
              <Text className=" text-white font-sans-medium text-body">
                Proceed
              </Text>
            </CustomButton>

            {/* Terms */}
            <Text className="text-center capitalize text-xs mt-4 text-gray-700 px-6">
              By continuing, you agree to our{" "}
              <Text className="underline text-gray-500">Terms</Text> and{" "}
              <Text className="underline text-gray-500">Privacy Policy</Text>
            </Text>

            {/* Paystack Secure Badge */}
            <View className="flex-row items-center justify-center mt-4 gap-2">
              <MaterialCommunityIcons
                name="shield-check"
                size={16}
                color="#4ade80"
              />
              <Text fontSize={12} className="text-gray-800">
                Secured by Paystack and Stripe
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
});
