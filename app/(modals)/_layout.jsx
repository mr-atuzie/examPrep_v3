import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="examDetails" />
      <Stack.Screen name="examSubjects" />
      <Stack.Screen name="setExamMode" />
      <Stack.Screen name="setExamDuration" />
      <Stack.Screen name="examInfo" />
      <Stack.Screen name="examResult" />
      <Stack.Screen name="leadersboard" />
      <Stack.Screen name="subscriptions" />
      <Stack.Screen name="updatePassword" />
    </Stack>
  );
}
