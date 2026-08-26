#!/usr/bin/env node
process.argv.splice(2, 0, "image");
await import("./cli.mjs");
