import glsl from 'vite-plugin-glsl';
import solidPlugin from 'vite-plugin-solid';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default {
    build:
    {
        outDir: './dist',
        emptyOutDir: true,
        sourcemap: true,
    },
    plugins:
    [
        glsl(),
        solidPlugin(),
    ],
};