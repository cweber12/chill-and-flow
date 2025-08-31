const url = import.meta.env.VITE_API_URL;

export const deleteYogaClass = async (id: string) => {
    const cookies: { [key: string]: string } = document.cookie
        .split(";")
        .reduce((cookies, item) => {
            const [name, value] = item.split("=");
            cookies[name.trim()] = value;
            return cookies;
        }, {} as { [key: string]: string });

    const res = await fetch(`${url}/yoga/delete/${id}`, {
        method: "DELETE",
        headers: {
            "auth-token": cookies["auth-token"],
        },
    });

    const data = await res.json();

    if (!data || !data.success) {
        console.log(data);
    }

    return data;
};