# Contributing to Productivity App

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/productivity-app.git
   cd productivity-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   - Copy `.env.example` files in each app
   - Fill in your credentials

4. **Start development servers**
   ```bash
   yarn dev
   ```

## Project Structure

```
productivity-app/
├── apps/
│   ├── web/              # Next.js web app
│   ├── mobile/           # React Native app
│   └── backend/          # Express API
├── packages/
│   ├── shared/           # Shared types & utils
│   ├── api-client/       # GraphQL client
│   └── config/           # Shared config
└── database/             # Database schemas
```

## Coding Standards

### TypeScript
- Use strict mode
- Prefer interfaces over types for objects
- Use enums for fixed sets of values
- Always type function parameters and return values

### React
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Extract custom hooks for reusable logic

### Naming Conventions
- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

### Code Style
- Use Prettier for formatting
- Use ESLint for linting
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Max line length: 100 characters

## Git Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates
- `test/description` - Test additions/updates

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(tasks): add task priority filtering

fix(auth): resolve token refresh issue

docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**
   - Write clear, concise code
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   yarn test
   yarn type-check
   yarn lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

6. **Open a Pull Request**
   - Use the PR template
   - Link related issues
   - Add screenshots for UI changes
   - Request review from maintainers

### PR Review Criteria

Your PR should:
- [ ] Pass all CI checks
- [ ] Include tests for new features
- [ ] Update relevant documentation
- [ ] Follow code style guidelines
- [ ] Have a clear description
- [ ] Reference related issues
- [ ] Be reviewable (< 500 lines)

## Testing Guidelines

### Unit Tests
- Test individual functions and components
- Mock external dependencies
- Aim for 80%+ coverage

### Integration Tests
- Test feature workflows
- Use realistic data
- Test error scenarios

### E2E Tests
- Test critical user flows
- Run on CI before deployment
- Keep tests fast and reliable

### Running Tests
```bash
# Run all tests
yarn test

# Run tests for specific workspace
yarn workspace @productivity-app/web test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

## Documentation

### Code Comments
- Document complex logic
- Explain "why", not "what"
- Use JSDoc for public APIs

### README Updates
- Keep README.md up to date
- Document new features
- Update installation steps

### API Documentation
- Document all API endpoints
- Include request/response examples
- Document error codes

## Database Changes

### Migrations
1. Create new migration file
2. Use sequential numbering
3. Test both up and down migrations
4. Update schema documentation

### Schema Changes
1. Discuss breaking changes first
2. Plan data migration strategy
3. Update GraphQL queries
4. Update TypeScript types

## UI/UX Guidelines

### Design Principles
- **Consistency**: Follow existing patterns
- **Simplicity**: Keep it minimal
- **Feedback**: Provide clear user feedback
- **Accessibility**: Support keyboard navigation

### Mobile Considerations
- Test on multiple screen sizes
- Optimize for touch interactions
- Consider offline functionality
- Minimize bundle size

### Web Considerations
- Responsive design
- Cross-browser testing
- SEO optimization
- Performance optimization

## Performance Guidelines

### Web Performance
- Code splitting
- Lazy loading
- Image optimization
- Minimize bundle size

### Mobile Performance
- Optimize re-renders
- Use FlatList for long lists
- Minimize bridge calls
- Profile with Flipper

### Backend Performance
- Optimize database queries
- Add appropriate indexes
- Implement caching
- Use connection pooling

## Security Guidelines

### Authentication
- Never commit credentials
- Use environment variables
- Implement token refresh
- Validate on server side

### Data Validation
- Validate all inputs
- Sanitize user data
- Use parameterized queries
- Implement rate limiting

### Dependencies
- Keep dependencies updated
- Review security advisories
- Audit with `yarn audit`
- Use lock files

## Getting Help

### Questions?
- Check existing documentation
- Search closed issues
- Ask in discussions
- Join our Discord

### Found a Bug?
- Search existing issues
- Create detailed bug report
- Include reproduction steps
- Add relevant logs/screenshots

### Feature Requests
- Check roadmap first
- Discuss in discussions
- Create detailed proposal
- Consider alternatives

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive experience for everyone.

### Our Standards
- Be respectful and inclusive
- Welcome diverse perspectives
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing private information
- Other unprofessional conduct

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to make this project better! 🎉
