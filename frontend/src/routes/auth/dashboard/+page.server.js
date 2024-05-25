export async function load({ fetch, cookies }) {
    const data = btoa(cookies.get('username') + ":" + cookies.get('password'));

    const res = await fetch("http://localhost:8000/project/get_projects/", {
        
        headers: {
            Authorization: `Basic ${data}`
        }
    })
    .then((res) => res.json());

    return {
        projects: res
    }
}