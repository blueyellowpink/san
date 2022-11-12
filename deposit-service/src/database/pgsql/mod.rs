pub mod models;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

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

    pub fn find_funding_wallet(&mut self) {
        let results: Vec<FundingWallet> = funding_wallets::dsl::funding_wallets
            .filter(funding_wallets::id.eq(1))
            .load(&mut self.connection)
            .expect("Error loading funding wallets");

        for item in results {
            println!("{}", item.token);
            println!("{}", item.amount);
        }
        println!("test");
    }

    pub fn find_spot_wallet(&mut self) {
        let results: Vec<SpotWallet> = spot_wallets::dsl::spot_wallets
            .filter(spot_wallets::id.eq(1))
            .load(&mut self.connection)
            .expect("Error loading funding wallets");

        for item in results {
            println!("{}", item.token);
            println!("{}", item.amount);
        }
        println!("test");
    }
}
