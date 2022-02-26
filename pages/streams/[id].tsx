import { Stream as StreamType } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import Layout from "components/layout";
import Message from "components/message";

import useMutation from "libs/client/useMutation";
import useUser from "libs/client/useUser";

interface StreamMessage {
  id: number;
  message: string;
  user: {
    avatar: null | string;
    id: number;
  };
}
interface StreamWithMessages extends StreamType {
  messages: StreamMessage[];
}
interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}
interface MessageForm {
  message: string;
}
const Stream: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<MessageForm>();

  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`,
  );
  const onValid = ({ message }: MessageForm) => {
    if (loading) return;
    if (!message) return;
    sendMessage({ message });
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false,
    );
    reset();
  };
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000,
    },
  );

  return (
    <Layout canGoBack>
      <div className="px-4 py-10 space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="block mt-3 text-2xl text-gray-900">
            {data?.stream?.price}
          </span>
          <p className="my-6 text-gray-700 ">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={user?.id === message.user.id}
              />
            ))}
          </div>
          <div className="fixed inset-x-0 bottom-0 py-2 bg-white">
            <form
              className="relative flex items-center w-full max-w-md mx-auto"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className="w-full pr-12 border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:outline-none focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex items-center px-3 text-sm text-white bg-orange-500 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
