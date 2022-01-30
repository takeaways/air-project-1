import { useForm } from "react-hook-form";

// Less code
// Better validation
// Better Errors (set, clear , display)
// Have control over inputs
// Dont deal with event
// Easier Inputs

type User = {
  username: string;
  email: string;
  password: string;
};
interface FormState {
  user: User;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      user: {
        username: "",
        email: "",
        password: "",
      },
    },
    mode: "onChange",
  });

  const onSubmit = (formData: FormState) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="flex flex-col justify-between h-20 mb-4">
        <input
          className="flex-1 mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:border-none"
          type="text"
          placeholder="사용자 이름"
          {...register("user.username", {
            minLength: {
              value: 3,
              message: "3 글자 이상이어야 합니다.",
            },
            required: "사용자 이름을 입력해 주세요.",
            validate: {
              onlyHangul: (value: string) => {
                console.log(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(value));

                return (
                  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(value) || "한글만 가능합니다"
                );
              },
            },
          })}
        />
        <p className="h-5 pt-1 text-red-700">
          {errors.user?.username?.message}
        </p>
      </div>
      <div className="flex flex-col justify-between h-20 mb-4">
        <input
          className="flex-1 mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-none"
          type="text"
          placeholder="이메일"
          {...register("user.email", {
            required: "이메일을 입력해 주세요!",
            validate: {
              email: (value: string) => {
                return (
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
                    value,
                  ) || "이메일 형식이 올바르지 않습니다."
                );
              },
            },
          })}
        />
        <p className="h-5 pt-1 text-red-700">{errors.user?.email?.message}</p>
      </div>
      <div className="flex flex-col justify-between h-20 mb-4">
        <input
          className="flex-1 mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-none"
          type="password"
          placeholder="비밀번호"
          {...register("user.password", {
            required: "비밀번호를 입력해 주세요.",
          })}
        />
        <p className="h-5 pt-1 text-red-700">
          {errors.user?.password?.message}
        </p>
      </div>
      <input type="submit" value="Create Account" />
    </form>
  );
}
