#!/usr/bin/env node
process.argv.splice(2, 0, "folder");
await import("./cli.mjs");
