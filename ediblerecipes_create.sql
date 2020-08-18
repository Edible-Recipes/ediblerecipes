SET statement_timeout
= 0;
SET lock_timeout
= 0;
SET idle_in_transaction_session_timeout
= 0;
SET client_encoding
= 'UTF8';
SET standard_conforming_strings
= on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies
= false;
SET xmloption
= content;
SET client_min_messages
= warning;
SET row_security
= off;


CREATE TABLE public.users
(
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.recipes
(
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"recipe_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	CONSTRAINT "recipes_pk" PRIMARY KEY ("_id"),
	FOREIGN KEY (user_id) REFERENCES public.users(_id)
)
WITH (
  OIDS=FALSE
);


CREATE TABLE public.ingredients
(
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"user_id" bigint NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("_id"),
	FOREIGN KEY (user_id) REFERENCES public.users(_id)
)
WITH (
  OIDS=FALSE
);

-- CREATE TABLE public.userrecipe (
-- 	"_id" serial NOT NULL,
-- 	"user_id" bigint NOT NULL,
-- 	"recipe_id" bigint NOT NULL,
-- 	CONSTRAINT "userrecipe_pk" PRIMARY KEY ("_id"),
--     FOREIGN KEY ('user_id') REFERENCES public.users('_id')
--     FOREIGN KEY ('recipe_id') REFERENCES public.recipes('_id')
-- ) WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE public.useringredient (
-- 	"_id" serial NOT NULL,
-- 	"user_id" bigint NOT NULL,
-- 	"ingredient_id" bigint NOT NULL,
-- 	CONSTRAINT "useringredient_pk" PRIMARY KEY ("_id"),
--     FOREIGN KEY ('user_id') REFERENCES public.users('_id')
--     FOREIGN KEY ('ingredient_id') REFERENCES public.ingredients('_id')
-- ) WITH (
--   OIDS=FALSE
-- );

    -- FOREIGN KEY (categoryId) 
        -- REFERENCES categories(categoryId)

-- ALTER TABLE public.user ADD CONSTRAINT "users_fk0" FOREIGN KEY ("_id") REFERENCES  public.userrecipe("user_id");
-- ALTER TABLE public.user ADD CONSTRAINT "users_fk1" FOREIGN KEY ("_id") REFERENCES  public.ingredient("user_id");

--SELECT users._id, recipes._id from users INNER JOIN recipes



-- psql -d postgres://nagsauar:3uEIYk1GNWY8XPHcw61ZsQErEvPKtr2d@rajje.db.elephantsql.com:5432/nagsauar -f ediblerecipes_create.sql