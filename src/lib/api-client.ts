/**
 * API client for Dev Studio
 */

import { API } from './constants';
import { DevStudioError } from './errors';
import type { ApiResponse } from './types';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API.BASE) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new DevStudioError(
          error.message || 'API request failed',
          error.code || 'API_ERROR',
          response.status,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof DevStudioError) {
        throw error;
      }
      throw new DevStudioError(
        error instanceof Error ? error.message : 'Network error',
        'NETWORK_ERROR',
        0,
      );
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
