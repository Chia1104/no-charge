import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

import { handleOAuthSignIn } from "../utils/auth";

const Signin = () => {
  const { isLoaded, signIn, setSession } = useSignIn();
  if (!setSession) return null;
  if (!isLoaded) return null;

  return (
    <SafeAreaView className="bg-light">
      <Stack.Screen options={{ title: "Home" }} />
      <View className="h-full w-full p-4">
        <TouchableOpacity
          onPress={() =>
            void handleOAuthSignIn("oauth_google", setSession, signIn)
          }
        >
          <Text className="font-bold uppercase text-pink-400">
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
