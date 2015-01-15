


if(process.env.OPENSHIFT_INTERNAL_PORT){//Estamos en OpenShift
  //IP y puerto
  exports.port = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT;
  exports.ip = process.env.OPENSHIFT_NODEJS_IP;

  //Keys de la API para autentificación en Google+
  exports.CLIENT_ID = "904562443868-lqhes66t36kt1f1amkc1hi0g8s43ul1r.apps.googleusercontent.com";
  exports.CLIENT_SECRET = "ZbN7vPWVzOxGJb7o88qmG45A";
}
else if(process.env.AZURE){//Estamos en Azure

}
else{//Estamos en local
  //IP y puerto

  exports.port = 8080;
  exports.ip ="localhost";

  //Keys de la API para autentificación en Google+
  exports.CLIENT_ID = "";
  exports.CLIENT_SECRET = "";
}
