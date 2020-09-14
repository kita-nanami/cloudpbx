const { src, dest, watch, lastRun, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sassGlob = require('gulp-sass-glob');
const cleancss = require('gulp-clean-css');
const mqpacker = require('css-mqpacker');
const cssdeclsort = require('css-declaration-sorter');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const paths = {
  html: {
    src: ['./src/ejs/**/*.ejs', '!' + './src/ejs/**/_*.ejs'],
    dest: './dist/',
  },
  styles: {
    src: './src/assets/sass/**/*.scss',
    dest: './dist/assets/css/',
  },
  scripts: {
    src: './src/assets/js/**/*.{js,json}',
    dest: './dist/assets/js/',
  },
  images: {
    src: './src/assets/img/**/*.{jpg,jpeg,png,svg,gif}',
    dest: './dist/assets/img/',
  },
};

function html() {
  return src(paths.html.src)
  .pipe(
    plumber({
      errorHandler: notify.onError('<%= error.message %>'),
    }),
  )
  .pipe(ejs({}, {}, { ext: ".html" }))
  .pipe(rename({ extname: ".html" }))
  .pipe(dest(paths.html.dest));
}
exports.html = html;

function styles() {
  return src(paths.styles.src)
  .pipe(
    plumber({
      errorHandler: notify.onError('<%= error.message %>'),
    }),
  )
  .pipe(sassGlob())
  .pipe(
    sass({
      outputStyle: 'expanded',
    }),
  )
  .pipe(postcss([mqpacker()]))
  .pipe(postcss([cssdeclsort({order: 'smacss'})]))
  .pipe(postcss([autoprefixer({
    "overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 5"],
    cascade: false
    })]),
  )
  .pipe(dest(paths.styles.dest));
}
exports.styles = styles;

function minifycss() {
  return src('./dist/assets/css/**/*.css')
  .pipe(cleancss())
  .pipe(rename({extname: ".min.css"}))
  .pipe(dest(paths.styles.dest));
}
exports.minifycss = minifycss;


function scripts() {
  return src(paths.scripts.src)
  .pipe(
    plumber({
      errorHandler: notify.onError('<%= error.message %>'),
    }),
  )
  .pipe(uglify())
  .pipe(dest(paths.scripts.dest));
}
exports.scripts = scripts;

const imageminOption = [
  pngquant({
    quality: [0.7, 0.85],
  }),
  mozjpeg({
    quality: 85,
  }),
  imagemin.gifsicle(),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo({
    removeViewBox: false,
  }),
];

function images() {
  const lastRunResult = lastRun(images);
  console.log(lastRunResult);
  return src(paths.images.src, { since: lastRunResult })
  .pipe(imagemin(imageminOption))
  .pipe(dest(paths.images.dest));
}
exports.images = images;

const browserSyncOption = {
  port: 8080,
  server: {
    baseDir: './dist/',
    index: 'index.html',
  },
  reloadOnRestart: true,
};
function browsersync(done) {
  browserSync.init(browserSyncOption);
  done();
}
exports.browsersync = browsersync;

function watchFiles(done) {
  const browserReload = () => {
    browserSync.reload();
    done();
  };
  watch(paths.html.src).on('change', series(html, browserReload));
  watch(paths.styles.src).on('change', series(styles, browserReload));
  watch(paths.scripts.src).on('change', series(scripts, browserReload));
  watch(paths.images.src).on('change', series(images, browserReload));
}
exports.watchFiles = watchFiles;


exports.default = series(parallel(html, styles, scripts, images), series(browsersync, watchFiles));