import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import ScreenWrapper from "../../components/ScreenWrapper";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return Alert.alert("Missing Email", "Please enter your email address.");
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`/user/forgot-password`, {
        email: trimmedEmail,
      });
      console.log("OTP Resent:", data);

      router.push({
        pathname: "/auth/resetPassword",
        params: { email: trimmedEmail },
      });
      // Optionally show a success message
      // Alert.alert("Success", "A verification code has been sent to your email.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred. Please try again.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 py-6 px-4">
          <Header leftIcon={<BackButton />} logo={<Logo />} />

          <>
            <View className="mt-9">
              <Text className="font-poppins-bold text-primary text-display-md">
                Forget Password?
              </Text>
              <Text className="text-body  ">
                Enter your email to reset your password
              </Text>
            </View>

            <View className="flex flex-col gap-4 mt-6">
              <TextInput
                mode="outlined"
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ backgroundColor: "#F8FAFC" }}
                theme={{
                  colors: {
                    primary: "#1E4B9B",
                    placeholder: "#94A3B8",
                    text: "#1E293B",
                  },
                  roundness: 12,
                }}
                outlineStyle={{ borderWidth: 1, borderColor: "#E2E8F0" }}
              />

              <CustomButton
                loading={loading}
                backgroundColor="#1E4B9B"
                onPress={handleForgotPassword}
                disabled={!email.trim()}
                containerStyles="mt-2"
              >
                <Text className="text-white tracking-wide text-body font-sans-medium">
                  Send OTP
                </Text>
              </CustomButton>
            </View>

            <TouchableOpacity
              onPress={() => router.back()}
              className="mt-32 flex-row justify-center"
            >
              <Text className="text-body font-sans">Changed your mind? </Text>
              <Text className="text-primary  text-body font-sans-medium">
                Sign In
              </Text>
            </TouchableOpacity>
          </>
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
