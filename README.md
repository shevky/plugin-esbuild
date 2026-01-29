# Shevky Plugin: esbuild

A simple Shevky plugin that runs esbuild during builds and outputs the bundled assets.

## Features

- Bundles `src/js/app.js` into `dist/output.js`
- Uses ESM output targeting `es2018`
- Minifies output when `build.minify` is enabled
- Drops `console` and `debugger` statements in minified builds
- Generates sourcemaps in minified builds

## Installation

```bash
npm i shevky-esbuild
```

## Usage

Add the plugin to your Shevky config:

```json
{
  "plugins": [
    "shevky-esbuild"
  ]
}
```

If you enable `build.minify`, the bundled output is minified, console/debugger statements are dropped, and sourcemaps are generated.

```json
{
  "build": {
    "minify": true
  }
}
```

## License

MIT
