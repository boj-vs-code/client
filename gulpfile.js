"use strict";

var gulp = require("gulp");

gulp.task("move-resources", function() {
  return gulp
    .src(["./src/test/fixtures/**/*", "./src/test/fixtures/**/.*"])
    .pipe(gulp.dest("./out/test/fixtures/"));
});
