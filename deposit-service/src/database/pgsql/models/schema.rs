// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "enum_orders_status"))]
    pub struct EnumOrdersStatus;
}

diesel::table! {
    funding_wallets (id) {
        id -> Int4,
        accountId -> Text,
        token -> Text,
        amount -> Numeric,
        createdAt -> Timestamptz,
        updatedAt -> Timestamptz,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::EnumOrdersStatus;

    orders (id) {
        id -> Int4,
        tradingPair -> Text,
        accountId -> Text,
        initAllowance -> Numeric,
        allowance -> Numeric,
        price -> Numeric,
        initAmount -> Numeric,
        amount -> Numeric,
        orderSide -> Int4,
        orderType -> Int4,
        active -> Bool,
        status -> EnumOrdersStatus,
        createdAt -> Timestamptz,
        updatedAt -> Timestamptz,
    }
}

diesel::table! {
    spot_wallets (id) {
        id -> Int4,
        accountId -> Text,
        token -> Text,
        amount -> Numeric,
        availableAmount -> Numeric,
        inOrderAmount -> Numeric,
        createdAt -> Timestamptz,
        updatedAt -> Timestamptz,
    }
}

diesel::table! {
    trades (id) {
        id -> Int4,
        price -> Numeric,
        executedPrice -> Numeric,
        fee -> Numeric,
        createdAt -> Timestamptz,
        updatedAt -> Timestamptz,
        orderId -> Int4,
    }
}

diesel::joinable!(trades -> orders (orderId));

diesel::allow_tables_to_appear_in_same_query!(funding_wallets, orders, spot_wallets, trades,);
