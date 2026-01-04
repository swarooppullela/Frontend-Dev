import { useEffect, useRef, useState } from "react";
import fetchProducts from "../services/fetchProducts";
import { IProductList } from "@/types";

type useFetchResult<T> = {
    data: T | null,
    loading: boolean,
    error: string | null
}

export default function useFetch<T>(url: string): useFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>("");
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!url) return;
        //abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const resp = await fetchProducts<T>(url, controller.signal);
                console.log("hjsdhsd", resp);
                setData(resp);
            } catch (err) {
                setError(err as string);
                throw err;
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            controller?.abort();
        }
    }, [url])
    return {
        data,
        loading,
        error
    }

}
