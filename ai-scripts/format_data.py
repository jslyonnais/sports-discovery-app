


import pandas as pd
import numpy as np
import ast


path_in = r'C:\Dev\sports-discovery-app\ai-scripts\fake_data.csv'
df = pd.read_csv(path_in)

df['sports-array'] = df['sports'].apply(lambda x: list(map(str, list(map(int, ast.literal_eval(x))))))
df['age-scaled'] = df['age'] / 120
df['sex-scaled'] = np.where(df['sex'] == 'm', 0, 1)
df['location_x-sacled'] = (df['location_x'] + 90) / 180
df['location_y-scaled'] = (df['location_y'] + 180) / 360


all_sports = df['sports-array'].apply(pd.Series).stack().unique()
for sport in all_sports:
    df[sport] = 0
    
for sport in all_sports:
    df[sport + '-expected'] = 0

rows = []
for index in range(len(df)):    
    sports = df.loc[index]['sports-array']
    for sport in sports: 
        row = df.loc[index].copy()
        row[sport + '-expected'] = 1
        for remaining_sport in sports:
            if remaining_sport != sport: 
                row[remaining_sport] = 1
        rows.append(row)

        
df_expected = pd.concat(rows, axis=1, keys=[s.name for s in rows]).T.reset_index(drop=True)

df_expected = df_expected.drop(['age', 'sex', 'location_x', 'location_y', 'sports', 'sports-array'], axis=1)

path_out = r'C:\Dev\sports-discovery-app\ai-scripts\fake-data-formated.csv'
df_expected.to_csv(path_out)

