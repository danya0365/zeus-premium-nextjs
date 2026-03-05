"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PortfolioPresenter, PortfolioViewModel } from "./PortfolioPresenter";
import { createClientPortfolioPresenter } from "./PortfolioPresenterClientFactory";

export interface PortfolioPresenterState {
  viewModel: PortfolioViewModel | null;
  loading: boolean;
  error: string | null;
}

export function usePortfolioPresenter(
  initialViewModel?: PortfolioViewModel,
  presenterOverride?: PortfolioPresenter
): [PortfolioPresenterState, { loadData: () => Promise<void> }] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientPortfolioPresenter(),
    [presenterOverride]
  );

  const isMountedRef = useRef(true);
  const [viewModel, setViewModel] = useState<PortfolioViewModel | null>(
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
