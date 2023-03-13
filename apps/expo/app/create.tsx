import { useState, type FC } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import { api } from "../src/utils/api";

const Create: FC = () => {
  const utils = api.useContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
      router.back();
    },
  });

  return (
    <SafeAreaView className="h-full bg-light">
      <Stack.Screen options={{ title: "Modal" }} />
      <View className="mt-4">
        <TextInput
          className="mx-2 mb-2 rounded border border-dark bg-white/10 p-2 text-dark"
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
        {error?.data?.zodError?.fieldErrors.title && (
          <Text className="mx-2 mb-2 text-red-500">
            {error.data.zodError.fieldErrors.title}
          </Text>
        )}
        <TextInput
          className="mx-2 mb-2 rounded border border-dark bg-white/10 p-2 text-dark"
          value={content}
          onChangeText={setContent}
          placeholder="Content"
        />
        {error?.data?.zodError?.fieldErrors.content && (
          <Text className="mx-2 mb-2 text-red-500">
            {error.data.zodError.fieldErrors.content}
          </Text>
        )}
        <TouchableOpacity
          className="mx-2 rounded-full bg-primary p-2"
          onPress={() => {
            mutate({
              title,
              content,
            });
          }}
        >
          <Text className="font-semibold text-white">Create</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Create;
