/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Note: @tmorrow/cre8-react is deliberately NOT a dependency here.
  //
  // Its dependency @tmorrow/cre8-wc ships Vite-specific `?raw` import syntax in
  // its published output (`import svg from '.../add.svg?raw'`). Turbopack and
  // webpack don't understand that query suffix, hand the file to the image
  // loader, and the build fails on "SVG source code does not contain width and
  // height or viewBox". transpilePackages does not help — the syntax is
  // resolved before it applies.
  //
  // Until the library ships bundler-neutral output, live components are loaded
  // from the prebuilt bundle in public/vendor at runtime.
}

export default nextConfig
