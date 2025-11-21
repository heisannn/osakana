use axum::{
    Router,
    extract::{State, WebSocketUpgrade, ws::WebSocket},
    routing::{get, post},
};
use serde::Serialize;
use std::sync::Arc;
use tokio::sync::Mutex;

mod domain;
mod error;
mod model;

use crate::{
    domain::{
        mobile::receive_answer, ranking::register_ranking, screen::handle_screen, user::create_user,
    },
    model::{Kanji, User},
};

#[derive(Debug, Clone, Serialize)]
struct Question {
    index: i32,
    kanji: Kanji,
    is_solved: bool,
}

#[derive(Clone, Default)]
pub struct GameState {
    all_questions: Vec<Question>,
    current_questions: Vec<Question>,
    participants: Vec<User>,
    ranking: Vec<User>,
}

pub type SharedGameState = Arc<Mutex<GameState>>;

impl GameState {
    fn new() -> Self {
        GameState::default()
    }

    fn judge(&self, question_id: usize, kanji_id: u32) -> bool {
        self.current_questions
            .get(question_id)
            .map(|v| v.kanji.id == kanji_id)
            .unwrap_or(false)
    }
}

#[tokio::main]
async fn main() {
    let app_state = GameState::new();
    let app_state = Arc::new(Mutex::new(app_state));

    let app = Router::new()
        .route("/register_ranking", post(register_ranking))
        .route("/user", post(create_user))
        .route("/answer", post(receive_answer))
        .route("/websocket", get(websocket_handler))
        .with_state(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}

async fn websocket_handler(
    ws: WebSocketUpgrade,
    State(game_state): State<SharedGameState>,
) -> axum::response::Response {
    ws.on_upgrade(|stream| websocket(stream, game_state))
}

async fn websocket(mut stream: WebSocket, game_state: SharedGameState) {
    handle_screen(&mut stream, game_state).await.unwrap();
}
