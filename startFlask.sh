#!/usr/local/bin/ksh


cnt=$(ps -aux | grep flaskLocalhostServer | grep -v grep | awk '{print $2}') | wc -l

echo $cnt

if [$cnt > 0 ]; then
kill $(ps -aux | grep flaskLocalhostServer | grep -v grep | awk '{print $2}')
fi

nohup ./flaskLocalhostServer.py > ./flask.out &

chmod 777 flask.out