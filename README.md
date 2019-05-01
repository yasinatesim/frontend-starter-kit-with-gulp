# Front End Starter Kit with Gulp

![](https://www.yasinates.com/frontend-starter-kit-with-gulp.jpg)

Front End Starter Kit is an opinionated build automation for front-end web development based on [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/),[Babel](https://babeljs.io/), [Sass](http://sass-lang.com/), and [Pug](https://pugjs.org/).

## Features

- Pug compilation with [gulp-pug](https://www.npmjs.com/package/gulp-pug)
- Tidy Html files with [gulp-prettier](https://www.npmjs.com/package/gulp-prettier)
- Concatinate the Javascript files with [gulp-include](https://www.npmjs.com/package/gulp-include)
- Sass compilation with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- Es6 transpilation with [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- Auto-refresh browser with [browser sync](https://www.npmjs.com/package/browser-sync)
- Minification in production ([Clean CSS](https://www.npmjs.com/package/gulp-clean-css) and [Uglify](https://www.npmjs.com/package/gulp-uglify))
- Autoprefix CSS with [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- Better error messages in gulp with [Plumber](https://www.npmjs.com/package/gulp-plumber)
- Compress images with [Image min](https://www.npmjs.com/package/gulp-imagemin)
- Show compiled file size with [gulp-size](https://www.npmjs.com/package/gulp-size) in development mode
- Output project files in zip file for Themeforest production with [gulp-zip](https://www.npmjs.com/package/gulp-zip)

## Folder Structure

```bash
•
├── src
│   ├── img
│   │   ├── prod
│   │   └── sample
│   ├── js
│   │   ├── base
│   │   ├── components
│   │   ├── layout
│   │   ├── pages
│   │   │   └── _index.js
│   │   ├── vendors
│   │   │   ├── bootstrap.js
│   │   │   ├── color-switcher.js
│   │   │   └── jquery.js
│   │   └── app.js
│   ├── pug
│   │   ├── base
│   │   │   ├── mixins
│   │   │   │   ├── _comments.pug
│   │   │   │   ├── _image.pug
│   │   │   │   ├── _space.pug
│   │   │   │   └── _suffix.pug
│   │   │   ├── variables
│   │   │   │   ├── _global.pug
│   │   │   │   └── _page.pug
│   │   │   ├── _mixins.pug
│   │   │   └── _variables.pug
│   │   ├── components
│   │   └── layout
│   │       ├── includes
│   │       │   ├── _icons.pug
│   │       │   ├── _meta-tags.pug
│   │       │   ├── _scripts.pug
│   │       │   └── _styles.pug
│   │       ├── _footer.pug
│   │       ├── _header.pug
│   │       ├── _sidebar.pug
│   │       └── app.pug
│   └── sass
│       ├── base
│       │   ├── global
│       │   │   ├── _fonts.scss
│       │   │   ├── _normalize.scss
│       │   │   └── _reset.scss
│       │   ├── mixins
│       │   │   ├── _bem.scss
│       │   │   ├── _colors.scss
│       │   │   ├── _fonts.scss
│       │   │   └── _media-queries.scss
│       │   ├── variables
│       │   │   └── _colors.scss
│       │   ├── _global.scss
│       │   ├── _mixins.scss
│       │   └── _variables.scss
│       ├── components
│       ├── layout
│       │   ├── _footer.scss
│       │   ├── _general.scss
│       │   ├── _header.scss
│       │   └── _sidebar.scss
│       ├── pages
│       ├── themes
│       │   ├── blue.scss
│       │   ├── green.scss
│       │   └── red.scss
│       ├── vendors
│       │   ├── bootstrap
│       │   ├── bootstrap-grid.scss
│       │   ├── bootstrap.scss
│       │   └── color-switcher.scss
│       ├── _base.scss
│       ├── _components.scss
│       ├── _layout.scss
│       ├── _pages.scss
│       └── app.scss
├── gulpfile.js
└── package.json
```

Folder Structure Tool: [Tree Generator](https://github.com/x3ro/tree-generator)

## How to use

1. Clone this repository

```bash
git clone https://github.com/yasinatesim/front-end-starter-kit-with-gulp.git
```

2. Update your package.json & gulpfile.js files

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

3.  Install dependencies

```bash
cd my-new-project
npm install
```

4. Develop awesome things

```bash
npm start
```

or

```bash
gulp
```

## CLI

*I don't recommend using it for now, because under the construction*

~~**[create-theme](https://www.npmjs.com/package/create-theme)**~~
