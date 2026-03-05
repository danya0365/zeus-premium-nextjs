"use client";

import { useEffect, useState } from "react";
import { SearchViewModel } from "./SearchPresenter";
import { createClientSearchPresenter } from "./SearchPresenterClientFactory";

export function useSearchPresenter() {
  const [query, setQuery] = useState("");
  const [viewModel, setViewModel] = useState<SearchViewModel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    // Debounce the search input
    const handler = setTimeout(async () => {
      if (!query.trim()) {
        setViewModel({ query: "", products: [], projects: [] });
        return;
      }
      
      setLoading(true);
      try {
        const presenter = createClientSearchPresenter();
        const result = await presenter.search(query);
        if (active) {
          setViewModel(result);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        if (active) setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [query]);

  return [{ query, viewModel, loading }, setQuery] as const;
}
