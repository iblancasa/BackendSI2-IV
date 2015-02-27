#!/bin/bash
ssh-keyscan backendsi2.cloudapp.net >> ~/.ssh/known_hosts;
echo "backendsi2.cloudapp.net ansible_connection=ssh ansible_ssh_user=backendsi2 ansible_ssh_pass=$ANSIBLESSH"> ./travisscripts/ansible_hosts;
export ANSIBLE_HOSTS=./travisscripts/ansible_hosts;
ansible-playbook despliegue.yml;
cat ./travisscripts/ok.txt;
