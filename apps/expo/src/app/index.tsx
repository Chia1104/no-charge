import { type FC } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

import { api, type RouterOutputs } from "../utils/api";

const ChargeCard: FC<{
  subs: RouterOutputs["subscription"]["getAll"][number];
  onDelete?: () => void;
}> = ({ subs, onDelete }) => {
  return (
    <View className="flex flex-row rounded-lg bg-primary-dark p-4 shadow-md shadow-primary-dark/50">
      <View className="flex-grow">
        <TouchableOpacity onPress={() => null}>
          <Text className="text-xl font-semibold text-pink-400">
            {subs.provider}
          </Text>
          <Text className="mt-2 text-white">{subs.description}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text className="font-bold uppercase text-pink-400">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          void signOut();
        }}
      />
    </View>
  );
};

const Index = () => {
  const { data, refetch, isFetching } = api.subscription.getAll.useQuery();

  return (
    <SafeAreaView className="bg-light">
      <Stack.Screen options={{ title: "Home" }} />
      <View className="h-full w-full p-4">
        <SignedIn>
          <FlashList
            data={data}
            onRefresh={() => void refetch()}
            refreshing={isFetching}
            estimatedItemSize={20}
            ItemSeparatorComponent={() => <View className="h-2" />}
            renderItem={(s) => <ChargeCard subs={s.item} />}
          />
          <SignOut />
        </SignedIn>
        <SignedOut>
          <Link href="/signin">
            <Text className="font-bold uppercase text-pink-400">Sign in</Text>
          </Link>
        </SignedOut>
      </View>
    </SafeAreaView>
  );
};

export default Index;
