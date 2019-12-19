# import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastai import *
from fastai.vision import *

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get('/predict')
def getPrediction(imgUrl):
  #  bytes = await get_bytes(request.query_params["url"])
  #   img = open_image(BytesIO(bytes))
  #   _,_,losses = learner.predict(img)
  #   return JSONResponse({
  #       "predictions": sorted(
  #           zip(cat_learner.data.classes, map(float, losses)),
  #           key=lambda p: p[1],
  #           reverse=True
  #       )
  #   })
  print('got request')
  return {"prediction": imgUrl}


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)