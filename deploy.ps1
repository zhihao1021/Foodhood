rm -r -fo dist;
npm run build;
ssh root@172.16.2.2 "rm -rf /var/www/foodhood.chih-hao.xyz/html";
scp -r dist root@172.16.2.2:/var/www/foodhood.chih-hao.xyz/html;
ssh root@172.16.2.2 "chmod -R 755 /var/www/foodhood.chih-hao.xyz/html";
