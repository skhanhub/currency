// Script for unit testing all the routes inside app.ts
"use strict"
import * as request from "supertest";
import server from "../src/app"

// Unit tests for testing all the endpoints
describe("Test all the routes in app.js", function(){
  afterEach(function () {
      server.close(); // Close the imported server after the unit tests are over so that the CI/CD pipeline can continue
  });
  // Unit test for testing root endpoint
  it("loads the home page", function(done){
      request(server).get("/")
      .expect(200)
      .expect(/Currency Annalyser/)
      .end(done) // Expect to find "Currency Annalyser" in the webpage and receive a status code of 200"
  })

  it("returns the best possible buy and sell price for the given post data", function(done){
    request(server).post("/api/profits")
    .send({
      fromDate: '20180507',
      toDate: '20180508',
      currencySelected: 'BTC'
    })// Add arguments to the post body
    .expect(200)
    .expect(/BTC/)
    .end(done) // Expect to find "BTC" in the return data and receive a status code of 200"
  })

  it("returns all the currencies", function(done){
    request(server).get("/api/currencies")
    .expect(200)
    .expect(/ETC/)
    .end(done) // Expect to find "ETC" in the return data and receive a status code of 200"
  })
})
