import axios from 'axios'
const API_URI = window.env.API_ENDPOINT;

export default class Services {
  static headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  static preubaLogin(body) {
    let response = {
      body: {
        id: "1",
        fullName: "Harold",
        email: "harold@gmai.com",
        token: "123",
      },
      status: 200
    };

    if (!("harold@gmail.com" === body.email && "123" === body.password)) {
      response.status = 400
    }
    Services.post("auth/login", {
      "email": "andrespipe021028@gmail.com",
      "password": "1234567"
    })
    return response;
  }

  static get(rute) {
    return axios.get(API_URI + rute, {
      headers: this.headers
    });
  }

  static post(rute, body) {
    return axios.post(API_URI + rute, body, { headers: "FUCJ" });
  }

  static put(rute, body) {
    return axios.put(API_URI + rute, {
      headers: this.headers,
      body: body
    });
  }

  static delete(rute) {
    return axios.delete(API_URI + rute, {
      headers: this.headers
    });
  }
}
