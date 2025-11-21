use axum::{extract::State, http::StatusCode};
use uuid::Uuid;

use crate::{SharedGameState, model::User};

#[axum::debug_handler]
pub async fn create_user(State(game_state): State<SharedGameState>) -> StatusCode {
    let user_id = Uuid::new_v4();
    let new_user = User::new(user_id.to_string());

    game_state.lock().await.participants.push(new_user);

    StatusCode::OK
}
