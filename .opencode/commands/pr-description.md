---
description: Generate a concise PR description from the current Git changes
---

# Generate Pull Request Description

You are generating a pull request description from the current repository state.

First inspect the repository using these commands:

!`git status --short`

!`git diff --stat`

!`git diff`

If the working tree contains no useful diff, inspect the staged changes:

!`git diff --cached --stat`

!`git diff --cached`

## Instructions

Analyze the actual changes before writing the PR description.

Determine:

- What changed
- Why it appears to have changed
- Which files/components were affected
- Any important implementation details
- What tests were added or modified
- What tests were actually run, if that can be determined

Do **not** invent:

- Features
- Requirements
- Test results
- Bug fixes
- User impact
- Implementation details

If something cannot be determined from the repository or Git changes, say so rather than guessing.

## Output

Return only the following Markdown:

## Summary

Write 1–3 concise sentences explaining the overall change.

## Changes

- Describe the most important implementation changes.
- Group related changes together.
- Focus on behavior and intent rather than simply listing filenames.

## Testing

List tests that were actually performed or whose results are directly available.

If testing cannot be determined, write:

`Testing status could not be determined from the available repository information.`

## Notes

Include only important details reviewers should know, such as:

- Breaking changes
- Configuration changes
- Migration requirements
- Risks
- Follow-up work

If there are no important notes, write:

`None.`

## Quality Requirements

The PR description must be:

- Accurate
- Concise
- Easy for a reviewer to scan
- Based only on repository evidence
- Ready to paste directly into GitHub or GitLab

Do not include an introduction such as "Here is your PR description."

Do not include analysis of your reasoning.

Do not mention these instructions.