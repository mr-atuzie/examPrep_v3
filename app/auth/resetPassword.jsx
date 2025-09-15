import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../components/Logo";

export default function ResetPassword() {
  const router = useRouter();

  const { email } = useLocalSearchParams();
  const otpInputRef = useRef(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  // Auto-focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => otpInputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleResetPassword = async () => {
    if (otp.length !== 6) {
      return Alert.alert("Invalid OTP", "Please enter a valid 6-digit code.");
    }

    if (!password || !confirmPassword) {
      return Alert.alert(
        "Missing Fields",
        "Please enter and confirm your new password."
      );
    }

    if (password !== confirmPassword) {
      return Alert.alert("Password Mismatch", "Passwords do not match.");
    }

    console.log(password);

    try {
      setLoading(true);
      const { data } = await axios.post("/user/reset-password", {
        email,
        otp,
        password,
      });

      console.log(data);

      Alert.alert(
        "Password Reset Successful",
        "You can now log in with your new password.",
        [{ text: "OK", onPress: () => router.push("auth/login") }]
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      Alert.alert("Reset Error", message);
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
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      Alert.alert("Error resending OTP", message);

      console.error("Error resending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 py-6">
        <Header leftIcon={<BackButton />} logo={<Logo />} />

        <View className="mt-9 mb-8">
          <Text className="font-poppins-bold text-primary text-display-md">
            Reset Password
          </Text>

          <Text className="text-body font-sans text-gray-800 ">
            Please enter the OTP sent to{" "}
            <Text className="font-sans-medium lowercase">{email}</Text>
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col gap-5">
            <TextInput
              // ref={otpInputRef}
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
                roundness: 10,
              }}
            />

            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              textContentType="password"
              autoComplete="password"
              theme={{
                colors: {
                  primary: "#1E4B9B",
                  placeholder: "#94A3B8",
                  text: "#1E293B",
                },
                roundness: 10,
              }}
              style={{ backgroundColor: "#F8FAFC" }}
              right={
                <TextInput.Icon
                  size={20}
                  icon={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />

            <TextInput
              mode="outlined"
              label="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              textContentType="password"
              autoComplete="password"
              theme={{
                colors: {
                  primary: "#1E4B9B",
                  placeholder: "#94A3B8",
                  text: "#1E293B",
                },
                roundness: 10,
              }}
              style={{ backgroundColor: "#F8FAFC" }}
              right={
                <TextInput.Icon
                  size={20}
                  icon={confirmPasswordVisible ? "eye-off" : "eye"}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
              }
            />

            <CustomButton
              loading={loading}
              backgroundColor="#1E4B9B"
              onPress={handleResetPassword}
              containerStyles="mt-4"
            >
              <Text className="text-white text-lg tracking-wide font-sans-medium">
                Reset password
              </Text>
            </CustomButton>
          </View>

          <View className="mt-10 items-center space-y-2">
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resendDisabled || loading}
              className="flex-row items-center"
            >
              <Text className="text-gray-800  text-body">
                Didn&apos;t receive the code?{" "}
              </Text>
              <Text className="text-primary underline font-sans-medium text-body">
                Resend OTP
              </Text>
            </TouchableOpacity>

            <Text className="text-[12px] lowercase mt-1 text-gray-500 text-center px-10">
              If you still don’t see the email, be sure to check your{" "}
              <Text className="font-medium text-primary">Spam</Text> folder.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
