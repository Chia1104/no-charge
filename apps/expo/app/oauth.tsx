import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useQuery } from "@tanstack/react-query";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [userInfo, setUserInfo] = useState<any | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      (Constants?.expoConfig?.extra?.androidClientId as string) ?? "",
    iosClientId: (Constants?.expoConfig?.extra?.iosClientId as string) ?? "",
  });

  const { data } = useQuery(["user"], {
    queryFn: () =>
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          Authorization: `Bearer ${response?.authentication?.accessToken}`,
        },
      }),
    enabled: response?.type === "success",
    onSuccess: (data) => {
      setUserInfo(data);
    },
  });

  return (
    <View style={styles.container}>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            void promptAsync();
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
