sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo cp /etc/fstab /etc/fstab.bak
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

//
replace rebel with your name
volume for wp is relative to location of docker-compose.yml file

//
wp-content should be placed inside ./wp

//
files in setup folder have to be renamed exactly after website url

//
cgi.fix_pathinfo=0 is important to keep to prevent attacks