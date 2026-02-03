import { io, exec, plugin } from "@shevky/base";

const PLUGIN_NAME = "shevky-esbuild";
const PLUGIN_VERSION = "0.0.2";
const PLUGIN_ROOT = import.meta.dirname ?? process.cwd();

/** @type {import("@shevky/base").PluginHooks} */
const hooks = {
  [plugin.hooks.ASSETS_COPY]: async function (ctx) {
    const projectRoot = io.path.resolve(process.cwd(), ctx.paths.root);
    const sourePath = io.path.resolve(projectRoot, "src", "js", "app.js");
    const distPath = io.path.resolve(projectRoot, "dist", "output.js");

    if (!(await ctx.file.exists(sourePath))) {
      ctx.log.err(
        `[${PLUGIN_NAME}] Skipping JS bundling because the source file is missing at ${sourePath}.`,
      );
      return;
    }

    const args = [
      "esbuild",
      sourePath,
      "--bundle",
      "--format=esm",
      "--target=es2018",
      "--outfile=" + distPath,
    ];

    if (ctx.config.build.minify) {
      args.push("--minify");
      args.push("--drop:debugger");
      args.push("--drop:console");
      args.push("--ignore-annotations");
      args.push("--sourcemap");
    }

    await exec.executeNpx(args, PLUGIN_ROOT);
    ctx.log.debug(`[${PLUGIN_NAME}] ESBuild has been completed.`);
  },
};

const PLUGIN = { name: PLUGIN_NAME, version: PLUGIN_VERSION, hooks };
export default PLUGIN;
