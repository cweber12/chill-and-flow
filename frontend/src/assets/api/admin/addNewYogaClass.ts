const url = import.meta.env.VITE_API_URL;

export const addNewYogaClassHandler = async (formData: FormData) => {
    const cookies: { [key: string]: string } = document.cookie
        .split(";")
        .reduce((cookies, item) => {
            const [name, value] = item.split("=");
            cookies[name.trim()] = value;
            return cookies;
        }, {} as { [key: string]: string });

    let res = await fetch(`${url}/yoga/add`, {
        method: "POST",
        headers: {
            "auth-token": cookies["auth-token"],
            // Do NOT set Content-Type for FormData!
        },
        body: formData,
    });

    let data = await res.json();

    if (!data || !data.success) {
        console.log(data);
    }

    return data.yogaClass;
};
