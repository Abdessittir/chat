import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['./frontend/app.tsx', './frontend/signin.tsx', './frontend/signup.tsx'],
  bundle: true,
  outdir: './public/assets',
});

await ctx.watch();

