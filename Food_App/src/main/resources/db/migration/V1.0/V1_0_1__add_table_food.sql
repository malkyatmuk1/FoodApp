create table food(
                     food_id int not null AUTO_INCREMENT,
                     description varchar(4000) not null,
                     kcal int not null,
                     protein int not null,
                     fat int not null,
                     carbs int not null,
                     constraint PK_Food primary key (food_id)
);
