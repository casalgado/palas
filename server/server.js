class Server {
  constructor() {}
  async getAll(path) {
    try {
      console.log("try");
    } catch (err) {
      console.log(err);
    }
    console.log("getAll");
  }
}

export { Server };
