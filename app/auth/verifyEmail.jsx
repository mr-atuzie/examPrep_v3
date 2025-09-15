import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Logo from "../../components/Logo";
import { setUser } from "../../store/userSlice";

export default function VerifyEmail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = useLocalSearchParams();
  const otpInputRef = useRef(null);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => otpInputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit code.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/user/verify-email", { otp });

      const { user } = data;

      dispatch(
        setUser({
          name: user?.name,
          email: user?.email,
          image: user?.image,
        })
      );

      router.replace("/(tabs)/home");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      Alert.alert("Login Error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      await axios.post("/user/resend-otp", { email });
      setResendDisabled(true);
      Alert.alert("OTP Sent", "A new code has been sent to your email.");
    } catch {
      Alert.alert(
        "Error resending OTP",
        "Unable to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 py-6">
        <Header leftIcon={<BackButton />} logo={<Logo />} />

        <View className="mt-9 mb-8">
          <Text className="font-poppins-bold text-primary text-display-md ">
            Verify Your Email
          </Text>

          <Text className="text-body text-gray-800 font-sans">
            We&apos;ve sent a 6-digit code to{" "}
            <Text className="font-sans-medium lowercase">{email}</Text>
          </Text>
        </View>

        <View className="space-y-6">
          <TextInput
            ref={otpInputRef}
            autoFocus
            mode="outlined"
            label="Verification Code"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            style={{ backgroundColor: "#F8FAFC" }}
            theme={{
              colors: {
                primary: "#1E4B9B",
                placeholder: "#94A3B8",
                text: "#1E293B",
              },
              roundness: 12,
            }}
          />

          <CustomButton
            loading={loading}
            backgroundColor="#1E4B9B"
            onPress={handleLogin}
            containerStyles="mt-4"
          >
            <Text className="text-white text-lg font-sans-medium">
              Continue
            </Text>
          </CustomButton>
        </View>

        <View className="mt-10 items-center space-y-2">
          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={resendDisabled || loading}
            className="flex-row items-center"
          >
            <Text className="font-sans text-body">
              Didn&apos;t receive the code?{" "}
            </Text>
            <Text className="text-primary underlin font-sans-medium text-body">
              Resend OTP
            </Text>
          </TouchableOpacity>

          <Text className="text-[12px] text-gray-500 text-center mt-2 px-10">
            If you still don’t see the email, be sure to check your{" "}
            <Text className="font-medium text-primary">spam folder.</Text>
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
