import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "components/button";
import Input from "components/input";
import Layout from "components/layout";

import useMutation from "libs/client/useMutation";
import useUser from "libs/client/useUser";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formError?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
const EditProfile: NextPage = () => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const avatar = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState("");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      // file -> 메모리에 저장이 됩니다. 메모리에 있는 파일을 읽어 와서 나는 사용하고 싶습니다.
      // 메모리에 있는 이미지를 URL로 만들어서 사용하고 싶습니다.  URL.createObjectURL(file) 를 사용해 줍니다.
      setAvatarPreview(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  }, [avatar]);
  const onValid = ({ email, phone, name, avatar }: EditProfileForm) => {
    console.log(avatar);
    return;
    // if (loading) return;
    // if (!email && !phone && !name) {
    //   setError("formError", {
    //     message:
    //       "Name, Email OR Phone number are required. You need to choose one.",
    //   });
    // }

    // editProfile({
    //   email,
    //   phone,
    //   name,
    // });
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formError", {
        message: data.error,
      });
    }
  }, [data, setError]);

  useEffect(() => {
    user?.email && setValue("email", user.email);
    user?.phone && setValue("phone", user.phone);
    user?.name && setValue("name", user.name);
  }, [setValue, user]);
  return (
    <Layout canGoBack title="Edit Profile">
      <form className="px-4 py-10 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="rounded-full w-14 h-14 bg-slate-500"
            />
          ) : (
            <div className="rounded-full w-14 h-14 bg-slate-500" />
          )}

          <label
            htmlFor="picture"
            className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formError && (
          <span className="block my-2 font-medium text-center text-red-500">
            {errors.formError.message}
          </span>
        )}
        <Button text={loading ? "Loading....." : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
