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

fn main() {
    println!("Hello, world!");
}
