mod database;
mod net_runner;

use database::pgsql::WalletRepo;

#[tokio::main]
async fn main() {
    /* let keypair_repo = KeypairRepo::new(
        "mongodb://localhost:27017/cainance-staging?replicaSet=replicaSet0",
        "cainance-staging",
    )
    .await; */

    /* keypair_repo
    .find_keypair("5oDkmZ3orb6y1Ft4GFxwUfkcy5S7d8fKHMamVZkm6QDM")
    .await; */

    /* let tokens = vec![
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    ];

    let net_runner =
        NetRunner::new("wss://mainnet.infura.io/ws/v3/780c53da77ce40e991814c8ad87dbe7d").await;
    let net_runner = Arc::new(net_runner);

    let mut index = 0;
    let mut tasks = vec![];
    for token in tokens {
        let net_runner_ref = Arc::clone(&net_runner);
        tasks.push(tokio::spawn(async move {
            net_runner_ref.watch(token, index).await;
        }));
        index += 1;
    }

    for task in tasks {
        task.await;
    } */

    let mut wallet_repo = WalletRepo::new();
    // wallet_repo.find_funding_wallet("636a948d18c2540f6f06c475", "BNB");
    // wallet_repo.find_spot_wallet("636a948d18c2540f6f06c475", "USDT");
    wallet_repo.update_funding_wallet("636a948d18c2540f6f06c475", "DOT", "1000.0");
}
