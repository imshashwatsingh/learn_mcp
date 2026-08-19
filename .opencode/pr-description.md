---
description: Generate a PR description from the current Git diff
---

Review the current Git changes and generate a concise pull request description.

First inspect:
- git status
- git diff
- relevant changed files

Do not invent changes, tests, or behavior.

Return:

## Summary

A concise summary of the change.

## Changes

Bullet points describing what changed.

## Why

Explain the motivation based only on available repository evidence.

## Testing

List tests that were actually run or clearly state that testing information
could not be determined.

## Notes

Mention important implementation details, risks, or follow-up items.

The result should be ready to paste into a GitHub pull request.