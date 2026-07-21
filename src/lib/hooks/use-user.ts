'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api-client';
import type { User } from '../types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<{ data: User }>('/users/me');
      setUser(response.data);
    } catch (err) {
      if (err instanceof Error && err.message !== 'Unauthorized') {
        setError(err.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
    isAuthenticated: !!user,
  };
}
