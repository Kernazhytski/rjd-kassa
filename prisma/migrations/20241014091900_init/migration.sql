create table if not exists users
(
    id           uuid    not null
        constraint id
            primary key,
    name         varchar,
    surname      varchar,
    patronymic   varchar,
    passport_num varchar,
    password     varchar not null,
    login        varchar not null
        unique
);

create table if not exists roles
(
    name varchar not null,
    id   integer not null
        constraint roles_pk
            primary key
);

create table if not exists user_to_roles
(
    id      integer generated by default as identity
        constraint user_to_roles_pk
            primary key,
    user_id uuid    not null
        constraint user_to_roles___fk_uesr
            references users,
    role_id integer not null
        constraint user_to_roles___fk_role
            references roles
);

create table if not exists nsi_train_types
(
    id   integer not null
        constraint pk_train_types
            primary key,
    name varchar not null
        unique
);


create table if not exists trains
(
    id            integer generated always as identity
        constraint pk_trains
            primary key,
    number        varchar not null
        unique,
    model         varchar not null,
    passengers    integer not null,
    train_type_id integer not null
        constraint trains_train_types_pk
            references nsi_train_types
);


create table if not exists routes
(
    id          integer generated always as identity
        constraint pk_routes
            primary key,
    start       varchar        not null,
    finish      varchar        not null,
    travel_time numeric(18, 2) not null
);


create table if not exists voyages
(
    id          integer generated always as identity
        constraint pk_voyages
            primary key,
    route_id    integer        not null
        constraint voyage_route_pk
            references routes,
    train_id    integer        not null
        constraint voyage_train_pk
            references trains,
    start_date  timestamp      not null,
    is_start    boolean,
    ticket_cost numeric(18, 2) not null
);


create table if not exists tickets
(
    id        integer generated always as identity
        constraint pk_ticket_id
            primary key,
    number    uuid    not null,
    user_id   uuid    not null
        constraint tickets_users_id_fk
            references users
            on update cascade on delete cascade,
    voyage_id integer not null
        constraint tickets_voyages_id_fk
            references voyages
            on update cascade on delete cascade
);


INSERT INTO nsi_train_types (id, name)
VALUES (1, 'Международные линии'),
       (2, 'Межрегиональные линии'),
       (3, 'Региональные линии'),
       (4, 'Городские линии');

INSERT INTO routes (start, finish, travel_time)
VALUES ('Minsk', 'Brest', 390),
       ('Minsk', 'Gomel', 360),
       ('Minsk', 'Vitebsk', 170),
       ('Minsk', 'Grodno', 300),
       ('Minsk', 'Lida', 200);

INSERT INTO users (id, name, surname, patronymic, passport_num, password, login)
VALUES ('a4e91c90-265a-4be9-9bd7-c05d8267b7f1', 'Andrei', 'Kernazhytski', 'Uladzimiravich', '1234567890', 'ed83e734c6732561af6ef5694efc8521:5e664c694c8923952e962e49a62f529f', 'test');

INSERT INTO roles (name, id)
VALUES ('ADMIN', 1),
       ('USER', 2);

INSERT INTO user_to_roles (user_id, role_id)
VALUES ('a4e91c90-265a-4be9-9bd7-c05d8267b7f1', 1),
       ('a4e91c90-265a-4be9-9bd7-c05d8267b7f1', 2);