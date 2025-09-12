import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function RegisterScreen() {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullname || !email || !password || !confirmPassword) {
      return Alert.alert("Registration failed", "Please fill all the fields", [
        { text: "OK" },
      ]);
    }

    if (password !== confirmPassword) {
      return Alert.alert("Registration failed", "Passwords do not match", [
        { text: "OK" },
      ]);
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/user/register`, {
        name: fullname,
        email,
        password,
      });

      router.replace({
        pathname: "/auth/verifyEmail",
        params: { email, id: data?._id },
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        "Registration failed";

      Alert.alert("Registration Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 p-4">
        <Header leftIcon={<BackButton />} />

        <View className="my-9">
          <Text className="font-poppins-bold text-primary text-display-md">
            Study Smarter For Exams.
          </Text>

          <Text className="text-body ">
            Register to access premium study materials.
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col gap-5">
            <TextInput
              mode="outlined"
              label="Full Name"
              value={fullname}
              onChangeText={setFullname}
              autoCapitalize="words"
              textContentType="name"
              autoComplete="name"
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
              label="Email Address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              textContentType="emailAddress"
              autoComplete="email"
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
              onPress={handleRegister}
              containerStyles={"mt-4"}
            >
              <Text className="text-white text-body font-sans-medium">
                Register
              </Text>
            </CustomButton>
          </View>
          <TouchableOpacity
            className="mt-12 flex-row justify-center items-center"
            onPress={() => router.push("/auth/login")}
          >
            <Text className="text-body  text-gray-800 ">
              Already have an account?{" "}
              <Text className="text-primary font-sans-medium ml-2 ">
                Sign In
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
