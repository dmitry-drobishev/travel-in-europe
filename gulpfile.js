// import gulp from 'gulp';
// import plumber from 'gulp-plumber';
// import less from 'gulp-less';
// import postcss from 'gulp-postcss';
// import autoprefixer from 'autoprefixer';
// import csso from 'postcss-csso';
// import rename from 'gulp-rename';
// import htmlmin from 'gulp-htmlmin';
// import terser from 'gulp-terser';
// import squoosh from 'gulp-libsquoosh';
// import svgo from 'gulp-svgmin';
// import svgstore from 'gulp-svgstore';
// import del from 'del';
// import browser from 'browser-sync';

// // Styles

// export const styles = () => {
//   return gulp.src('source/less/style.less', { sourcemaps: true })
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer(),
//       csso()
//     ]))
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
//     .pipe(browser.stream());
// }


// // HTML

// const html = () => {
//   return gulp.src('source/*.html')
//     .pipe(gulp.dest('build'));
// }

// // Scripts

// const scripts = () => {
//   return gulp.src('source/js/script.js')
//     .pipe(gulp.dest('build/js'))
//     .pipe(browser.stream());
// }

// // Images

// const optimizeImages = () => {
//   return gulp.src('source/img/**/*.{png,jpg}')
//     .pipe(squoosh())
//     .pipe(gulp.dest('build/img'))
// }

// const copyImages = () => {
//   return gulp.src('source/img/**/*.{png,jpg}')
//     .pipe(gulp.dest('build/img'))
// }

// // WebP

// const createWebp = () => {
//   return gulp.src('source/img/**/*.{png,jpg}')
//     .pipe(squoosh({
//       webp: {}
//     }))
//     .pipe(gulp.dest('build/img'))
// }

// // SVG

// const svg = () =>
//   gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
//     .pipe(svgo())
//     .pipe(gulp.dest('build/img'));

// const sprite = () => {
//   return gulp.src('source/img/icons/*.svg')
//     .pipe(svgo())
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename('sprite.svg'))
//     .pipe(gulp.dest('build/img'));
// }

// // Copy

// const copy = (done) => {
//   gulp.src([
//     'source/fonts/*.{woff2,woff}',
//     'source/*.ico',
//   ], {
//     base: 'source'
//   })
//     .pipe(gulp.dest('build'))
//   done();
// }


// // Clean

// const clean = () => {
//   return del('build');
// };

// // Server

// const server = (done) => {
//   browser.init({
//     server: {
//       baseDir: 'build'
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }

// // Reload

// const reload = (done) => {
//   browser.reload();
//   done();
// }

// // Watcher

// const watcher = () => {
//   gulp.watch('source/less/**/*.less', gulp.series(styles));
//   gulp.watch('source/js/script.js', gulp.series(scripts));
//   gulp.watch('source/*.html', gulp.series(html, reload));
// }

// // Build

// export const build = gulp.series(
//   clean,
//   copy,
//   optimizeImages,
//   gulp.parallel(
//     styles,
//     html,
//     scripts,
//     svg,
//     sprite,
//     createWebp
//   ),
// );

// // Default


// export default gulp.series(
//   clean,
//   copy,
//   copyImages,
//   gulp.parallel(
//     styles,
//     html,
//     scripts,
//     svg,
//     sprite,
//     createWebp
//   ),
//   gulp.series(
//     server,
//     watcher
//   ));

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require("del");
const svgstore = require("gulp-svgstore");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

// HTMLmin

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(terser())
    .pipe(rename("scripts.min.js"))
    .pipe(gulp.dest("build/js"));
}

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(gulp.dest("build/img"));
}

// Webp

const createWebp = () => {
  return gulp.src(["source/img/**/*.{jpg,png}", "!source/img/background-img/*.{jpg,png}"])
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

// Copy

const copy = (done) => {
  gulp.src([
  "source/fonts/*.{woff2,woff}",
  "source/*.ico",
  "source/img/**/*.svg",
  "!source/img/icons-sprite/*.svg"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
 }

//  Sprite

const sprite = () => {
  return gulp.src("source/img/icons-sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

//  Clean

const clean = () => {
  return del("build");
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

 // Reload

 const reload = done => {
  sync.reload();
  done();
 }

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    sprite
  ),
);

exports.build = build;

//  Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    sprite
  ),
  gulp.series(
    server,
    watcher
  ));
