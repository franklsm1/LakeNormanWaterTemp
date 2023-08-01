#!/bin/bash

keepShellRunningWhileNetlifyDevServerIsUp(){
  while true
  do
      echo "Press [CTRL+C] to stop.."
      sleep 60
  done
}

# Whether it was an error or successful keep running
trap keepShellRunningWhileNetlifyDevServerIsUp ERR SIGINT SIGTERM EXIT

source ./build.sh
