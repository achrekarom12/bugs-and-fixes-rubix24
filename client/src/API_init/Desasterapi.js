class Desasterget {
    alerts = async () => {
        const response = await fetch("http://127.0.0.1:5000/alerts", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    }

    alerts2 = async () => {
        const response = await fetch("http://127.0.0.1:5000/alerts22", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    }

    blogs = async (Search) => {
        console.log(Search)
        const response  = await fetch("http://127.0.0.1:8080/relief-blogs/<disaster>",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    images =  async (file) => {
            const formData = new Map();
            formData.set("file", file);
            const response = await fetch("http://127.0.0.1:5000/predictImage",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        'image': file
                    }
                )
            });
            return response;
    }
        
}

export default Desasterget