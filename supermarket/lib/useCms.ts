"use client";

import { useState, useEffect } from "react";

export function useCms<T>(url: string | null, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    if (!url) {
      setData(fallback);
      return;
    }
    let cancelled = false;
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled && json != null) setData(json as T);
      })
      .catch(() => {
        if (!cancelled) setData(fallback);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return data;
}
