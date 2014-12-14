#!/bin/bash

#Con este script se instalan los paquetes necesarios para ejecutar/instalar el contenedor
#Comprobamos que sea root
if [[ $EUID -ne 0 ]]; then
  echo "Debes ser root para ejecutar este script"
else
  apt-get update
  apt-get install docker.io
  rm /var/run/docker.pid
  docker -d &
  docker pull iblancasa/backendsi2-iv
  sudo docker run -i -t iblancasa/backendsi2-iv /bin/bash -c "ifconfig;nodejs /home"
fi
