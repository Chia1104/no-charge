import { type FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api, type RouterOutputs } from "../utils/api";

const ChargeCard: FC<{
  post: RouterOutputs["post"]["all"][number];
  onDelete: () => void;
}> = ({ post, onDelete }) => {
  const router = useRouter();

  return (
    <View className="flex flex-row rounded-lg bg-primary-dark p-4 shadow-md shadow-primary-dark/50">
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
    <SafeAreaView className="bg-light">
      <Stack.Screen options={{ title: "Home" }} />
      <View className="h-full w-full p-4">
        <FlashList
          data={postQuery.data}
          onRefresh={() => void postQuery.refetch()}
          refreshing={postQuery.isFetching}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <ChargeCard
              post={p.item}
              onDelete={() => deletePostMutation.mutate(p.item.id)}
            />
          )}
        />
        <View className="rounded-full bg-primary">
          <Link href="/create" className="p-4">
            Create
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
