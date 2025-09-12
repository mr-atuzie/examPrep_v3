import { Entypo } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { TextInput } from "react-native-paper";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  getProfileImage,
  uploadFileToCloudinary,
} from "../../services/ImageServices";
import { setUser } from "../../store/userSlice";

const EditProfile = () => {
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          setFullname(userData?.name || "");
          setImage(userData?.image || null);
          setCountry(userData?.country || null);
        }
      } catch (error) {
        console.error("Error reading user data", error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  const handleSubmit = async () => {
    if (!fullname.trim()) {
      Alert.alert("Required", "Please enter your full name");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = image;

      if (image?.uri) {
        const uploadResult = await uploadFileToCloudinary(image, "users");
        if (!uploadResult.success) throw new Error(uploadResult.msg);
        imageUrl = uploadResult.data;
      }

      const { data } = await axios.put("/user/profile", {
        name: fullname,
        image: imageUrl,
        country: country,
      });

      dispatch(
        setUser({
          name: data.name,
          email: data.email,
          image: data.image,
          country: data.country,
        })
      );

      router.replace("/(tabs)/profile");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      Alert.alert("Failed to update profile", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScreenWrapper backgroundColor={"#1E4B9B"} statusBarStyle="light-content">
        <View className="flex-1 bg-white rounded-t-[30px] py-6 px-4">
          <Header
            title="Update Profile"
            leftIcon={<BackButton onPress={() => router.back()} />}
          />

          <View className="flex-col flex-1">
            {/* Profile Picture */}
            <View style={styles.avatarContainer}>
              <Image
                source={getProfileImage(image)}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
              <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
                <Entypo name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>

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

            {/* Submit Button */}
            <View style={styles.footer}>
              <CustomButton
                backgroundColor="#1E4B9B"
                loading={loading}
                onPress={handleSubmit}
              >
                <Text className=" text-white font-sans-medium tracking-wide">
                  Save Changes
                </Text>
              </CustomButton>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 24,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    backgroundColor: "#E5E7EB",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E4B9B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    height: 52,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  countryText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    flex: 1,
  },
  countryPlaceholder: {
    fontSize: 16,
    color: "#9CA3AF",
    marginLeft: 12,
    flex: 1,
  },
  // Bottom Sheet styles
  sheetContent: {
    flex: 1,
    padding: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  flagImage: {
    width: 24,
    height: 16,
    marginRight: 12,
  },
  countryName: {
    fontSize: 16,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  contentContainer: {
    flex: 1,
  },
});

export default EditProfile;
