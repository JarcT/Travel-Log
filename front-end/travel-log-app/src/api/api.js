

const getData =  async() => {
        try {
                const resp = await fetch('http://localhost:3000/api/v1/travelLogs')
                const data = await resp.json()
                return data
        } catch (error) {
                console.log('Error fetchin data')
        }
}   

const postData = async(data) => {
        try {
                const res = await fetch('http://localhost:3000/api/v1/travelLogs', {
                        method: "POST",
                        mode: "cors",
                        headers: {
                                'content-type':'application/json',
                        },
                        body: JSON.stringify(data)
                })
        } catch (error) {
                console.log(error);
        }
}

export {getData, postData}

