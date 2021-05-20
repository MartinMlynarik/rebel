const mix = require('laravel-mix');
const local = require('./local.json');
const tailwindcss = require('tailwindcss')
require('laravel-mix-versionhash');
require('laravel-mix-purgecss');

mix.setPublicPath('./build');

mix.webpackConfig({
    externals: {
        "jquery": "jQuery",
    }
});

if (local.proxy) {
    mix.browserSync({
        proxy: local.proxy,
        injectChanges: true,
        open: false,
        files: [
            'build/**/*.{css,js}',
            'views/**/*.twig'
        ]
    });
}

mix.js('assets/js/app.js', 'js');
mix.sass('assets/scss/app.scss', 'css')
    .options({
    processCssUrls: false,
    postCss: [
        tailwindcss('tailwind.config.js')
    ],
    })
mix.purgeCss({
    enabled: true,
    content: [
        `./views/**/*.twig`,
        `./scss/**/*.scss`
    ]
});

if (mix.inProduction()) {
    mix.versionHash();
    mix.sourceMaps();
}
