use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Kanji {
    pub id: u32,
    pub yomi: String,
    pub hen: String,
    pub tsukuri: String,
    pub kanji: char,
}
