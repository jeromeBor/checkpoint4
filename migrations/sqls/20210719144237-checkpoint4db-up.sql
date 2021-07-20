CREATE TABLE tags (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(150) NOT NULL,
PRIMARY KEY (id));

CREATE TABLE drawings (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(250) NOT NULL,
  imageLink VARCHAR(255),
  postContent LONGTEXT NOT NULL,
  dateOfWrite BIGINT NOT NULL,
  tagsId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (tagsId) REFERENCES tags(id));

  
INSERT INTO tags(title) VALUES('Aquarelle'),('Marqueur alcool'),('Digital Painting'),('Autres');

INSERT INTO drawings(title, imageLink, postContent,dateOfWrite,tagsId )
  VALUES
  ("Beyond us !", "https://mir-s3-cdn-cf.behance.net/project_modules/1400/956311106802215.5f9853ad63e0b.jpg", "Dessin fait en aquarelle, une de mes vraies premières aquarelle. J'ai essayé de jouer avec les mélanges des pigments pour avoir des mélanges de couleurs assez spéciaux et des rendus intéréssant. Le résultat à donné un beau ciel de nuit rempli de dégradé !",1626772216, 1),
  ("Floatting Island", "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ed9a05106802215.5f98549a30d0c.jpg", "Un jour j'ai vu des morceaux de terre flottants dans le ciel d'un jeu vidéo, et j'ai trouvé ça superbe. Puis j'ai vu le film 'Le chateau dans le Ciel' de Miazaky, et du coup, je me suis mis à faire mes propes iles flottantes. Je touve que cela dégage une vraie atmosphère de sérénité, de calme et de paix.",1626772216, 4),
  ("Biche imaginaire", "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/38de59106802215.5f98549a2e6fc.jpg", "J'ai un jour entrevu un dessin assez coloré d'animal, et j'ai vite vu que cétait une tendance. Faire des animaux coloré n'est en fait pas si étrange que cela.", 1626772230, 2),
  ("Éléphant", "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/c4fcfd106802215.5f98549a2f6ad.jpg", "J'ai trouvé aimé les éléphants et les animaux et surtout leurs peaux. La fourrure étant très complexe et ennuyeuse à faire, montrer le passage du temps sur une éléphant avec tout ses stries et ses traits est très satisfaisant.", 1626772237,2),
  ("Girafe", "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/4e7abd106802215.5f98549a2eeba.jpg", "Les animaux de la savane sont fascinant et les girafes le sont encoreplus avec leurs tâches improbable et leurs long cou.",1626772290, 2),
  ("Grassland", "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.15752-9/217535748_527580361685275_715762608654414004_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=ae9488&_nc_ohc=FqixNB_69oYAX-JxWgy&_nc_ht=scontent-cdt1-1.xx&oh=f2946fb6e1f0805d151a3d148a8f0949&oe=60FAAB1C", "Exercice de recopie pour m'entrainer d'un artiste qui fait des paysage vraiment très beau et paisaible.",1626772300,1);
  ("Speed Painting", "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.15752-9/217535748_527580361685275_715762608654414004_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=ae9488&_nc_ohc=FqixNB_69oYAX-JxWgy&_nc_ht=scontent-cdt1-1.xx&oh=f2946fb6e1f0805d151a3d148a8f0949&oe=60FAAB1C", "Speed painting produit en 15 min à partir d'une image existante (https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2ac07731362309.564cec6cbe77f.jpg)",1626772350, 3);


