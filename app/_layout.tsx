import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0d2b2b" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "CareerPulse" }} />
      <Stack.Screen name="consent" options={{ title: "Your data" }} />
      <Stack.Screen name="salary" options={{ title: "Salary check" }} />
      <Stack.Screen name="cv" options={{ title: "CV score" }} />
      <Stack.Screen name="jobs" options={{ title: "Job alerts" }} />
      <Stack.Screen name="skills" options={{ title: "Skills gap" }} />
    </Stack>
  );
}
