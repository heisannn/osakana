use std::sync::Arc;

use axum::{Json, extract::State, http::StatusCode};
use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;

use crate::GameState;

#[derive(Debug, Deserialize)]
pub struct ReceiveAnswerRequest {
    pub question_index: usize,
    pub kanji_id: u32,
}

#[derive(Debug, Serialize)]
pub struct Response {
    result: bool,
}

#[axum::debug_handler]
pub async fn receive_answer(
    State(game_state): State<Arc<Mutex<GameState>>>,
    Json(request): Json<ReceiveAnswerRequest>,
) -> Result<Json<Response>, StatusCode> {
    let question_index = request.question_index;
    let kanji_id = request.kanji_id;

    let result = game_state.lock().await.judge(question_index, kanji_id);
    let response = Response { result };

    Ok(Json(response))
}
