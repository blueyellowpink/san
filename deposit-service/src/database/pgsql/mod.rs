pub mod models;

use diesel::pg::PgConnection;
use diesel::prelude::*;
// use diesel::serialize::Output;
use bigdecimal::BigDecimal;
use dotenv::dotenv;
use std::env;
use std::str::FromStr;

use models::schema::{funding_wallets, spot_wallets};
use models::{FundingWallet, SpotWallet};

pub struct WalletRepo {
    connection: PgConnection,
}

impl WalletRepo {
    pub fn new() -> Self {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        let connection = PgConnection::establish(&database_url)
            .unwrap_or_else(|_| panic!("Error connecting to {}", database_url));

        Self { connection }
    }

    pub fn find_funding_wallet(&mut self, account_id: &str, token: &str) {
        let results: Vec<FundingWallet> = funding_wallets::dsl::funding_wallets
            .filter(funding_wallets::accountId.eq(account_id))
            .filter(funding_wallets::token.eq(token))
            .load(&mut self.connection)
            .expect("Error loading funding wallets");

        for item in results {
            println!("{}", item.token);
            println!("{}", item.amount);
        }
    }

    pub fn find_spot_wallet(&mut self, account_id: &str, token: &str) {
        let results: Vec<SpotWallet> = spot_wallets::dsl::spot_wallets
            .filter(spot_wallets::accountId.eq(account_id))
            .filter(spot_wallets::token.eq(token))
            .load(&mut self.connection)
            .expect("Error loading funding wallets");

        for item in results {
            println!("{}", item.token);
            println!("{}", item.amount);
        }
    }

    pub fn update_funding_wallet(&mut self, account_id: &str, token: &str, amount: &str) {
        let row = funding_wallets::dsl::funding_wallets
            .filter(funding_wallets::accountId.eq(account_id))
            .filter(funding_wallets::token.eq(token));

        if let Ok(updated_row) = diesel::update(row)
            .set(
                funding_wallets::amount
                    .eq(funding_wallets::amount + BigDecimal::from_str(amount).unwrap()),
            )
            .get_result::<FundingWallet>(&mut self.connection)
        {
            println!("{updated_row:?}");
        } else {
            println!("not found");
        }
    }
}
