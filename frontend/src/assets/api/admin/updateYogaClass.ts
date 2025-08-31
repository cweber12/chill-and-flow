const url = import.meta.env.VITE_API_URL;

export const updateYogaClass = async (id: string, formData: FormData) => {
    const cookies: { [key: string]: string } = document.cookie
        .split(";")
        .reduce((cookies, item) => {
            const [name, value] = item.split("=");
            cookies[name.trim()] = value;
            return cookies;
        }, {} as { [key: string]: string });

    const res = await fetch(`${url}/yoga/update/${id}`, {
        method: "PUT",
        headers: {
            "auth-token": cookies["auth-token"],
            // Do NOT set Content-Type for FormData!
        },
        body: formData,
    });

    const data = await res.json();

    if (!data || !data.success) {
        console.log(data);
    }

    return data.yogaClass;
};