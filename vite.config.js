import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/ts/app.tsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
            '@ziggyjs': path.resolve('vendor/tightenco/ziggy/src/js'),
        },
    },
});
