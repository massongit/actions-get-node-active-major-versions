#!/usr/bin/env bash

tsc --noEmit
esbuild --bundle --platform=node --format=cjs --outdir=dist src/get-version.ts
