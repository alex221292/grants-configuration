CREATE SCHEMA [authorization];
CREATE TABLE [authorization].[sessions]
(
    [session_id]             INT IDENTITY (1, 1) NOT NULL,
    [session_key]            NVARCHAR(36)        NOT NULL,
    [last_activity_datetime] DATETIME            NOT NULL,
    PRIMARY KEY ([session_id]),
    UNIQUE ([session_id])
);
CREATE TABLE [authorization].[operations]
(
    [opr_id]     INT IDENTITY (1, 1) NOT NULL,
    [session_id] INT                 NOT NULL,
    [code]       NVARCHAR(100)       NOT NULL,
    [enabled]    BIT                 NOT NULL DEFAULT 1,
    PRIMARY KEY ([opr_id]),
    UNIQUE ([code], [session_id])
);
CREATE TABLE [authorization].[ranks]
(
    [rank_id]    INT IDENTITY (1, 1) NOT NULL,
    [session_id] INT                 NOT NULL,
    [code]       NVARCHAR(50)        NOT NULL,
    PRIMARY KEY ([rank_id]),
    UNIQUE ([code], [session_id])
);
CREATE TABLE [authorization].[grants]
(
    [grant_id]   INT IDENTITY (1, 1) NOT NULL,
    [rank_id]    INT                 NOT NULL,
    [opr_id]     INT                 NOT NULL,
    [session_id] INT                 NOT NULL,
    PRIMARY KEY ([grant_id]),
    UNIQUE ([rank_id], [opr_id], [session_id])
);
CREATE TABLE [authorization].[attributes]
(
    [atr_id]     INT IDENTITY (1, 1) NOT NULL,
    [grant_id]   INT                 NOT NULL,
    [session_id] INT                 NOT NULL,
    [code]       NVARCHAR(256)       NOT NULL,
    [value]      NVARCHAR(128)       NOT NULL,
    PRIMARY KEY ([atr_id]),
    UNIQUE ([grant_id], [code], [session_id])
);
ALTER TABLE [authorization].[operations]
    ADD FOREIGN KEY ([session_id])
        REFERENCES [authorization].[sessions] ([session_id]);
ALTER TABLE [authorization].[ranks]
    ADD FOREIGN KEY ([session_id])
        REFERENCES [authorization].[sessions] ([session_id]);
ALTER TABLE [authorization].[grants]
    ADD FOREIGN KEY ([session_id])
        REFERENCES [authorization].[sessions] ([session_id]);
ALTER TABLE [authorization].[attributes]
    ADD FOREIGN KEY ([session_id])
        REFERENCES [authorization].[sessions] ([session_id]);