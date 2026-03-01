# Contributing to AP Helper

Thank you for your interest in contributing to AP Helper! This document provides guidelines for contributing to this educational platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- OpenAI API Key (for GPT-4 integration)
- Google Gemini API Key (for alternative LLM)
- Firebase Project (for authentication)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ap-helper.git
   cd ap-helper
   ```

2. **Install dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   # Frontend (.env)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_API_BASE_URL=http://localhost:8000
   
   # Backend (.env)
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start development servers**
   ```bash
   # Frontend
   npm run dev
   
   # Backend (in another terminal)
   python grader_api.py
   ```

## 📋 How to Contribute

### Reporting Issues
- Use the [GitHub Issues](https://github.com/your-username/ap-helper/issues) page
- Provide clear descriptions and steps to reproduce
- Include screenshots for UI issues
- Label issues appropriately (bug, enhancement, documentation, etc.)

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards below
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run lint
   npm run test
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature description"
   ```

6. **Push to your fork and submit a pull request**

### Pull Request Guidelines
- Provide a clear description of changes
- Reference related issues using `Fixes #123` or `Closes #123`
- Include screenshots for UI changes
- Ensure all checks pass
- Request review from maintainers

## 💻 Coding Standards

### Frontend (React/TypeScript)
- Use TypeScript for all new code
- Follow React functional components with hooks
- Use meaningful component and variable names
- Implement responsive design principles
- Add proper TypeScript types and interfaces

### Backend (Python)
- Follow PEP 8 style guidelines
- Use type hints for function parameters and returns
- Add docstrings for all functions and classes
- Implement proper error handling
- Write unit tests for new endpoints

### General Guidelines
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Use consistent naming conventions
- Ensure cross-platform compatibility

## 🧪 Testing

### Frontend Tests
```bash
npm run test           # Run unit tests
npm run test:coverage  # Run with coverage report
```

### Backend Tests
```bash
python -m pytest tests/           # Run all tests
python -m pytest tests/ -v        # Verbose output
python -m pytest tests/ --cov     # With coverage
```

### Integration Tests
- Test AI endpoints with mock responses
- Verify authentication flows
- Check database operations
- Validate API response formats

## 📚 Adding Educational Content

### Study Guides
1. Create content following AP course standards
2. Include visual elements and interactive components
3. Add practice questions with explanations
4. Ensure accessibility compliance

### Practice Exams
1. Follow official AP exam format
2. Include timer functionality
3. Provide detailed answer explanations
4. Add performance analytics

### Socratic AI Integration
1. Write clear, educational prompts
2. Test with various difficulty levels
3. Ensure appropriate hint progression
4. Validate educational effectiveness

## 🔧 Development Tools

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- Python extension
- Prettier - Code formatter
- ESLint
- GitLens

### Useful Commands
```bash
# Code formatting
npm run format         # Frontend formatting
black .               # Python formatting

# Linting
npm run lint          # Frontend linting
pylint **/*.py        # Python linting

# Build and deployment
npm run build         # Production build
docker build -t ap-helper .  # Docker build
```

## 📖 Documentation

### Code Documentation
- Add JSDoc comments for TypeScript functions
- Include Python docstrings following Google style
- Document API endpoints with examples
- Update README.md for major changes

### User Documentation
- Create user guides for new features
- Add screenshots and examples
- Keep documentation up-to-date
- Ensure clarity for non-technical users

## 🎯 Subject Matter Guidelines

### Accuracy Requirements
- Verify all educational content with official AP resources
- Cross-reference with multiple authoritative sources
- Include citations where appropriate
- Review content with subject matter experts

### Pedagogical Standards
- Follow evidence-based teaching practices
- Ensure inclusive and accessible content
- Support diverse learning styles
- Maintain appropriate difficulty progression

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn and contribute
- Focus on educational impact

### Communication
- Use clear, professional language
- Be patient with questions and discussions
- Share knowledge and learning resources
- Celebrate contributions and achievements

## 📞 Getting Help

### Resources
- [Documentation](docs/)
- [GitHub Issues](https://github.com/your-username/ap-helper/issues)
- [Development Setup Guide](docs/setup.md)
- [API Documentation](docs/api.md)

### Contact
- **Project Maintainer**: Brandon
- **Email**: brandon@aphelper.dev
- **Discussion Forum**: GitHub Discussions

---

Thank you for contributing to making quality education more accessible through technology! 🚀📚
