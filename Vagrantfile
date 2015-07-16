hostname = "chat.dev"

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provider :virtualbox do |vb|
      vb.name = hostname
      vb.gui  = false
      vb.customize ["modifyvm", :id, "--memory",              "512"]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1",        "on"]
  end
  config.vm.define hostname, primary: true do |node|
    node.vm.hostname = hostname
    node.vm.network :private_network, ip: "192.168.56.93"
    node.vm.synced_folder "vagrant", "/vagrant", mount_options: ["ro"]
    node.vm.synced_folder "django", "/var/www/chat/django", owner: "www-data", group: "www-data"
    node.vm.provision :shell, path: "vagrant/bootstrap.sh"
  end
end
