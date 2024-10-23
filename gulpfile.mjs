import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import imagemin from 'gulp-imagemin';
import terser from 'gulp-terser';

const paths = {
    sass: {
      src: 'src/scss/**/*.scss',
      dest: 'dist/css',
    },
    images: {
      src: 'src/images/**/*',
      dest: 'dist/images',
    },
    scripts: {
      src: 'src/js/**/*.js',
      dest: 'dist/js',
    },
  };

  export function compileSass() {
    return gulp.src(paths.sass.src)
    .pipe(gulpSass(sass)({ outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.sass.dest))
  }

  export function compressJs() {
    return gulp.src(paths.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest));
  }

  export function watchFiles() {
    gulp.watch(paths.sass.src, compileSass);
    gulp.watch(paths.images.src, compressImages);
    gulp.watch(paths.scripts.src, compressJs);
  }

  export function compressImages() {
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
  }

  export default gulp.series(gulp.parallel(compileSass, compressImages, compressJs), watchFiles);