// Communicates with the API.

class Adapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}