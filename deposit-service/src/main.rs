mod models;

use models::keypair::Keypair;
use mongodb::{
    // bson::{doc, Document},
    options::ClientOptions,
    Client,
};
use std::sync::Arc;

#[tokio::main]
async fn main() {
    let mut client_options =
        ClientOptions::parse("mongodb://localhost:27017/cainance-staging&replicaSet=replicaSet0")
            .await
            .unwrap();
    client_options.app_name = Some("My App".to_string());

    let client = Arc::new(Client::with_options(client_options).unwrap());

    let client_ref: Arc<Client> = Arc::clone(&client);
    let t1 = tokio::spawn(async move {
        for db_name in client_ref.list_database_names(None, None).await.unwrap() {
            println!("{}", db_name);
        }
    });

    let client_ref: Arc<Client> = Arc::clone(&client);
    let t2 = tokio::spawn(async move {
        let db = client_ref.database("cainance-staging");
        for collection_name in db.list_collection_names(None).await.unwrap() {
            println!("{}", collection_name);
        }
    });

    let client_ref: Arc<Client> = Arc::clone(&client);
    let t3 = tokio::spawn(async move {
        let db = client_ref.database("cainance-staging");
        let keypair_collection = db.collection::<Keypair>("keypairs");
        let keypairs = vec![Keypair {
            user_id: "user".to_string(),
            public_key: "public".to_string(),
            private_key: "private".to_string(),
        }];
        keypair_collection
            .insert_many(keypairs, None)
            .await
            .unwrap();
    });

    let _ = tokio::join!(t2, t1, t3);
}
