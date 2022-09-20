const connecToMongo = require('./db')

const express = require('express')
const Dashboard_Data = require('./model')
const app = express();
const port = 8000;
app.use(express.json())
connecToMongo();

app.get("/", async(req, res) => {
    try {
        const data = await Dashboard_Data.find();
        res.status(200).json({data:data})
    } catch (error) {
            console.log(error);
    }
})

app.post("/", (req, res) => {
    const {
        end_year, intensity, sector, topic, insight, url, region, start_year,
        impact, added, published, country, relevance, pestle, source, title, likelihood
    } = req.body

    const data = new Dashboard_Data({
        end_year, intensity, sector, topic, insight, url, region, start_year,
        impact, added, published, country, relevance, pestle, source, title, likelihood
    })

    data.save()
        .then((response)=>res.json({data:response}))
        .catch((err)=>console.log(err))

})


app.listen(port, (req, res) => {
    console.log(`server started on ${port}`);
})