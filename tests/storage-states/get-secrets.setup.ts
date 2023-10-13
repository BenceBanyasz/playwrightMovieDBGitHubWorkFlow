require("dotenv").config();
import { test as setup } from "../fixtures/fixtures";
import { getSecrets } from "../authentication/retrieve-aws-creds-ci";

setup("get secrets", async () => {
    const { username, password, moviedb_access_token } = await getSecrets();

    process.env.MOVIEDB_USERNAME = process.env.MOVIEDB_USERNAME || username;
    process.env.MOVIEDB_PASSWORD = process.env.MOVIEDB_PASSWORD || password;
    process.env.MOVIEDB_ACCESS_TOKEN = process.env.MOVIEDB_ACCESS_TOKEN || moviedb_access_token;
});
