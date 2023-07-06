start:
	./start.sh

setup:
	./ansible/setup.sh

deploy:
	./ansible/deploy.sh

ssh:
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ProxyCommand="ssh -o StrictHostKeyChecking=no -W %h:%p -q azureuser@`cat ansible/jumpbox_dns` -i ./key.pem" -i ./key.pem azureuser@$(ip) $(commands)

logs:
	$(MAKE) ssh commands="pm2 logs"