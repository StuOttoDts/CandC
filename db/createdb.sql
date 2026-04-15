CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE inbox (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_rem INT NOT NULL,
    id_des INT NOT NULL,
    content TEXT NOT NULL,
    data DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (id_rem) REFERENCES Users(id),
    FOREIGN KEY (id_des) REFERENCES Users(id)
);

CREATE TABLE publication (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_owner INT NOT NULL,
    data DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (id_owner) REFERENCES Users(id)
);

CREATE TABLE recipes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    publication_id INT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    img_dir TEXT,

    FOREIGN KEY (publication_id) REFERENCES publication(id)
);
CREATE TABLE pub_likes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    publication_id INT NOT NULL,
    user_id INT NOT NULL,
    data DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (publication_id) REFERENCES publication(id),
    FOREIGN KEY (user_id) REFERENCES Users(id),

    UNIQUE (publication_id, user_id)
);