import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import ScreenWrapper from "../../components/ScreenWrapper";
import { setUser } from "../../store/userSlice";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Login failed", "Please fill all the fields");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/user/login`, { email, password });

      dispatch(
        setUser({
          name: data?.name,
          email: data?.email,
          image: data?.image,
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

  return (
    <ScreenWrapper>
      <View className="flex-1 py-6 px-4">
        <Header leftIcon={<BackButton />} logo={<Logo />} />

        <View className="my-9">
          <Text className="font-poppins-bold text-primary text-display-md">
            Hey,Welcome Back.
          </Text>
          <Text className="text-body font-sans ">
            Login now to start practicing and stay ahead
          </Text>
        </View>
        <View className="flex flex-col gap-4">
          {/* Email Input */}
          <TextInput
            mode="outlined"
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
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

          {/* Password Input */}
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            style={{ backgroundColor: "#F8FAFC" }}
            theme={{
              colors: {
                primary: "#1E4B9B",
                placeholder: "#94A3B8",
                text: "#1E293B",
              },
              roundness: 12,
            }}
            // outlineStyle={{ borderWidth: 1, borderColor: "#E2E8F0" }}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                color="#64748B"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />

          {/* Login Button */}
          <CustomButton
            loading={loading}
            backgroundColor="#1E4B9B"
            onPress={handleLogin}
            containerStyles="mt-2"
          >
            <Text className="text-white text-body font-sans-medium">Login</Text>
          </CustomButton>

          {/* Forgot Password + Sign Up Section */}

          <View className="flex-row justify-end tracking-wide ">
            {/* <TouchableOpacity
              onPress={() => router.push("/auth/register")}
              className="flex-row items-center"
            >
              <Text className="text-[15px] text-gray-800 ">
                New here?{" "}
                <Text className="text-primary font-sans-medium underline">
                  Register
                </Text>
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => router.push("/auth/forgotPassword")}
            >
              <Text className="text-primary font-sans  ml-auto text-[14px] ">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="mt-24 flex-row justify-center items-center"
          onPress={() => router.push("/auth/login")}
        >
          <Text className="text-body  text-gray-800 ">
            Don't have an account?{" "}
            <Text className="text-primary font-sans-medium ml-2 ">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
