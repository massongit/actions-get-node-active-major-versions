#!/usr/bin/env bash

tsc --noEmit
npx esbuild --bundle --format=cjs --outdir=dist src/get-version.ts
