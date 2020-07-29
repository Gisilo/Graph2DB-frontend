import { BehaviorSubject } from "rxjs";
import { LOG_IN_MUT } from "../costants/queries";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  _login,
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get currentUserID(){
    return currentUserSubject.value.pk;
  }
};

function _login(user, token, refreshToken) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  user.token = token;
  user.refreshToken = refreshToken;
  localStorage.setItem("currentUser", JSON.stringify(user));
  currentUserSubject.next(user);
}

async function login(client, username, password) {
  return await client
    .mutate({
      mutation: LOG_IN_MUT,
      variables: {
        username: username,
        password: password,
      },
    })
    .then(
      (response) => {
        const auth = response.data.tokenAuth;
        if (auth.success) {
          authenticationService._login(
            auth.user,
            auth.token,
            auth.refreshToken
          );
          return { success: true };
        } else {
          return {
            success: false,
            errors: auth.errors.nonFieldErrors,
            failure: false,
          };
        }
      },
      (err) => {
        console.log("err", err);
        return { success: false, failure: true };
      }
    );
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  // user.token = token;
  // user.refreshToken = refreshToken;
  // localStorage.setItem('currentUser', JSON.stringify(user));
  // currentUserSubject.next(user);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
