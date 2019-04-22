class Auth {
  #authInstance = null;

  initClient() {
    return new Promise((resolve, reject) => {
      return window.gapi.client
        .init({
          apiKey: "AIzaSyDKvF1KEk7XllLfpfhbgv1MmcxaSVgWyeA",
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest"],
          clientId: "365243747034-8bogar38jdern567eimmvs48qqpc7ebi.apps.googleusercontent.com",
          scope: "https://www.googleapis.com/auth/tasks"
        })
        .then(() => {
          this.#authInstance = window.gapi.auth2.getAuthInstance();
          resolve();
        })
        .catch(reject);
    });
  }

  get auth2() {
    return this.#authInstance;
  }

  isSignedIn() {
    return this.#authInstance.isSignedIn.get();
  }

  signIn() {
    return this.#authInstance.signIn().catch(() => {});
  }

  signOut() {
    return this.#authInstance.signOut().catch(() => {});
  }
}

export default new Auth();
