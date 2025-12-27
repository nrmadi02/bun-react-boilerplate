export interface IBaseResponse<T> {
	data: T;
	success: boolean;
	message: string;
}

export interface IBaseResponseList<T> {
	data: {
		list: T;
		meta: {
			currentPage: number;
			isFirstPage: boolean;
			isLastPage: boolean;
			previousPage: number;
			nextPage: number;
			pageCount: number;
			totalCount: number;
		};
	};
	success: boolean;
	message: string;
}
