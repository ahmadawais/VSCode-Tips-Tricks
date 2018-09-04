# VSCode: Search & Replace

Let's talk about Search and Replace features of VSCode.

## Search

1. `COMMAND (⌘) + SHIFT (⇧) + F` to open the search view
2. Supports regular expression searching in the search box
3. Toggle Search Details `COMMAND (⌘) + SHIFT (⇧) + J`

In the input box below the search box, you can enter patterns to include or exclude from the search. If you enter example, that will match every folder and file named example in the workspace. If you enter ./example, that will match the folder example/ at the top level of your workspace. Use ! to exclude those patterns from the search. !example will skip searching any folder or file named example. You can also use glob syntax:

- `*` to match one or more characters in a path segment
- `?` to match on one character in a path segment
- `**` to match any number of path segments, including none
- `{}` to group conditions (e.g. {**/*.html,**/*.txt} matches all HTML and text files)
- `[]` to declare a range of characters to match (e.g., example.[0-9] to match on example.0, example.1, …)

## Search and Replace

You can also Search and Replace across files. Expand the Search widget to display the Replace text box.

1. Change the key shortcut to `COMMAND (⌘) + SHIFT (⇧) + R`
2. Replace All || Replace in single file || Dismiss instance/files

> Tip: You can quickly reuse a previous search term by using `↓` and `↑` to navigate through your search term history.
