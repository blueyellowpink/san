use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Keypair {
    pub user_id: String,
    pub public_key: String,
    pub private_key: String,
}
