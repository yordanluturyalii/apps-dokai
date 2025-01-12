import axios, {
	type AxiosInstance,
	type AxiosError,
	type AxiosResponse,
	AxiosRequestHeaders,
	RawAxiosRequestHeaders,
} from "axios";
import { useEffect, useState } from "react";

type FetchDataParams = {
	uri: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	data?: Record<string, unknown>;
	params?: Record<string, unknown>;
	headers?: RawAxiosRequestHeaders;
};

type UseApiReturn<T> = {
	data: T | null;
	error: string | null;
	isLoading: boolean;
	fetchData: (args: FetchDataParams) => Promise<void>;
};

export const useApi = <T = unknown>(): UseApiReturn<T> => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const axiosInstance: AxiosInstance = axios.create({
		baseURL: "https://staging-dinacom.akmalmuhammadp.my.id/api",
		timeout: 10000,
		headers: {
			"Content-Type": "application/json",
		}
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			return config;
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		},
	);

	axiosInstance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		},
	);

	let controller: AbortController = new AbortController();

	useEffect(() => {
		return () => controller.abort();
	}, []);

	const fetchData = async ({
		uri,
		method,
		data = {},
		params = {},
		headers,
	}: FetchDataParams): Promise<void> => {
		setIsLoading(true);

		controller.abort();
		controller = new AbortController();

		try {
			const result: AxiosResponse<T> = await axiosInstance({
				url: uri,
				method: method,
				data: data,
				params: params,
				signal: controller.signal,
				headers: {
					...axiosInstance.defaults.headers.common,
					...headers,
				},
			});
			setData(result.data);
			setError(null);
		} catch (err: unknown) {
			if (axios.isCancel(err)) {
				console.error("Request cancelled", (err as Error).message);
			} else if (axios.isAxiosError(err)) {
				const axiosError = err as AxiosError;
				try {
					const errorResponse =
						typeof axiosError.response?.data === "string"
							? JSON.parse(axiosError.response.data)
							: axiosError.response?.data;

					setError(errorResponse?.message || "An unknown error occurred.");
				} catch (parseError) {
					setError(axiosError.message || "An unknown error occurred.");
				}
			} else {
				const genericError = err as Error;
				setError(genericError.message || "An unknown error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { data, error, isLoading, fetchData };
};
