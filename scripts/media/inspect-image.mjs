#!/usr/bin/env node
process.argv.splice(2, 0, "inspect");
await import("./cli.mjs");
