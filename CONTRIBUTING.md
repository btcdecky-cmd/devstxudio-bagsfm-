# Contributing to Dev Studio

We love your input! We want to make contributing to Dev Studio as easy and transparent as possible.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, Node version, Bun version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

Please follow these steps for your pull requests:

1. **Fork the repository** and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Make your changes**:
   - Write clear, descriptive code
   - Follow the existing code style
   - Add comments for complex logic
   - Update related documentation

4. **Test your changes**:
   ```bash
   bun typecheck
   bun lint
   bun dev
   ```

5. **Commit your changes** using Conventional Commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

6. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```

7. **Open a Pull Request**:
   - Write a clear title and description
   - Link any related issues
   - Wait for code review

## Styleguides

### Git Commit Messages

- Use the imperative mood ("add" not "added" or "adds")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Use Conventional Commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for formatting
  - `refactor:` for code refactoring
  - `test:` for tests
  - `chore:` for maintenance

Examples:
```
feat: add project filtering by category
fix: resolve TypeScript error in useProjects hook
docs: update API documentation
refactor: simplify error handling middleware
```

### TypeScript/JavaScript Code

- Use TypeScript (strict mode)
- No `any` types - always provide explicit types
- Use const by default, let if reassignment needed
- Use arrow functions for callbacks
- Use descriptive variable names
- Add JSDoc comments for public functions

```typescript
/**
 * Format a date to readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
```

### React Components

- Use functional components with hooks
- Export component as named export
- Add PropTypes or TypeScript interfaces
- Use memo for performance-critical components
- Keep components small and focused

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'default', size = 'md', ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }))} {...props} />
  );
}
```

### CSS/Tailwind

- Use Tailwind utility classes
- Organize styles in `globals.css` for theme
- Use custom CSS for complex animations
- Follow mobile-first approach
- Test responsive behavior

```css
.glass {
  @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg;
}
```

## Development Environment Setup

### Prerequisites

- Node.js 18+ or Bun 1.1+
- Git 2.0+
- VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin

### Local Development

```bash
# Clone repository
git clone https://github.com/btcdecky-cmd/devstxudio-bagsfm-
cd devstxudio-bagsfm-

# Install dependencies
bun install

# Create .env.local
cp .env.example .env.local

# Start development server
bun dev

# Open browser
open http://localhost:3000
```

### Useful Commands

```bash
# Type check
bun typecheck

# Lint
bun lint

# Build
bun build

# Start production server
bun start
```

## Project Structure Understanding

- **`src/app`** - Next.js app routes (pages and API routes)
- **`src/components`** - React components
- **`src/lib`** - Shared utilities, types, and helpers
- **`src/app/globals.css`** - Global styles and theme
- **`tailwind.config.ts`** - Tailwind configuration
- **`tsconfig.json`** - TypeScript configuration

## Questions or Need Help?

- Create a [GitHub Discussion](https://github.com/btcdecky-cmd/devstxudio-bagsfm-/discussions)
- Open an [Issue](https://github.com/btcdecky-cmd/devstxudio-bagsfm-/issues)
- Join our [Discord](https://discord.gg/bagsfm)
- Tweet [@bagsfm](https://twitter.com/bagsfm)

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Dev Studio! 🚀
