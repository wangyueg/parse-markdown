import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.es.js",
      format: "es",
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
		{
			file: "dist/index.umd.js",
			format: "umd",
			name: "parseMarkdown",
      globals: {
        marked: "marked"
      }
		}
  ],
  plugins: [typescript()],
};
