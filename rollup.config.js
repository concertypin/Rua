import { createPathTransform } from 'rollup-sourcemap-path-transform';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json' with { type: 'json' };
import json from "@rollup/plugin-json";

const name = packageJson.name;
const sourcemapPathTransform = createPathTransform({
    prefixes: {
        '.': `/${name}/`,
    },
    requirePrefix: true,
})

/**
 * @type {import('rollup').OutputOptions}
 */
const output = {
    format: 'es',
    name: name,
    validate: true,
    file: `dist/${name}.js`,
    sourcemap: "inline",
    sourcemapPathTransform: sourcemapPathTransform
};

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
    input: 'src/main.ts',
    output: [output],
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        json()
    ]

};