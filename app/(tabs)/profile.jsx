import {
  Entypo,
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useDispatch } from "react-redux";

import axios from "axios";
import ProfileSkeletonLoader from "../../components/ProfileSkeletonLoader";
import ScreenWrapper from "../../components/ScreenWrapper";
import { COUNTRIES } from "../../constants";
import { getProfileImage } from "../../services/ImageServices";
import { logout } from "../../store/userSlice";

const ProfileOption = ({
  title,
  subtitle,
  iconName,
  iconComponent: IconComponent,
  iconColor,
  delay,
  onPress,
}) => (
  <Animated.View entering={FadeInDown.delay(delay).springify().damping(14)}>
    <TouchableOpacity
      className="flex-row items-center bg-white mb-3 p-4 rounded-2xl shadow-sm"
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-11 h-11 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <IconComponent name={iconName} color={iconColor} size={20} />
        </View>
        <View className="ml-4">
          <Text className="text-gray-800 text-body font-sans-medium">
            {title}
          </Text>
          <Text className="mt-0.5 text-gray-500 text-[14px]">{subtitle}</Text>
        </View>
      </View>
      <Entypo name="chevron-small-right" size={24} color="#9ca3af" />
    </TouchableOpacity>
  </Animated.View>
);

const CountryBottomSheet = ({
  bottomSheetRef,
  snapPoints,
  searchQuery,
  setSearchQuery,
  selectedCountry,
  handleCountrySelect,
  filteredCountries,
}) => {
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        style={[props.style, styles.backdrop]}
        opacity={0.8}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-4 pt-4 pb-2">
          <Text className="font-sans-bold text-2xl text-gray-900 tracking-tight ">
            Select Your Country
          </Text>
          <Text className="font-sans text-sm text-gray-500 text-[14px] mb-6">
            Choose your location for personalized content
          </Text>

          <View className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm mb-4 flex-row items-center">
            <Ionicons name="search" size={18} color="#6B7280" />
            <TextInput
              className="flex-1 font-sans text-gray-800 ml-3 py-1"
              placeholder="Search countries..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <View className="bg-gray-100 rounded-xl p-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  className={`flex-row items-center py-4 px-4 border-b border-gray-100 last:border-b-0 active:bg-gray-100 ${
                    selectedCountry?.code === country.code ? "bg-blue-50" : ""
                  }`}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`,
                    }}
                    style={styles.flagImage}
                    contentFit="cover"
                  />
                  <View className="flex-1">
                    <Text
                      className={`font-sans-medium tracking-wide text-[15px] ${
                        selectedCountry?.code === country.code
                          ? "text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {country.name}
                    </Text>
                    <Text className="font-sans text-gray-500 text-xs ">
                      {country.region || "African"}
                    </Text>
                  </View>
                  {selectedCountry?.code === country.code ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#3B82F6"
                    />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#D1D5DB"
                    />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View className="py-8 items-center justify-center">
                <Ionicons name="search" size={32} color="#9CA3AF" />
                <Text className="font-sans text-gray-500 mt-2">
                  No countries found
                </Text>
              </View>
            )}
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  // const [country, setCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "70%", "90%"], []);

  const filteredCountries = useMemo(
    () =>
      COUNTRIES.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.code.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/user");

        setProfile(data);
        setSelectedCountry(data?.country || null);

        // setProfile()
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.";
        Alert.alert("Error", message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    dispatch(logout());

    router.replace("/");
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel" },
      { text: "Logout", onPress: handleLogout, style: "destructive" },
    ]);
  };

  const handleOptionPress = (routeName) => {
    if (routeName === "logout") return showLogoutAlert();
    if (routeName) router.push(routeName);
  };

  const handleCountrySelect = async (selectedCountry) => {
    setSelectedCountry(selectedCountry);

    try {
      await axios.put("/user/country", {
        country: selectedCountry,
      });

      bottomSheetRef.current?.close();
    } catch (error) {
      const errorMessage = (
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
      ).replace("Error: ", "");

      Alert.alert("Error", errorMessage);
    }
  };

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };

  if (isLoading) {
    return <ProfileSkeletonLoader />;
  }

  return (
    <ScreenWrapper backgroundColor="#1E4B9B" statusBarStyle="light-content">
      <View className="flex-1">
        {/* User Profile Section */}
        <View className="m-4">
          <View className=" items-center mb-2">
            <View style={styles.avatarContainer}>
              <Image
                source={getProfileImage(profile?.image)}
                style={styles.avatar}
                contentFit="cover"
                transition={100}
              />
            </View>
            <View className="items-center">
              <Text className="text-white text-[20px] font-sans-bold">
                {profile?.name}
              </Text>
              <Text className="text-gray-300 text-base">{profile?.email}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(modals)/leadersboard")}
            activeOpacity={0.8}
            className="flex-row items-center bg-white justify-between p-4 rounded-xl shadow-md"
          >
            {/* Points Section */}
            <View className="flex-row items-center gap-3">
              <Ionicons name="trophy" size={50} color="#FFA500" />
              <View>
                <Text className="text-gray-500">Points</Text>
                <Text className="text-blue-600 text-2xl font-extrabold">
                  {profile?.totalPoints}
                </Text>
              </View>
            </View>

            <View className="w-0.5 bg-gray-300 self-stretch mx-2" />

            {/* Ranking Section */}
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="trophy-award"
                size={50}
                color="#7C3AED"
              />
              <View>
                <Text className="text-gray-400">Ranking</Text>
                <Text className="text-blue-600 text-2xl font-extrabold">
                  {profile?.position}

                  {profile?.position === 1
                    ? "st"
                    : profile?.position === 2
                    ? "nd"
                    : profile?.position === 3
                    ? "rd"
                    : "th"}
                </Text>
              </View>
            </View>

            {/* Chevron Icon */}
            <Feather name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Options List */}
        <View className="px-3 flex-1 bg-gray-100 rounded-t-3xl pt-6">
          <ScrollView
            // contentContainerStyle={styles.scrollContent}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <ProfileOption
              title="Edit Profile"
              subtitle="Update your personal info and photo"
              iconName="user-alt"
              iconComponent={FontAwesome5}
              iconColor="#6366f1"
              delay={0}
              onPress={() => handleOptionPress("/(modals)/editProfile")}
            />

            <ProfileOption
              title="Select Your Country"
              subtitle="Choose your country/region"
              iconName="earth-outline"
              iconComponent={Ionicons}
              iconColor="#8b5cf6"
              delay={50}
              onPress={openSheet}
            />

            <ProfileOption
              title="Subscription"
              subtitle="Manage your plan and payments"
              iconName="money-bill-1"
              iconComponent={FontAwesome6}
              iconColor="#10b981"
              delay={100}
              onPress={() => handleOptionPress("/(modals)/subscriptions")}
            />
            {/* 
            <ProfileOption
              title="Settings"
              subtitle="Customize your app preferences"
              iconName="settings"
              iconComponent={Ionicons}
              iconColor="#0ea5e9"
              delay={150}
              onPress={() => handleOptionPress("/(modals)/settings")}
            /> */}

            <ProfileOption
              title="Change your password"
              subtitle="Change your password at any time"
              iconName="lock-closed-outline"
              iconComponent={Ionicons}
              iconColor="#0ea5e9"
              delay={150}
              onPress={() => handleOptionPress("/(modals)/updatePassword")}
            />

            <ProfileOption
              title="Logout"
              subtitle="Sign out of your account"
              iconName="power-off"
              iconComponent={FontAwesome6}
              iconColor="#ef4444"
              delay={200}
              onPress={() => handleOptionPress("logout")}
            />
          </ScrollView>
        </View>

        <CountryBottomSheet
          bottomSheetRef={bottomSheetRef}
          snapPoints={snapPoints}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCountry={selectedCountry}
          handleCountrySelect={handleCountrySelect}
          filteredCountries={filteredCountries}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },
  scrollContent: {
    marginBottom: 200,
  },
  flagImage: {
    width: 24,
    height: 16,
    marginRight: 12,
  },
  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
