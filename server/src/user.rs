#[derive(Debug, Clone)]
pub struct User {
    id: String,
    username: Option<String>,
    combo: u32,
}

impl User {
    pub fn new<T>(id: T) -> Self
    where
        T: AsRef<str>,
    {
        User {
            id: id.as_ref().to_string(),
            username: None,
            combo: 0,
        }
    }

    pub fn id(&self) -> &str {
        &self.id
    }

    pub fn username(&self) -> Option<&str> {
        self.username.as_deref()
    }

    pub fn set_username<T>(&mut self, username: T)
    where
        T: AsRef<str>,
    {
        let username = username.as_ref().to_string();
        self.username = Some(username);
    }
}

#[cfg(test)]
mod test {
    use super::User;

    #[test]
    fn user_get_id() {
        let user = User::new("0");

        assert_eq!(user.id, String::from("0"));
    }

    #[test]
    fn user_get_name() {
        let user = User::new("0");

        assert_eq!(user.username(), None);

        let mut user = user;

        user.set_username("test_user");

        assert_eq!(user.username(), Some("test_user"));
    }
}
