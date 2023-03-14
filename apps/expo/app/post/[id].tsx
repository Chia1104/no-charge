import { type FC } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { SplashScreen, Stack, useSearchParams } from "expo-router";

import { api } from "../../src/utils/api";

const Post: FC = () => {
  let { id } = useSearchParams();
  if (!id) throw new Error("unreachable");
  id = typeof id === "string" ? id : "";
  const { data } = api.post.byId.useQuery({ id });

  if (!data) return <SplashScreen />;

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: data.title }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-white">{data.title}</Text>
        <Text className="py-4 text-white">{data.content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Post;
