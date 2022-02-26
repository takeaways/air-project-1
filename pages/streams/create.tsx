import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "components/button";
import Input from "components/input";
import Layout from "components/layout";
import TextArea from "components/textarea";

import useMutation from "libs/client/useMutation";

interface CreateForm {
  name: string;
  price: string;
  description: string;
}

interface CreateReponse {
  ok: boolean;
  stream: Stream;
}
const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateForm>();

  const [createSteam, { loading, data }] =
    useMutation<CreateReponse>("/api/streams");

  const onValid = (data: CreateForm) => {
    if (loading) return;
    createSteam(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack title="Go Live">
      <form className="px-4 py-10 space-y-4 " onSubmit={handleSubmit(onValid)}>
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="tel"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? "Loading..." : "Go live"} />
      </form>
    </Layout>
  );
};

export default Create;
