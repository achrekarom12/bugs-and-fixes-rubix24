class Earthquakeget
{
    alerts = async ()=>{
        const response = await fetch("http://127.0.0.1:5000/earthquake-alerts", {
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    }
}

export default Earthquakeget