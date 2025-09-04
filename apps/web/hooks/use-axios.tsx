"use client";

import { useMemo } from "react";
import axios, { AxiosInstance } from "axios";

interface AxiosConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export default function useAxios({ baseUrl, timeout, headers }: AxiosConfig) {
  const instance: AxiosInstance = useMemo(() => {
    return axios.create({
      baseURL: baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL,
      timeout: timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }, [baseUrl, timeout, headers]);

  return { instance };
}
