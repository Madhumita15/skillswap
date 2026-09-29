export const ENDPOINT = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout",
        verifyEmail: "/auth/verify-email"
    },
    user: {
        profile: "/profile",
        discover: "/users/discover",
        match: "/users/match",
        userById: "/user"
    },
    swapRequest: {
        post: "/swap-requests",
        sent: "/swap-requests/sent",
        received: "/swap-requests/received"
    },
    swaps: {
        history: "/swaps/history",
        active: "/swaps/active",
        post: "/swaps"


    },
    admin: {
        swapReuest: "/admin/swap-requests",
        swaps: "/admin/swaps"
    }
}