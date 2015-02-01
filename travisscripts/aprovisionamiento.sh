#!/bin/bash
ssh-keyscan backendsi2.cloudapp.net >> ~/.ssh/known_hosts;
echo "backendsi2.cloudapp.net ansible_connection=ssh ansible_ssh_user=backendsi2 ansible_ssh_pass=$ANSIBLESSH"> ./travisscripts/ansible_hosts;
export ANSIBLE_HOSTS=./travisscripts/ansible_hosts;
echo "	
#!/bin/sh
### BEGIN INIT INFO
# Provides:          backendsi2
# Required-Start:    \$local_fs
# Required-Stop:     \$local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# X-Interactive:     false
# Short-Description: Servicio de BackendSI2
# Description:       Inicia/para el backend de mensajería instantánea
### END INIT INFO
NAME=backendsi2
#DAEMON=
do_start()
{
   export DBHOST=$DBHOST; 
   cd /home/backendsi2/BackendSI2-IV;
   nodejs .;
}
do_stop()
{
   killall nodejs;
}
case "\$\1" in
   start)
     do_start
     ;;
   stop)
     do_stop
     ;;
esac
exit 0"> backendsi2;
ansible-playbook aprovisionamiento.yml;
cat ./travisscripts/ok.txt;
