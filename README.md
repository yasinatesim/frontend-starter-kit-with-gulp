# Front-End-Starter-Kit-with-Gulp


### Delete unnecessary .txt file in folders please!
### Delete unnecessary "Delete This Command Line" lines in files please!


Front End Starter Kit is an opinionated build automation for front-end web development based on [Gulp](http://gulpjs.com/), [Node](https://nodejs.org/), [NPM](https://www.npmjs.com/),[Babel](https://babeljs.io/), [Sass](http://sass-lang.com/), and [Pug](https://pugjs.org/).

## Dependencies

Run: `npm install`

## Server

Run: `npm start`

## Folder Structure

### Development Directory

	├ Development            
	│    ├ resources ===> In gulpfile.js name can be changed            
	│    │   ├── pug
	│    │   ├── sass
	│    │   │  ├── themes
	│    │   │  │  ├── *.scss ===> For Theme Color Options
	│    │   ├── babel
	│    │   │  ├──  scripts.js => In Command Line "//=require base/_variables.js" inculeded file example...
	│    │   ├── images
	│    │   ├── fonts
	│    │   ├── vendors
	│    ├ gulpfile.js
	
 ### Product folder after gulp is worked
 
    ├ "ThemeName" HTML // In gulpfile.js "ThemeName" const with to capitalize & This Folder Name
    │   ├── assets
    │   │  ├── css
    │   │  │  ├── colors ===> Theme Color Options
    │   │  ├── js
    │   │  ├── img
    │   │  ├── vendors
  
It's that simple...  
