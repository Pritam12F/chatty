"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface AxiosConfig {
  baseUrl?: string;
  timeout?: number;
  url?: string;
  headers?: Record<string, string>;
}

export default function useAxios({ url, timeout, headers }: AxiosConfig) {
  const [axiosConfig, setAxiosConfig] = useState<AxiosConfig>(() => ({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout,
    url: "",
    headers: {
      "Content-Type": "application/json",
    },
  }));

  useEffect(() => {
    setAxiosConfig((prev) => {
      let newConfig = { ...prev };

      if (headers) {
        newConfig = {
          ...newConfig,
          headers: {
            ...headers,
          },
        };
      }

      if (timeout) {
        newConfig = { ...newConfig, timeout };
      }

      if (url) {
        newConfig = {
          ...newConfig,
          url,
        };
      }

      return newConfig;
    });
  }, [timeout, url, headers]);

  return { axios: axios.create(axiosConfig) };
}
