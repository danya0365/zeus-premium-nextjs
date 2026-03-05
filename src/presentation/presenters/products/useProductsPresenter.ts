"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductsPresenter, ProductsViewModel } from "./ProductsPresenter";
import { createClientProductsPresenter } from "./ProductsPresenterClientFactory";

export interface ProductsPresenterState {
  viewModel: ProductsViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface ProductsPresenterActions {
  loadData: () => Promise<void>;
}

export function useProductsPresenter(
  initialViewModel?: ProductsViewModel,
  presenterOverride?: ProductsPresenter
): [ProductsPresenterState, ProductsPresenterActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientProductsPresenter(),
    [presenterOverride]
  );

  const isMountedRef = useRef(true);
  const [viewModel, setViewModel] = useState<ProductsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const vm = await presenter.getViewModel();
      if (isMountedRef.current) setViewModel(vm);
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [presenter]);

  useEffect(() => {
    if (!initialViewModel) loadData();
  }, [loadData, initialViewModel]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  return [{ viewModel, loading, error }, { loadData }];
}
