'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api-client';
import type { Project, PaginatedResponse } from '../types';

interface UseProjectsOptions {
  category?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 0,
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.category) params.append('category', options.category);
      if (options.status) params.append('status', options.status);
      if (options.search) params.append('search', options.search);
      if (options.page) params.append('page', options.page.toString());
      if (options.pageSize) params.append('pageSize', options.pageSize.toString());

      const response = await apiClient.get<PaginatedResponse<Project>>(
        `/projects?${params.toString()}`,
      );

      setProjects(response.data);
      setPagination({
        total: response.total,
        page: response.page,
        pageSize: response.page_size,
        totalPages: response.total_pages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    pagination,
    refetch: fetchProjects,
  };
}
