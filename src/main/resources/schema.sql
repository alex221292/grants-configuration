CREATE SCHEMA [authorization];
CREATE TABLE [authorization].[operations]
(
    [opr_id]     INT IDENTITY (1, 1) NOT NULL,
    [code]       NVARCHAR(100)       NOT NULL,
    [enabled]    BIT                 NOT NULL DEFAULT 1,
    PRIMARY KEY ([opr_id])
);
CREATE TABLE [authorization].[ranks]
(
    [rank_id]    INT IDENTITY (1, 1) NOT NULL,
    [code]       NVARCHAR(50)        NOT NULL,
    PRIMARY KEY ([rank_id])
);
CREATE TABLE [authorization].[grants]
(
    [grant_id]   INT IDENTITY (1, 1) NOT NULL,
    [rank_id]    INT                 NOT NULL,
    [opr_id]     INT                 NOT NULL,
    PRIMARY KEY ([grant_id])
);
CREATE TABLE [authorization].[attributes]
(
    [atr_id]     INT IDENTITY (1, 1) NOT NULL,
    [grant_id]   INT                 NOT NULL,
    [code]       NVARCHAR(256)       NOT NULL,
    [value]      NVARCHAR(128)       NOT NULL,
    PRIMARY KEY ([atr_id])
);
ALTER TABLE [authorization].[grants]
    ADD FOREIGN KEY ([rank_id])
        REFERENCES [authorization].[ranks] ([rank_id]);
ALTER TABLE [authorization].[grants]
    ADD FOREIGN KEY ([opr_id])
        REFERENCES [authorization].[operations] ([opr_id]);
ALTER TABLE [authorization].[attributes]
    ADD FOREIGN KEY ([grant_id])
        REFERENCES [authorization].[grants] ([grant_id]);