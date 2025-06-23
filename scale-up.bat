@echo off
setlocal enabledelayedexpansion

for /f %%i in ('docker stack services pharma-stack --format "{{.Name}}"') do (
    echo Scaling up %%i to 3
    docker service scale %%i=3
)
