use actix_web::{post, web, HttpResponse, Responder};
use lazy_static::lazy_static;
use std::env;

lazy_static! {
    pub static ref MESSAGING_WS_URL: String =
        env::var("MESSAGING_WS_URL").expect("MESSAGING_WS_URL must be set");
    pub static ref MESSAGING_USER_DOMAIN: String =
        env::var("MESSAGING_USER_DOMAIN").expect("MESSAGING_USER_DOMAIN must be set");
    pub static ref MESSAGING_ORDERROOM_DOMAIN: String =
        env::var("MESSAGING_ORDERROOM_DOMAIN").expect("MESSAGING_ORDERROOM_DOMAIN must be set");
    pub static ref MESSAGING_ADMIN_MUCLIGHT_API_URL: String =
        env::var("MESSAGING_ADMIN_MUCLIGHT_API_URL")
            .expect("MESSAGING_ADMIN_MUCLIGHT_API_URL must be set");
    pub static ref MESSAGING_ADMIN_API_KEY: String =
        env::var("MESSAGING_ADMIN_API_KEY").expect("MESSAGING_ADMIN_API_KEY must be set");
    pub static ref MESSAGING_ADMIN_API_IDENTITY: String =
        env::var("MESSAGING_ADMIN_API_IDENTITY").expect("MESSAGING_ADMIN_API_IDENTITY must be set");
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct RoomInvitation {
    pub room: String,
    pub recipient: String,
}

pub fn mongooseim_routes() -> impl FnOnce(&mut web::ServiceConfig) {
    move |config: &mut web::ServiceConfig| {
        config
            .data(reqwest::Client::new())
            .service(web::scope("mongooseim").service(handle_add_other_to_room));
    }
}

#[post("/join")]
async fn handle_add_other_to_room(
    client: web::Data<reqwest::Client>,
    request: web::Json<RoomInvitation>,
) -> impl Responder {
    use serde::Serialize;
    #[derive(Serialize)]
    struct Params<'a> {
        sender: &'a str,
        recipient: &'a str,
    }

    client
        .post(&format!(
            "{}/{}/participants",
            *MESSAGING_ADMIN_MUCLIGHT_API_URL, request.room
        ))
        .basic_auth(
            &*MESSAGING_ADMIN_API_IDENTITY,
            Some(&*MESSAGING_ADMIN_API_KEY),
        )
        .json(&Params {
            sender: &format!(
                "{}@{}",
                *MESSAGING_ADMIN_API_IDENTITY, *MESSAGING_USER_DOMAIN
            ),
            recipient: &request.recipient,
        })
        .send()
        .await
        .map_or_else(
            |_| HttpResponse::InternalServerError().finish(),
            |resp| {
                if !resp.status().is_success() {
                    HttpResponse::BadRequest().finish()
                } else {
                    HttpResponse::Ok().finish()
                }
            },
        )
}
