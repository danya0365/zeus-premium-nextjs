"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ContactPresenter, ContactViewModel } from "./ContactPresenter";
import { createClientContactPresenter } from "./ContactPresenterClientFactory";

export interface ContactPresenterState {
  viewModel: ContactViewModel | null;
  loading: boolean;
  error: string | null;
}

export function useContactPresenter(
  initialViewModel?: ContactViewModel,
  presenterOverride?: ContactPresenter
): [ContactPresenterState, { loadData: () => Promise<void> }] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientContactPresenter(),
    [presenterOverride]
  );

  const isMountedRef = useRef(true);
  const [viewModel, setViewModel] = useState<ContactViewModel | null>(
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
