import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { TRPCProvider } from "../src/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#c9ada7",
            },
          }}
        >
          <Stack.Screen
            name="create"
            options={{
              // Set the presentation mode to modal for our modal route.
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
