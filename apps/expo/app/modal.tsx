import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { api } from "../src/utils/api";

const Modal: React.FC = () => {
  const utils = api.useContext();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.post.all.invalidate();
    },
  });

  return (
    <SafeAreaView className="bg-[#1F104A]">
      <Stack.Screen options={{ title: "Modal" }} />
      <View className="mt-4">
        <TextInput
          className="mb-2 rounded bg-white/10 p-2 text-white"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
        {error?.data?.zodError?.fieldErrors.title && (
          <Text className="mb-2 text-red-500">
            {error.data.zodError.fieldErrors.title}
          </Text>
        )}
        <TextInput
          className="mb-2 rounded bg-white/10 p-2 text-white"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={content}
          onChangeText={setContent}
          placeholder="Content"
        />
        {error?.data?.zodError?.fieldErrors.content && (
          <Text className="mb-2 text-red-500">
            {error.data.zodError.fieldErrors.content}
          </Text>
        )}
        <TouchableOpacity
          className="rounded bg-pink-400 p-2"
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

export default Modal;
