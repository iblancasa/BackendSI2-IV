#!/bin/bash

ssh-keyscan backendsi2.cloudapp.net >> ~/.ssh/known_hosts;
cat ./travisscripts/ok.txt;
