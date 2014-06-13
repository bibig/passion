forever stop app.js
forever start --minUptime 2000 --spinSleepTime 2000 -o ./tmp/out.log -e ./tmp/error.log app.js