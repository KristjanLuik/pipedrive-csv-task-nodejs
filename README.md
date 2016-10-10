# pipedrive-csv-task-nodejs

Deplyment has been made easy using docker.

To set up project:
```
git clone <url>
```
In The project folder just do:
```
docker-compose up --build
```
After build has finished you need to get you container ip or if your using boot2docker then the ip of you docker-machine:

Getting comtainer IP:
```
docker inspect --format '{{ .NetworkSettings.IPAddress }}' <container IP>
```

Getting docker-machine default IP:
```
docker-machine ip default
```