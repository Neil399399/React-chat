mod messaging;
mod utils;
use actix_cors::Cors;
use actix_rt::System; //thread
use actix_web::{middleware, web, App, HttpServer};
use std::env;

fn main() {
    let _ = mono_server();
}

fn mono_server() -> std::io::Result<()> {
    // init logger
    std::env::set_var("RUST_LOG", "actix_web=info");
    init_logger("debug");

    System::new("server").block_on(async {
        // use port 80 will require sudo to run
        let bind_address = "127.0.0.1:30303";
        // database setting
        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let pool = utils::create_pool(&db_url);
        // run future
        HttpServer::new(move || {
            App::new()
                .data(pool.clone())
                // enable logger
                .wrap(middleware::Logger::default())
                // cors
                .wrap(
                    Cors::new()
                        // #NOTE for test
                        .allowed_origin("http://localhost")
                        .allowed_origin("http://localhost:3000")
                        .allowed_origin("http://localhost:3001")
                        .allowed_methods(vec!["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"])
                        .supports_credentials()
                        .finish(),
                )
                .configure(messaging::mongooseim_routes())
                // heathlz
                .service(web::resource("/heathlz").route(web::get().to(|| async { "healthz" })))
        })
        .bind(bind_address)
        .unwrap_or_else(|thing| panic!("Could not bind server to address {:?}", thing))
        .run()
        .await
    })
}

fn init_logger(pattern: &str) {
    use ansi_term::Colour;
    use chrono::Utc;
    use std::io::Write;

    let mut builder = env_logger::Builder::new();
    if let Ok(lvl) = std::env::var("RUST_LOG") {
        builder.parse_filters(&lvl);
    }
    builder.parse_filters(pattern);

    builder.format(move |buf, record| {
        let time_now = Utc::now().format("%Y-%m-%d %H:%M:%S").to_string();
        let output = format!("{} {}", Colour::Black.bold().paint(time_now), record.args(),);
        writeln!(buf, "{}", output)
    });

    if builder.try_init().is_err() {
        log::info!("Global logger already initialized.  Skipping");
    }
}
