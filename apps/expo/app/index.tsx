import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api, type RouterOutputs } from "../src/utils/api";

const ChargeCard: React.FC<{
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}> = ({ post, onDelete }) => {
  const router = useRouter();

  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <TouchableOpacity onPress={() => router.push(`/post/${post.id}`)}>
          <Text className="text-xl font-semibold text-pink-400">
            {post.title}
          </Text>
          <Text className="mt-2 text-white">{post.content}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text className="font-bold uppercase text-pink-400">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const Index = () => {
  const postQuery = api.post.all.useQuery();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => postQuery.refetch(),
  });

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Home" }} />
      <View className="h-full w-full p-4">
        <Button
          onPress={() => void postQuery.refetch()}
          title="Refresh"
          color={"#f472b6"}
        />
        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <ChargeCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />
        <View className="rounded-full bg-amber-100">
          <Link href="/modal" className="p-4">
            Create
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
