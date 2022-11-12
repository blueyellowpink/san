use std::sync::Arc;

use futures::stream::TryStreamExt;
use mongodb::{
    bson::{doc, Document},
    options::{ClientOptions, FindOptions, Hint},
    Client, Collection,
};

pub struct KeypairRepo {
    collection: Arc<Collection<Document>>,
}

impl KeypairRepo {
    pub async fn new(uri: &str, database: &str) -> Self {
        let mut client_options = ClientOptions::parse(uri).await.unwrap();
        client_options.app_name = Some("My App".to_string());

        let client = Client::with_options(client_options).unwrap();
        let db = client.database(database);
        let collection = Arc::new(db.collection::<Document>("users"));

        Self { collection }
    }

    pub async fn find_keypair(&self, public_key: &str) {
        let collection_ref: Arc<Collection<Document>> = Arc::clone(&self.collection);
        let find_options = FindOptions::builder()
            .projection(doc! { "_id": 1 })
            .limit(1)
            .hint(Hint::Name("keypair.publicKey_1".to_string()))
            .build();
        let filter = doc! { "keypair.publicKey": public_key };

        let task = tokio::spawn(async move {
            let mut cursor = collection_ref.find(filter, find_options).await.unwrap();

            while let Some(document) = cursor.try_next().await.unwrap() {
                println!("{:?}", document.get("_id"));
                println!("{:?}", document);
            }
        });
        task.await.unwrap();
    }
}
