class Desasterget
{
    alerts = async ()=>{
        const response = await fetch("http://127.0.0.1:8080/alerts", {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    }

    blogs = async (Search)=>{
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
}

export default Desasterget