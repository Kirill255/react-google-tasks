class Auth {
  #authInstance = null;

  initClient() {
    return new Promise((resolve, reject) => {
      return window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: "AIzaSyDKvF1KEk7XllLfpfhbgv1MmcxaSVgWyeA",
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
            clientId: "365243747034-8bogar38jdern567eimmvs48qqpc7ebi.apps.googleusercontent.com",
            scope: "https://www.googleapis.com/auth/tasks"
          })
          .then(async () => {
            this.#authInstance = await window.gapi.auth2.getAuthInstance();
          })
          .then(() => resolve())
          .catch(reject);
      });
    });
  }

  get auth2() {
    return this.#authInstance;
  }

  isSignedIn() {
    return this.#authInstance.isSignedIn.get();
  }
}

export default new Auth();
