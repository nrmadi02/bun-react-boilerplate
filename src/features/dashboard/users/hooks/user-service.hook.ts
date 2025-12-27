import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { api } from "~/lib/api/axios-instance";
import { buildQueryString } from "~/lib/utils";
import type { IBaseResponseList } from "~/types/base-response.type";
import type { IUser } from "../types/users.type";
import type { IUserListParamsRequest } from "../types/users-request.type";

export const userService = {
	list: (params: IUserListParamsRequest) =>
		api.getList<IUser>(`/admin/users${buildQueryString(params)}`),
};

export function useUserList(
	params: IUserListParamsRequest,
	options?: UseQueryOptions<AxiosResponse<IBaseResponseList<IUser>>>,
) {
	const queryUserList = useQuery({
		queryKey: ["users", params],
		queryFn: () => userService.list(params),
		...options,
	});

	return {
		queryUserList,
	};
}
