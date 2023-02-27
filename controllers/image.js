const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: "6f3a240ed6c04cb4a1cfdde175ac7791",
  });

  const handleApiCall = (req,res) => {
      app.models
      .predict(
        {
          id: "face-detection",
          name: "face-detection",
          version: "6dc7e46bc9124c5c8824be4822abe105",
          type: "visual-detector",
        },
        req.body.input
      )
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('Unable to Work With API'))
  }

    const handleImage = (req, res, db) => {
        const { id } = req.body;
    
        db("users")
            .where("id", "=", id)
            .increment("entries", 1)
            .returning("entries")
            .then((entries) => {
                res.json(entries[0].entries);
        })
            .catch((err) => res.status(400).json("Unable to get Entries Count"));
    }

    module.exports = {
        handleImage: handleImage,
        handleApiCall: handleApiCall
    }
    