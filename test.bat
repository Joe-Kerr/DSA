cls
if [%1]==[] call build.bat
node ./node_modules/mocha/bin/mocha --ui qunit --recursive tests/unit/**/*.js

PAUSE