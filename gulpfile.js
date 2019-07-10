"use strict";

const gulp = require("gulp");
const del = require("del");

gulp.task("move:resources", function() {
  return gulp
    .src(["./src/test/fixtures/**/*", "./src/test/fixtures/**/.*"])
    .pipe(gulp.dest("./out/test/fixtures/"));
});

gulp.task("clean:problems-cache", function() {
  return del(["./resources/problems/*"]);
});

gulp.task("default", gulp.series("move:resources", "clean:problems-cache"));
