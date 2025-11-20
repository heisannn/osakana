#[derive(thiserror::Error, Debug)]
pub enum OsakanaError {
    #[error("Serialize Error: {}", .0)]
    SerializeError(serde_json::Error),

    #[error("Failed to send stream: {}", .0)]
    SendStreamError(axum::Error),
}
