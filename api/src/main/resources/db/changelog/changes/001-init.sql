--liquibase formatted sql

--changeset ridho:create-table-indicators
create table indicators
(
    id            BIGSERIAL PRIMARY KEY NOT NULL,
    code          VARCHAR(50)           NOT NULL,
    title         VARCHAR(50)           NOT NULL,
    description   TEXT NULL,
    category_id   BIGSERIAL             NOT NULL,
    weight        NUMERIC(5, 2)         NOT NULL,
    created_by    VARCHAR(200) NULL,
    created_date  TIMESTAMP             NOT NULL,
    modified_by   VARCHAR(200) NULL,
    modified_date TIMESTAMP NULL,
    is_deleted    BOOLEAN               NOT NULL DEFAULT FALSE
);

--changeset ridho:create-table-indicator_aspects
create table indicator_aspects
(
    id            BIGSERIAL PRIMARY KEY NOT NULL,
    code          VARCHAR(50)           NOT NULL,
    name          VARCHAR(50)           NOT NULL,
    description   TEXT NULL,
    indicator_id  BIGSERIAL             NOT NULL,
    weight        NUMERIC(5, 2)         NOT NULL,
    created_by    VARCHAR(200) NULL,
    created_date  TIMESTAMP             NOT NULL,
    modified_by   VARCHAR(200) NULL,
    modified_date TIMESTAMP NULL,
    is_deleted    BOOLEAN               NOT NULL DEFAULT FALSE
);

--changeset ridho:create-table-aspect_signals
create table aspect_signals
(
    id              BIGSERIAL PRIMARY KEY NOT NULL,
    code            VARCHAR(50)           NOT NULL,
    name            VARCHAR(50)           NOT NULL,
    signal_key      VARCHAR(20)           NOT NULL,
    confident_level NUMERIC(5, 2)         NOT NULL,
    description     TEXT                  NOT NULL,
    aspect_id       BIGSERIAL             NOT NULL,
    created_by      VARCHAR(200) NULL,
    created_date    TIMESTAMP             NOT NULL,
    modified_by     VARCHAR(200) NULL,
    modified_date   TIMESTAMP NULL,
    is_deleted      BOOLEAN               NOT NULL DEFAULT FALSE
);

--changeset ridho:create-table-indicator_categories
create table indicator_categories
(
    id            BIGSERIAL PRIMARY KEY NOT NULL,
    code          VARCHAR(50)           NOT NULL,
    name          VARCHAR(50)           NOT NULL,
    created_by    VARCHAR(200) NULL,
    created_date  TIMESTAMP             NOT NULL,
    modified_by   VARCHAR(200) NULL,
    modified_date TIMESTAMP NULL,
    is_deleted    BOOLEAN               NOT NULL DEFAULT FALSE
);