import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(user, token, refreshToken) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // localStorage.setItem('currentUser', JSON.stringify(user));
    // currentUserSubject.next(user);
    console.log(user)
    console.log(token)
    console.log(refreshToken)
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}