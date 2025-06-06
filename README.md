# actions-get-node-active-major-versions

GitHub Actions to get Node.js LTS and maintenance major versions.

Node.js version data is got from <https://github.com/nodejs/Release/blob/main/schedule.json>.

For example, it's result is given to `matrix` to test using active Node.js versions.

## Example

```yaml
on:
  pull_request:
permissions: {}
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
        # Apply Node.js versions to matrix
        node-version: ${{fromJson(needs.get-node-active-major-versions.outputs.versions)}}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm run test
```

## Development

### Config

You install `pre-commit` according to <https://pre-commit.com/>.  
This will check that no credentials are included on commit.
