create table users
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

alter table users
    owner to admin;

create table roles
(
    name varchar not null,
    id   integer not null
        constraint roles_pk
            primary key
);

alter table roles
    owner to admin;

create table user_to_roles
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

alter table user_to_roles
    owner to admin;

create table nsi_train_types
(
    id   integer not null
        constraint pk_train_types
            primary key,
    name varchar not null
        unique
);

alter table nsi_train_types
    owner to admin;

create table trains
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

alter table trains
    owner to admin;

create table routes
(
    id          integer generated always as identity
        constraint pk_routes
            primary key,
    start       varchar        not null,
    finish      varchar        not null,
    travel_time numeric(18, 2) not null
);

alter table routes
    owner to admin;

create table voyages
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
    start_date  date           not null,
    is_start    boolean,
    ticket_cost numeric(18, 2) not null
);

alter table voyages
    owner to admin;