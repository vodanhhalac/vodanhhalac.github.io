import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.post("/api", async (req, res) => {
  function toUrlEncoded(obj) {
    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        for (const [subKey, subValue] of Object.entries(value)) {
          urlParams.append(`${key}[${subKey}]`, subValue);
        }
      } else {
        urlParams.append(key, value);
      }
    }

    return urlParams.toString();
  }

  const urlEncodedString = toUrlEncoded(req.body);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://flatsome.dominhhai.com/wp-admin/admin-ajax.php",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language":
        "en,vi;q=0.9,vi-VN;q=0.8,fr-FR;q=0.7,fr;q=0.6,en-US;q=0.5",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      origin: "https://flatsome.dominhhai.com",
      priority: "u=1, i",
      referer: "https://flatsome.dominhhai.com/la-so-tu-vi-3/",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "x-requested-with": "XMLHttpRequest",
    },
    data: urlEncodedString,
  };

  try {
    const result = await axios.request(config);

    return res.send(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Fuck");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
