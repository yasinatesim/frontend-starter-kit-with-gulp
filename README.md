
<p align="center">    
<img src="https://yasinates.com/frontend-starter-kit-with-gulp.jpg">    
</p>    
<h2 align="center">Front End Starter Kit with Gulp</h2>

This project is an opinionated build automation for front-end web development based on [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/),[Babel](https://babeljs.io/), [Sass](http://sass-lang.com/), and [Pug](https://pugjs.org/).





### Features

- Pug compilation with [gulp-pug](https://www.npmjs.com/package/gulp-pug)
- Tidy Html files with [gulp-prettier](https://www.npmjs.com/package/gulp-prettier)
- Concatinate the Javascript files with [gulp-include](https://www.npmjs.com/package/gulp-include)
- Sass compilation with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- Es6 transpilation with [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- Auto-refresh browser with [browser sync](https://www.npmjs.com/package/browser-sync)
- Minification ([Clean CSS](https://www.npmjs.com/package/gulp-clean-css) and [Uglify](https://www.npmjs.com/package/gulp-uglify))
- Autoprefix CSS with [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- Better error messages in gulp with [Plumber](https://www.npmjs.com/package/gulp-plumber)
- Compress images with [Image min](https://www.npmjs.com/package/gulp-imagemin)
- Show compiled file size with [gulp-size](https://www.npmjs.com/package/gulp-size) in development mode
- Output project files in zip file for Themeforest production with [gulp-zip](https://www.npmjs.com/package/gulp-zip)


### How to use 



1- Clone this repository

```bash
git clone https://github.com/yasinatesim/front-end-starter-kit-with-gulp.git
```

2- Update the files

**_package.json_**

```json
...
"name": "theme-name-no-space-character-please-using-dash",
"version": "1.0.0"
"documentation": "enter the online dcoumentation url",
"browserlist": "supprted browser list"
...
```

**_gulpfile.js_**

```javascript
...
// for themeforest theme
const  isThemeforestTheme  =  false;
// if production mode is active. -> false: developement mode
const  isProduction  =  false;
// if minified file included in production
const  minifiedFileInclude  =  false;
...
```

3- Install the project dependencies

```bash
cd my-new-project
npm install
```

4- Develop awesome things

```bash
npm start
```

or

```bash
gulp
```
  
### License  
  
[![License](http://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
