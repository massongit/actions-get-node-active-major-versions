#!/usr/bin/env bash

tsc --noEmit
npx esbuild --bundle --platform=node --format=cjs --outdir=dist src/get-version.ts
