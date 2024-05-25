export async function load({ fetch, cookies, params }) {
    const data = btoa(cookies.get('username') + ":" + cookies.get('password'));

    const res = await fetch("http://localhost:8000/asset/get_all/", {
        
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Basic ${data}`
        },
        body: JSON.stringify({
            id: parseInt(params.slug)
        })
    })
    .then((res) => res.json())

    const entities = await fetch("http://localhost:8000/character/get_all/", {
        
        method: "POST",
        headers: {
            Authorization: `Basic ${data}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(params.slug),
        })
    }).then((res) => res.json())

    res.forEach((i) => {
        i.entity_name = entities.filter((val) => val.id == i.character_id)[0].name;
    });

    return {
        assets: res,
        entities: entities
    }
}