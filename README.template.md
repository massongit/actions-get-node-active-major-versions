# actions-get-node-active-major-versions

${DESCRIPTION}

For example, it's result is given to `matrix` to test using active Node.js versions.

## Usage

```yaml
on:
  pull_request:
permissions: { }
jobs:
  get-node-active-major-versions:
    runs-on: ubuntu-latest
    outputs:
      versions: ${{steps.get_versions.outputs.versions}}
    steps:
      - id: get_versions
        uses: dev-hato/actions-get-node-active-major-versions@v1
  test:
    runs-on: ubuntu-latest
    needs: get-node-active-major-versions
    strategy:
      matrix:
        node-version: ${{fromJson(needs.get-node-active-major-versions.outputs.versions)}}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
```

## Development

### Config

You install `pre-commit` according to <https://pre-commit.com/>.  
This will check that no credentials are included on commit.
