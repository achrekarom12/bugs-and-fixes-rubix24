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
        const response = await fetch(`http://127.0.0.1:5000/relief-blogs/${Search}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    images =  async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch("http://127.0.0.1:5000/predictVulnerabilityOfInfraFromImage",{
                method: "POST",
                body: formData
            });

    }
        
}

export default Desasterget