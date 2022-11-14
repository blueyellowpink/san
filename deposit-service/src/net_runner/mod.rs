use ethers::prelude::*;
use std::sync::Arc;

abigen!(
    ERC20,
    r#"[
        event  Transfer(address indexed src, address indexed dst, uint wad)
    ]"#,
);

pub struct NetRunner {
    net: Arc<Provider<Ws>>,
}

impl NetRunner {
    pub async fn new(url: &str) -> Self {
        let net = Provider::<Ws>::connect(url).await.unwrap();
        let net = Arc::new(net);
        Self { net }
    }

    pub async fn watch(&self, contract_address: &str, index: usize) {
        let address = contract_address.parse::<Address>().unwrap();
        let token = ERC20::new(address, Arc::clone(&self.net));

        println!("start {contract_address}");
        tokio::spawn(async move {
            let events = token.events();
            let mut stream = events.stream().await.unwrap();

            loop {
                println!("{index}");
                while let Some(Ok(event)) = stream.next().await {
                    println!(
                        "{index} src: {:?}, dst: {:?}, wad: {:?}",
                        event.src, event.dst, event.wad
                    );
                }
            }
        })
        .await
        .unwrap();
    }
}
