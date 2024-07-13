import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    const placeName = req.body.placeName;
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: placeName},
        headers: {
          'x-rapidapi-key': '95284834b0msh9b05d573fff2f5dp17c4a2jsn647629756f73',
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
      };
    
    try {
        const response = await axios.request(options);
        res.render("second.ejs", {
            place: response.data.location.name,
            region: response.data.location.region,
            temperature: response.data.current.temp_c,
            current_time:response.data.location.localtime,
          });
        console.log(response.data.current.temp_c);
    } catch (error) {
        console.error(error);
    }
  });

  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  