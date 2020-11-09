use diesel::prelude::*;

type PgPool = diesel::r2d2::Pool<diesel::r2d2::ConnectionManager<diesel::PgConnection>>;

pub fn create_pool(db_url: &str) -> PgPool {
    use diesel::r2d2::ConnectionManager;

    let manager = ConnectionManager::<PgConnection>::new(db_url);

    r2d2::Pool::builder()
        .build(manager)
        .expect("Postgres connection pooling failed")
}
