clownServer
===
This repository contains the server side source code for the CLoWN online presentation project,
which aims to promote the interactivity of online presentation.


### Set up
Prerequisite: node, npm, mongodb.
Clone the release branch, run `npm install` to get required node modules.

### Lauch server
Lauch mongodb with `--auth`, connect by `mongo`, and type:
- use clown
- db.addUser('clown','clown')

or use your specific  configuration and pass them through command line.
See `ctrl/settings.js` to for what parameters to pass. 

Example:
- PORT=3000 HOST=localhost DBUSER=clown DBPWD=clown nohup node bin/www > express-debug.log &


### Build & Test

Use grunt.
Run `grunt production` to concat and uglify javascripts in `public/javascripts`
Run `grunt docgen` to generate jsDoc.
Run `grunt test` to lauch QUnit test.


### Liscence

MIT