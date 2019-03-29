import logging

import os
import azure.functions as func
import numpy as np
import pandas as pd
import keras 
from keras.models import load_model

model = load_model(str(os.getcwd()) + "\model-1553883239.315829.h5")
model._make_predict_function()
sportIds = ['593', '175', '347', '270', '412', '710', '339', '81', '87', '78',
       '134', '224', '996', '74', '999', '368', '141', '858', '67', '93', '89',
       '132', '258']

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    #req_body = req.get_json()
    age = 0 #float(req_body.get('age'))
    gender = 'male'#req_body.get('gender')
    location = {'lat':0, 'lng':0} #req_body.get('location')
    likedsports = []#req_body.get('likedsports') 

    inputs = []

    #age
    inputs.append(age / 120)

    #sex
    inputs.append(int(gender == 'male'))

    #location
    inputs.append((float(location['lat']) + 90) / 180)
    inputs.append((float(location['lng']) + 180) / 360)

    #sports
    for sportId in sportIds:
        inputs.append(int(sportId in likedsports))

    inputs = np.array([np.array(inputs)])
    prediction = model.predict(inputs)
    results = pd.DataFrame(data=prediction, columns=sportIds).T.sort_values(by=[0], ascending=False)
    results['sportId'] = results.index
    results['sportId'] = results['sportId'].apply(lambda x: x.replace('-expected',''))
    results.columns = ['value', 'sports']    

    return func.HttpResponse(str(results.sports.values))
    
    #return func.HttpResponse("Please pass a name on the query string or in the request body", status_code=400)
