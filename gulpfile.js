import gulp from 'gulp';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';

const { src, dest, task, watch} = gulp;
const bs = browserSync.create();

function scripts() {
  return src([
    `node_modules/swiper/swiper-bundle.js`,
    'src/js/index.js'
  ])
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(dest('dist'))
    .pipe(bs.stream());
}

function watching() {
  watch('src/js/index.js', scripts);
  watch('src/**/*.html').on('change', bs.reload);
}

function serve() {
  bs.init({
    server: {
      baseDir: 'src',
    }
  });

  watching();
}

export {serve, scripts};
export default  gulp.series(scripts, serve);
