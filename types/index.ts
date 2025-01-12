export interface ApiResponse<TData, TError = string> {
	message: string;
	data: TData;
	errors: TError | null;
}
