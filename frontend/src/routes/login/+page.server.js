import { redirect } from '@sveltejs/kit';
export const actions = {
    default: async ({ request, cookies, fetch }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');


        const dt = btoa(username + ":" + password);
        const res = await fetch("http://localhost:8000/auth/basic-auth/", {
            
            headers: {
                Authorization: `Basic ${dt}`
            }
        });

        if(!res.ok) {
            throw redirect(302, "/login?error");
        }

        cookies.set('username', username, { secure: false, path: "/" });
        cookies.set('password', password, { secure: false, path: "/" });
        throw redirect(302, "/");
    }
};