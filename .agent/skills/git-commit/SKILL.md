---
name: git-commit
description: Generate semantic git commit messages based on Conventional Commits, ensure security via .gitignore checks, and suggest version tags.
---

# Git Commit Skill 🛡️

When the user asks to commit changes, follow these strict steps:

## 1. Security & Hygiene Check 🧹
Before generating a message, inspect the staged files (`git status`):
- **Secrets:** Ensure no `.env`, `*.key`, or `credentials.json` files are staged.
- **Bloat:** Ensure no `node_modules/`, `build/`, `.next/`, or system files (`.DS_Store`) are staged.
- **Action:** If suspicious files are found, **STOP** and warn the user to update `.gitignore`.

## 2. Analyze & Classify 🔍
Analyze the `git diff --staged` to determine the change type:
- `feat`: A new feature (e.g., "init project", "add user login").
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Formatting, missing semi-colons, etc; no production code change.
- `refactor`: Refactoring production code, e.g. renaming a variable.
- `test`: Adding missing tests, refactoring tests.
- `chore`: Updating build tasks, package manager configs, Dockerfile, etc.

## 3. Construct Message 📝
Format: `<type>: <description in imperative English>`
- Example: `feat: initialize nextjs app router structure`
- Example: `chore: configure docker multi-stage build`
- **Rule:** Use lowercase for the type. Keep the first line under 50 chars if possible.

## 4. Versioning Check 🏷️
If the commit seems like a major milestone (e.g., "initial commit", "release 1.0", "major refactor"):
- **Suggest:** Ask the user if they want to create a git tag (e.g., `git tag -a v0.1.0 -m "Initial Alpha"`).

## 5. Execution 🚀
- Present the planned commit message.
- Run `git commit -m "..."` only after user approval.