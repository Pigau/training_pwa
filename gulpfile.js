
const gulp = require('gulp'),
    workbox = require('workbox-build'),
    dist = `${__dirname}`;

gulp.task('generate-service-worker', () => {
    return workbox.
        generateSW({
            globDirectory: dist,
            globPatterns: [
                'index.html',
                'pages/fallback.html',
                'js/*.js',
                'css/*.css'
            ],
            runtimeCaching: [
                {
                    urlPattern: new RegExp('(.*\.(js|jpg|png|html)$)|(.*gstatic.com.*)|(.*fonts.googleapis.com.*)'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'test-dynamic-cache',
                        expiration: {
                            maxEntries: 20,
                        }
                    }
                }
            ],
            swDest: `${dist}/sw.js`
        })
        .then(({warnings}) => {
            // In case there are any warnings from workbox-build, log them.
            for (const warning of warnings) {
              console.warn(warning);
            }
            console.info('Service worker generation completed.');
        })
        .catch((error) => {
            console.warn('Service worker generation failed:', error);
        });
});

