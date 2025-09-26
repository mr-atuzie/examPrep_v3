import { ScrollView, Text, View } from "react-native";

const Privacy = () => {
  const Section = ({ title, children }) => (
    <View className="mb-8">
      <Text className="text-xl font-poppins-bold text-primary mb-2">
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Effective Date */}
      <View className="bg-primary rounded-xl py-3 px-4 mb-8">
        <Text className="text-white text-center font-sans-medium">
          Effective: September 22, 2025
        </Text>
      </View>
      <Text className="text-2xl font-sans-bold text-center text-primary mb-6">
        ARTECH’S TERMS OF SERVICE
      </Text>
    </ScrollView>
  );
};

export default Privacy;
