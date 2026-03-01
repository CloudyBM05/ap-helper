# Security Policy

AP Helper is a student-built, early-stage MVP focused on exploring full-stack development and AI-assisted learning systems. While the project is not a production-grade platform, reasonable security best practices are implemented and continuously improved.

---

## Reporting a Vulnerability

If you discover a potential security issue, please report it privately.

📧 Email: aphelper25@gmail.com

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested mitigation (optional)

Please do not open public GitHub issues for security vulnerabilities.

---

## Implemented Security Measures

The following practices are currently in place:

### Authentication & Authorization
- Firebase Authentication for secure identity management
- Firebase token verification on backend endpoints
- Basic rate limiting on selected API routes

### Data Protection
- HTTPS/TLS encryption in transit
- Environment variable–based secret management
- Input validation using FastAPI and Pydantic models
- CORS configuration for controlled API access

### AI / LLM Considerations
- Basic input validation before sending data to language models
- No permanent storage of sensitive user conversation data
- Ongoing monitoring for prompt-injection patterns

---

## Scope & Limitations

- This project does not currently undergo third-party penetration testing.
- Security updates are handled on a best-effort basis.
- The system is under active development and may change frequently.
- It is not intended for storing highly sensitive personal information.

---

This file exists to encourage responsible disclosure and demonstrate security-aware development practices.
