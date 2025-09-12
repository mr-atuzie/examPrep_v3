import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import UserAvatar from "../../components/UserAvatar";

export default function UpdatePassword() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return Alert.alert(
        "Missing Fields",
        "Please fill in all password fields."
      );
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Password Mismatch", "New passwords do not match.");
    }

    try {
      setLoading(true);
      const { data } = await axios.patch("/user/change-password", {
        oldPassword,
        newPassword,
      });

      console.log(data);

      Alert.alert(
        "Password Changed",
        "Your password has been updated successfully.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      Alert.alert("Change Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
      {/* Header */}
      <View className="px-3 py-4 flex-row items-center">
        <BackButton iconColor="#fff" backgroundColor="transparent" />

        <View className="flex-1 ml-3">
          <Text className="font-poppins-bold text-white text-[20px] text-center">
            Change Password
          </Text>
        </View>
        <UserAvatar />
      </View>
      <View className="flex-1 bg-white rounded-t-3xl px-4 py-6">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col gap-5">
            <TextInput
              mode="outlined"
              label="Current Password"
              secureTextEntry={!oldPasswordVisible}
              value={oldPassword}
              onChangeText={setOldPassword}
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
                  icon={oldPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
                />
              }
            />

            <TextInput
              mode="outlined"
              label="New Password"
              secureTextEntry={!newPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize="none"
              textContentType="newPassword"
              autoComplete="password-new"
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
                  icon={newPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setNewPasswordVisible(!newPasswordVisible)}
                />
              }
            />

            <TextInput
              mode="outlined"
              label="Confirm New Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              textContentType="newPassword"
              autoComplete="password-new"
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
              onPress={handleChangePassword}
              containerStyles="mt-4"
            >
              <Text className="text-white text-lg tracking-wide font-sans-medium">
                Change Password
              </Text>
            </CustomButton>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
