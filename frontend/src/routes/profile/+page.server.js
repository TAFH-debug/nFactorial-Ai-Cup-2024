import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const username = cookies.get("username");
    const password = cookies.get("password");
    if (username && password) {
        const resp = await fetch("http://localhost:8000/auth/check-auth/", {
            
            method: "POST",
            headers: {
                Authorization: `Basic ${username}:${password}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (resp.status == 401) {
            throw redirect(307, "/login")
        }
    }
    else {
        throw redirect(307, "/login")
    }
}