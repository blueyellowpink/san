pub mod schema;

use bigdecimal::BigDecimal;
use diesel::pg::data_types::PgTimestamp;
use diesel::prelude::*;

#[derive(Queryable, Debug)]
pub struct FundingWallet {
    pub id: i32,
    pub account_id: String,
    pub token: String,
    pub amount: BigDecimal,
    pub created_at: PgTimestamp,
    pub updated_at: PgTimestamp,
}

#[derive(Queryable)]
pub struct SpotWallet {
    pub id: i32,
    pub account_id: String,
    pub token: String,
    pub amount: BigDecimal,
    pub available_amount: BigDecimal,
    pub in_order_amount: BigDecimal,
    pub created_at: PgTimestamp,
    pub updated_at: PgTimestamp,
}
