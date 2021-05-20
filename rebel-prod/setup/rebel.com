root /opt/rebel;

location = /wp-admin/ {
  return 301 /wp-admin/index.php;
}

location ~* \.(?:ico|css|js|gif|jpe?g|png|svg)$ {
   expires 24h;
   add_header Pragma public;
   add_header Cache-Control "public, must-revalidate, proxy-revalidate";
}

location ~ \.php$ {
    root /var/www/html;
    fastcgi_split_path_info ^(.+?\.php)(/.*)$;
    fastcgi_pass rebel.com-upstream;
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}
