use std::sync::{Arc, Mutex};

use axum::{
    Json, Router,
    extract::{State, WebSocketUpgrade, ws::WebSocket},
    http::StatusCode,
    response::Response,
    routing::{get, post},
};
use serde::Deserialize;

#[derive(Clone)]
struct GameState;

#[tokio::main]
async fn main() {
    let app_state = GameState;
    let app_state = Arc::new(Mutex::new(app_state));

    let app = Router::new()
        .route("/", post(receive_answer))
        .route("/websocket/{room_id}", get(websocket_handler))
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}

async fn websocket_handler(ws: WebSocketUpgrade) -> Response {
    ws.on_upgrade(websocket)
}

async fn websocket(_stream: WebSocket) {}

#[derive(Deserialize)]
struct ReceiveAnswerRequest {
    pub _data: String,
}

#[axum::debug_handler]
async fn receive_answer(
    State(_state): State<Arc<Mutex<GameState>>>,
    Json(_request): Json<ReceiveAnswerRequest>,
) -> Result<(), StatusCode> {
    Ok(())
}
