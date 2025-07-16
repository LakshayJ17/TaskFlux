export function logoutCurrentUser(){
    localStorage.removeItem("token");
    window.location.href = '/'
}