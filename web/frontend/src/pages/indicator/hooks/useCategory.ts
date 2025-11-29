import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import type { ICategoryResponse } from "../types/CategoryResponse"

export const useCategory = () => {
  const [keyword, setKeyword] = useState<string>()
  const queryKey = ["category", { keyword }]

  const onSearchKeyword = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, 300)

  const [category, setCategory] = useState<{ label: string; value: string, color?: string } | undefined>();

  const { data, isLoading, refetch } = useQuery<ICategoryResponse>({
    queryKey,
    // queryFn: () => MovementTracking.getAllCategory(keyword),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    // gcTime: 0
  })

  // Build floor options (pure function, no setState here)
  const categoryData = useMemo(() => {
    const values = data?.result ?? [];
    if (values.length === 0) return []; // return empty if API gives nothing

    return [
      { label: "All Category", value: "-" },
      ...values.map((e) => ({
        value: e.code ?? "",
        label: e.name ?? "",
        color: e.color ?? "",
      })),
    ];
  }, [data]);

  // Sync floor state with available data
  useEffect(() => {
    if (categoryData.length === 0) {
      setCategory(undefined);
    } else if (!category) {
      // set default only if none is selected
      setCategory(categoryData[0]); // defaults to "All Category"
    }
  }, [categoryData, category]);

  const setDataCategory = (value: string) => {
    const selected = categoryData.find((option) => option.value === value);
    if (selected) {
      setCategory(selected);
    }
  };

  return {
    category,
    categoryData,
    isLoading,
    refetch,
    onSearchKeyword,
    setDataCategory
  }
}