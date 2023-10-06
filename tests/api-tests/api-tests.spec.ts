import {
    APIRequestContext,
    APIResponse,
    expect,
    request,
} from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { StatusCodes } from "http-status-codes";
import { getSecrets } from "../authentication/retrieve-aws-creds-ci";
import type {
    DeleteRating,
    PostRating,
    UserProfile,
    UsersList,
} from "./models/interfaces";
import * as labels from "./data/labels.json";

test.describe("MovieDB api tests", () => {
    let response: APIResponse;
    let request: APIResponse;

    test("GET Details", async ({ requestContext }) => {
        let response: APIResponse;

        await test.step("send GET request for Details", async () => {
            response = await requestContext.get(`/3/account/${labels.userId}`);
        });

        await test.step("should have 200 status code", async () => {
            expect(response.status()).toEqual(StatusCodes.OK);
        });

        await test.step("should have the correct username", async () => {
            const username = (await getSecrets()).username;
            const responseBody: UserProfile = await response.json();
            expect(responseBody.username).toEqual(username);
        });
    });

    test("POST Rating and DELETE Rating", async ({ requestContext }) => {
        await test.step("send POST request to add rating to Matrix", async () => {
            request = await requestContext.post(
                `/3/movie/${labels.movieId}/rating`,
                {
                    data: { value: labels.rating },
                }
            );
        });

        await test.step("post rating request should return with OK status code", async () => {
            expect(request.status()).toEqual(StatusCodes.CREATED);
        });

        await test.step("send GET request to return rated movies", async () => {
            response = await requestContext.get(
                `/3/account/${labels.userId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`
            );
        });

        await test.step(`movie with id ${labels.movieId} should have correct rating`, async () => {
            const responseBody: PostRating = await response.json();
            const resultsForRatings = responseBody.results;
            const ratingForMatrix = resultsForRatings.find(
                (item) => item.title === labels.matrix
            );
            expect(ratingForMatrix.rating).toEqual(labels.rating);
        });

        await test.step("send DELETE request to remove rating from Matrix", async () => {
            request = await requestContext.delete(
                `/3/movie/${labels.movieId}/rating`
            );
        });

        await test.step("delete rating request should return with OK status code", async () => {
            expect(request.status()).toEqual(StatusCodes.OK);
        });

        await test.step("send GET request to return rated movies", async () => {
            response = await requestContext.get(
                `/3/account/${labels.userId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`
            );
        });

        await test.step(`movie with id ${labels.movieId} should not be present in list of rated movies`, async () => {
            const responseBody: DeleteRating = await response.json();
            const resultsForRatings = responseBody.results;
            const ratingForMatrix = resultsForRatings.find(
                (item) => item.title === labels.matrix
            );
            expect(ratingForMatrix).toBeUndefined();
        });
    });
});

test.describe("reqres API tests for unauthenticated test cases", () => {
    test("the list users request should work properly", async () => {
        let response: APIResponse;
        let responseBody: UsersList;
        let usersList: UsersList["data"];
        const requestContext: APIRequestContext = await request.newContext({
            baseURL: "https://reqres.in",
        });

        await test.step("send GET request to return users", async () => {
            response = await requestContext.get("/api/users?page=2");
        });

        await test.step("should retrun more than 1 users", async () => {
            responseBody = await response.json();
            usersList = responseBody.data;
            expect(usersList.length).toBeGreaterThan(1);
        });

        await test.step("should contain as many users as total property shows", async () => {
            const numberOfUsersPerPage = responseBody.per_page;
            expect(usersList.length).toEqual(numberOfUsersPerPage);
        });
    });
});
