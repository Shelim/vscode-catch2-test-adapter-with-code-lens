# Catch2 and Google Test Explorer for Visual Studio Code (with code lens)

**IMPORTANT: This is fork of original [Catch2 and Google Test Explorer for Visual Studio Code](https://github.com/matepek/vscode-catch2-test-adapter) repo**
I've added ability to present code lens, directly in code:
![screen](https://raw.githubusercontent.com/Shelim/vscode-catch2-test-adapter-with-code-lens/master/screen.png)

**IMPORTANT:**
This only works on Windows with [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage) and compiler able to produce PDB files.

If you cannot met the requirenments, please use original version of this plugin.

**Important:**
This plugin is **not** actively maintained. Use at your own risk. If you wish so, feel free to fork this and update code.

**Below you can find original readme**

---

This extension allows you to run your [Catch2](https://github.com/catchorg/Catch2)
and [Google Test](https://github.com/google/googletest) tests using the
[Test Explorer for VS Code](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer).

## Configuration

| Property                                                                                                                                         | Description                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `catch2TestExplorer.enableCodeLens`                                                                                                              | Set it to true, for the magic to happen                                                                                                                                                                                                                                                                                  |
| `catch2TestExplorer.openCppCoveragePath` | This has to point to the [OpenCppCoverage](https://github.com/OpenCppCoverage/OpenCppCoverage) binary. |
| `catch2TestExplorer.executables`                                                                                                                 | The location of your test executables (relative to the workspace folder or absolute path) and with a lot of other setting. [Details](https://github.com/matepek/vscode-catch2-test-adapter#catch2TestExplorerexecutables)                                                                                                |
| `catch2TestExplorer.defaultCwd`                                                                                                                  | The working directory where the test is run (relative to the workspace folder or absolue path), if it isn't provided in "executables". (It resolves variables.)                                                                                                                                                          |
| `catch2TestExplorer.defaultEnv`                                                                                                                  | Environment variables to be set when running the tests. (It resolves variables.)                                                                                                                                                                                                                                         |
| `catch2TestExplorer.debugConfigTemplate`                                                                                                         | Set the necessary debug configuraitons and the debug button will work. [Details](https://github.com/matepek/vscode-catch2-test-adapter#catch2TestExplorerdebugConfigTemplate)                                                                                                                                            |
| `catch2TestExplorer.debugBreakOnFailure`                                                                                                         | Debugger breaks on failure while debugging the test. Catch2: --break; Google Test: --gtest_break_on_failure;                                                                                                                                                                                                             |
| `catch2TestExplorer.defaultNoThrow`                                                                                                              | Skips all assertions that test that an exception is thrown, e.g. REQUIRE_THROWS. This is a Catch2 parameter: --nothrow                                                                                                                                                                                                   |
| `catch2TestExplorer.defaultRngSeed`                                                                                                              | Shuffles the tests with the given random. Catch2: [--rng-seed (<integer> or 'time')](https://github.com/catchorg/Catch2/blob/master/docs/command-line.md#rng-seed); Google Test: [--gtest_random_seed=<integer>](https://github.com/google/googletest/blob/master/googletest/docs/advanced.md#shuffling-the-tests);      |
| `catch2TestExplorer.defaultWatchTimeoutSec`                                                                                                      | Test executables are being watched (only inside the workspace directory). In case of one recompiles it will try to preserve the test states. If compilation reaches timeout it will drop the suite.                                                                                                                      |
| `catch2TestExplorer.defaultRunningTimeoutSec`                                                                                                    | Test executable is running in a process. In case of an inifinite loop, it will run forever, unless this parameter is set. It applies instantly. (0 means infinite)                                                                                                                                                       |
| `catch2TestExplorer.workerMaxNumber`                                                                                                             | The variable maximize the number of the parallel test execution. It applies instantly.                                                                                                                                                                                                                                   |
| `catch2TestExplorer.enableTestListCaching`                                                                                                       | (Experimental) In case your executable took too much time to list the tests, one can set this. It will preserve the output of `--gtest_list_tests --gtest_output=xml:...`. (Beware: Older Google Test doesn't support xml test list format.) (Click [here](http://bit.ly/2HFcAC6), if you think it is a useful feature!) |
| `catch2TestExplorer.logpanel`                                                                                                                    | Creates a new output channel and write the log messages there. For debugging. Enabling it could slow down your vscode.                                                                                                                                                                                                   |
| `testExplorer.errorDecoration`                                                                                                                   | Show error messages from test failures as decorations in the editor. [Details](https://github.com/hbenl/vscode-test-explorer#configuration)                                                                                                                                                                              |
| `testExplorer.gutterDecoration`                                                                                                                  | Show the state of each test in the editor using Gutter Decorations. [Details](https://github.com/hbenl/vscode-test-explorer#configuration)                                                                                                                                                                               |
| `testExplorer.codeLens`                                                                                                                          | Show a CodeLens above each test or suite for running or debugging the tests. [Details](https://github.com/hbenl/vscode-test-explorer#configuration)                                                                                                                                                                      |
| `testExplorer.onStart`                                                                                                                           | Retire or reset all test states whenever a test run is started. [Details](https://github.com/hbenl/vscode-test-explorer#configuration)                                                                                                                                                                                   |
| `testExplorer.onReload`                                                                                                                          | Retire or reset all test states whenever the test tree is reloaded. [Details](https://github.com/hbenl/vscode-test-explorer#configuration)                                                                                                                                                                               |
| `testExplorer.sort`                                                                                                                              | Sort the tests and suites by label or location. If this is not set (or set to null), they will be shown in the order that they were received from the adapter                                                                                                                                                            |

**Note** that this extension is built upon the Test Explorer
so it's [configuration](https://github.com/hbenl/vscode-test-explorer#configuration)
and [commands](https://github.com/hbenl/vscode-test-explorer#commands) can be used.

### catch2TestExplorer.executables

This variable can be

- a string (ex.: `"out/**/*test.exe"`) or
- an array of strings and objects (ex.: `[ "debug/*test.exe", { "pattern": "release/*test.exe" }, ... ]`).

If it is an object it can contains the following properties:

| Property  | Description                                                                                                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | The name of the test suite (file). Can contains variables related to `pattern`.                                                                                                                       |
| `pattern` | A relative (to workspace directory) or an absolute path or [pattern](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options). ⚠️**Avoid backslash!**: 🚫`\`; ✅`/`; (required) |
| `cwd`     | The current working directory for the test executable. If it isn't provided and `defaultCwd` does, then that will be used. Can contains variables related to `pattern`.                               |
| `env`     | Environment variables for the test executable. If it isn't provided and `defaultEnv` does, then that will be used. Can contains variables related to `pattern`.                                       |

The `pattern` (or the `executables` used as string or an array of strings)
can contains [_search-pattern_](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options).

Test executables and `pattern`s are being watched.
In case of one recompiles it will try to preserve the test states.
If compilation reaches timeout it will drop the suite (`catch2TestExplorer.defaultWatchTimeoutSec`).

**Note** that there is a mechanism which will filter out every possible executable which:

- on windows: NOT ends with `.exe`.
- on other platforms: ends with one of the following:
  `'.c', '.cmake', '.cpp', '.cxx', '.deb', '.dir', '.gz', '.h', '.hpp', '.hxx', '.ko', '.log', '.o', '.php', '.rpm', '.so', '.tar', '.txt'`.

It won't filter out `'.sh'`, `'.py'` (etc.) files, so that could be used for wrappers.

If the pattern is too general like `out/**/*test*`, it could cause unexpected executable or script execution (with `--help` argument)
which would not just increase the test-loading duration but also could have other unexpeced effects.
I suggest to have a stricter file-name convention and a corresponding pattern like `out/**/*.test.*` or `out/**/Test.*`

#### Variables which can be used in `name`, `cwd` and `env` of `executables`:

| Variable                | Description                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${absPath}`            | Absolute path of the test executable                                                                                                                |
| `${relPath}`            | Relative path of the test executable to the workspace folder                                                                                        |
| `${absDirpath}`         | Absolute path of the test executable's parent directory                                                                                             |
| `${relDirpath}`         | Relative path of the test executable's parent directory to the workspace folder                                                                     |
| `${filename}`           | Filename (Path withouth directories; "`d/a.b.c`" => "`a.b.c`")                                                                                      |
| `${baseFilename}`       | Filename without extension ("`d/a.b.c`" => "`a.b`")                                                                                                 |
| `${extFilename}`        | Filename extension. ("`d/a.b.c`" => "`.c`")                                                                                                         |
| `${base2Filename}`      | Filename without second extension ("`d/a.b.c`" => "`a`")                                                                                            |
| `${ext2Filename}`       | Filename's second level extension. ("`d/a.b.c`" => "`.b`")                                                                                          |
| `${base3Filename}`      | Filename without third extension ("`d/a.b.c`" => "`a`")                                                                                             |
| `${ext3Filename}`       | Filename's third level extension. ("`d/a.b.c`" => "")                                                                                               |
| `${workspaceDirectory}` | (You can only guess once.)                                                                                                                          |
| `${workspaceFolder}`    | Alias of `${workspaceDirectory}`                                                                                                                    |
| `${workspaceName}`      | Workspace name can be custom in case of [`workspace file`](https://code.visualstudio.com/docs/editor/multi-root-workspaces#_workspace-file-schema). |
| `${name}`               | The resolved `executables`'s name. Can be used only in `cwd` and `env`.                                                                             |
| `${cwd}`                | The resolved `executables`'s cwd. Can be used only in `env`.                                                                                        |

#### Examples:

```json
"catch2TestExplorer.executables": "dir/test.exe"
```

```json
"catch2TestExplorer.executables": ["dir/test1.exe", "dir/test2.exe"]
```

```json
"catch2TestExplorer.executables": {
	"name": "${filename} (${relDirpath}/)",
	"pattern": "{build,Build,BUILD,out,Out,OUT}/**/*{test,Test,TEST}*",
	"cwd": "${absDirpath}",
	"env": {
		"ExampleENV1": "You can use variables here too, like ${absPath}"
	}
}
```

```json
"catch2TestExplorer.executables": [
	{
		"name": "Test1 suite",
		"pattern": "dir/test.exe"
	},
	"singleTest.exe",
	{
		"pattern": "dir2/{t,T}est",
		"cwd": "out/tmp",
		"env": {}
	}
]
```

### catch2TestExplorer.debugConfigTemplate

If `catch2TestExplorer.debugConfigTemplate` value is `null` (default),
it will look after

1. [`vadimcn.vscode-lldb`](https://github.com/vadimcn/vscode-lldb#quick-start),
2. [`webfreak.debug`](https://github.com/WebFreak001/code-debug),
3. [`ms-vscode.cpptools`](https://github.com/Microsoft/vscode-cpptools)

extensions in order. If it founds one of it, it will use it automatically.
For further details check [VSCode launch config](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations).

**Remark**: This feature to work automatically (value: `null`) has a lot of requirements which are not listed here.
If it works it is good for you.
If it isn't.. I suggest to create your own `"catch2TestExplorer.debugConfigTemplate"` template.
If you read the _Related documents_ and still have a question feel free to open an issue.

#### or user can manually fill it

For [`vadimcn.vscode-lldb`](https://github.com/vadimcn/vscode-lldb#quick-start) add something like this to settings.json:

```json
"catch2TestExplorer.debugConfigTemplate": {
  "type": "cppdbg",
  "MIMode": "lldb",
  "program": "${exec}",
  "args": "${args}",
  "cwd": "${cwd}",
  "env": "${envObj}",
  "externalConsole": false
}
```

#### Usable variables:

| Variable name   | Value meaning                                                        | Type                       |
| --------------- | -------------------------------------------------------------------- | -------------------------- |
| `${label}`      | The name of the test. Same as in the Test Explorer.                  | string                     |
| `${suiteLabel}` | The name of parent suites of the test. Same as in the Test Explorer. | string                     |
| `${exec}`       | The path of the executable.                                          | string                     |
| `${argsArray}`  | The arguments for the executable.                                    | string[]                   |
| `${argsStr}`    | Concatenated arguments for the executable.                           | string                     |
| `${cwd}`        | The current working directory for execution.                         | string                     |
| `${envObj}`     | The environment variables as object properties.                      | { [prop: string]: string } |

These variables will be substituted when a DebugConfiguration is created.

Note that `name` and `request` are filled, if they are undefined, so it is not necessary to set them.
`type` is necessary.

## License

MIT/X11

## Known issues

- (2018-09-03) On windows the navigate to source button isn't working. It is a framework bug.
- (2018-11-17) Catch2: Long (>80 character) filename, test-name or description can cause test-list parsing failures.
  Workaround: `#define CATCH_CONFIG_CONSOLE_WIDTH 300`

For solving issues use: `catch2TestExplorer.logpanel: true` and check the output window.

## TODOs

- Test cases: google test, catch2: info, warn, fail, stdout, stderr, capture, gtest_skip

## [Contribution guideline here](CONTRIBUTING.md)
