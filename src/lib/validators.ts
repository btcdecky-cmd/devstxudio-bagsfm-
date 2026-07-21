/**
 * Input validators for Dev Studio
 */

import { ValidationError } from './errors';

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email address');
  }
}

export function validateUsername(username: string): void {
  if (username.length < 3 || username.length > 30) {
    throw new ValidationError('Username must be between 3 and 30 characters');
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    throw new ValidationError('Username can only contain letters, numbers, underscores, and hyphens');
  }
}

export function validateProjectName(name: string): void {
  if (name.length < 3 || name.length > 100) {
    throw new ValidationError('Project name must be between 3 and 100 characters');
  }
}

export function validateProjectDescription(description: string): void {
  if (description.length < 10 || description.length > 500) {
    throw new ValidationError('Description must be between 10 and 500 characters');
  }
}

export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new ValidationError('Invalid URL');
  }
}

export function validateSlug(slug: string): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new ValidationError('Invalid slug format');
  }
}

export function validateTwitterHandle(handle: string): void {
  if (!/^@?[A-Za-z0-9_]{1,15}$/.test(handle)) {
    throw new ValidationError('Invalid Twitter handle');
  }
}

export function validateGithubUsername(username: string): void {
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(username)) {
    throw new ValidationError('Invalid GitHub username');
  }
}

export function validateBio(bio: string): void {
  if (bio.length > 160) {
    throw new ValidationError('Bio must be 160 characters or less');
  }
}
