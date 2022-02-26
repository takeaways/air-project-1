import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "components/button";
import Layout from "components/layout";
import TextArea from "components/textarea";

import useCoords from "libs/client/useCoords";
import useMutation from "libs/client/useMutation";

interface WriteForm {
  question: string;
}
interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();

  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();

  const [post, { loading, data }] = useMutation<WriteResponse>(`/api/posts`);
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data?.ok, data?.post.id, router]);
  return (
    <Layout canGoBack title="Write Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="질문하기!"
        />
        <Button text={loading ? "등록중" : "질문등록"} />
      </form>
    </Layout>
  );
};

export default Write;
