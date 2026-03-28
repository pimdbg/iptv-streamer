export const goTo = (route: string) => {
    if (! route.startsWith("#")) {
        throw new Error("goTo only allows routes starting with '#' (hash)");
    }
    
    window.history.pushState({}, "", route);
    window.dispatchEvent(new Event("hashchange"));
}   