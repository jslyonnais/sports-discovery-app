import logging

import os
import azure.functions as func
import numpy as np
import pandas as pd
from keras.models import load_model

model = load_model(str(os.getcwd()) + "\model-1553883239.315829.h5")
model._make_predict_function()
sportIds = ['593', '175', '347', '270', '412', '710', '339', '81', '87', '78',
       '134', '224', '996', '74', '999', '368', '141', '858', '67', '93', '89',
       '132', '258']

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    if req_body is None :
        return func.HttpResponse("Please pass a field in the request body as json.", status_code=400)

    age = req_body.get('age')
    if age is None :
        return func.HttpResponse("Please pass a age parameter in the body.", status_code=400)

    gender = req_body.get('gender')
    if gender is None :
        return func.HttpResponse("Please pass a gender parameter in the body.", status_code=400)

    location = req_body.get('location')
    if location is None :
        return func.HttpResponse("Please pass a location parameter in the body.", status_code=400)

    likedsports = req_body.get('likedsports')
    if likedsports is None :
        return func.HttpResponse("Please pass a likedsports parameter in the body.", status_code=400)

    try:
        inputs = []

        #age
        inputs.append(float(age) / 120)

        #sex
        inputs.append(int(gender == 'male'))

        #location
        inputs.append((float(location['lat']) + 90) / 180)
        inputs.append((float(location['lng']) + 180) / 360)

        #sports
        for sportId in sportIds:
            inputs.append(int(int(sportId) in likedsports))

        inputs = np.array([np.array(inputs)])
        prediction = model.predict(inputs)
        results = pd.DataFrame(data=prediction, columns=sportIds).T.sort_values(by=[0], ascending=False)
        results['sportId'] = results.index
        results['sportId'] = results['sportId'].apply(lambda x: x.replace('-expected',''))
        results.columns = ['value', 'sports']

        return func.HttpResponse(str(results.sports.values[0]))
    except:
        print("An exception occurred")

