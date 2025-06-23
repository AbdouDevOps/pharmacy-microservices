@echo off
setlocal enabledelayedexpansion

for /f %%i in ('docker stack services pharma-stack --format "{{.Name}}"') do (
    echo Scaling down %%i to 0
    docker service scale %%i=0
)
