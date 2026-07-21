'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api-client';
import type { FeedEvent, PaginatedResponse } from '../types';

export function useFeed(limit: number = 50) {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<PaginatedResponse<FeedEvent>>(
        `/feed?limit=${limit}`,
      );

      setEvents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feed');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeed();

    // Poll for new events every 30 seconds
    const interval = setInterval(fetchFeed, 30000);
    return () => clearInterval(interval);
  }, [fetchFeed]);

  return {
    events,
    loading,
    error,
    refetch: fetchFeed,
  };
}
