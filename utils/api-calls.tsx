import { useMutation, useQuery } from "@tanstack/react-query";
import { MeDto } from "./api-types";
import { get, post } from "./fetch-factory";
let isLoginEnabled = true;
export const useReadMe = () => {
  return useQuery<MeDto>({
    queryKey: ["me"],
    queryFn: () =>
      get("/proxy/user/me").catch((e) => {
        if (e.status === 401) {
          isLoginEnabled = false;
        }
        return Promise.reject(e);
      }),
    enabled: isLoginEnabled,
  });
};

export const useLoginMutation = () => {
  const {refetch} = useReadMe();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      post("/api/login", data),
    onSuccess: () => {
      isLoginEnabled = true;
        refetch();
    },
    onError: () => {
      isLoginEnabled = false;
    },
  });
};
