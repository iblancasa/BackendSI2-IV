#!/bin/bash
#Con este script se instalan los paquetes necesarios para realizar los test
#Comprobamos que sea root
if [[ $EUID -ne 0 ]]; then
  echo "Debes ser root para ejecutar este script"
else
  #Instalación de Mocha
  npm install -g mocha
  npm install mocha
  #Instalación de Chai
  npm install chai
  #Instalación de Supertest
  npm install supertest
fi
