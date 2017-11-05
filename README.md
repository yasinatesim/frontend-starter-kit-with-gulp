# Front-End-Starter-Kit-with-Gulp

![Front End Starter Kit With Gulp](https://www.yasinates.com/assets/img/FrontEndStarterKitwithGulp.png)

Front End Starter Kit is an opinionated build automation for front-end web development based on [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/),[Babel](https://babeljs.io/), [Sass](http://sass-lang.com/), and [Pug](https://pugjs.org/).

## Dependencies

Run: `npm install`

## Server

Run: `npm start`

## Folder Structure

### Development Directory

    ├ resources             
    │   ├── pug
    |   |  ├── base
    |   |  |  ├── _variables.pug ==> In "ThemeName": link href="ThemeName"-styles.css and script src="ThemeName"-script.js output...
    │   ├── sass
    |   |  ├── themes
    |   |  |  ├── *.scss ===> For Theme Color Options
    │   ├── babel
    |   |  ├──  scripts.js => Command Line "//=require  base/_variables.js" inculeded file example...
    │   ├── imeges
    │   ├── fonts
    ├ gulpfile.js // In "ThemeName" const: Output Js and Css File Name   
    
 ### Product folder after gulp is worked
 
    ├ "ThemeName" HTML // In "ThemeName" const with to capitalize...   
    │   ├── assets
    |   |  ├── css
    |   |  |  ├── colors ===> Theme Color Options
    |   |  ├── js
    |   |  ├── img

  
  
It's that simple...
Thanks!
  
    
    
