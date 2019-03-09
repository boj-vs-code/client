"use strict";

var gulp = require("gulp");

gulp.task("move-resources", function() {
  return gulp
    .src(["./src/test/resources/**/*", "./src/test/resources/**/.*"])
    .pipe(gulp.dest("./out/test/resources/"));
});
