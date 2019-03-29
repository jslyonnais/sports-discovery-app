import pandas as pd 
import numpy as np
import datetime
import keras
from keras.models import Sequential
from keras.models import load_model
from keras.layers.core import Dense, Dropout, Activation
from sklearn.model_selection import train_test_split

batch_size = 100
epochs = 100
ts = str(datetime.datetime.now().timestamp())
model_file_name = 'model-' + ts + '.h5'

path = r'C:\Dev\sports-discovery-app\ai-scripts\fake-data-formated.csv'
df = pd.read_csv(path)
df = df.drop('Unnamed: 0', axis=1)

expected_cols = pd.Series(df.columns).str.endswith('-expected')


X = df[df.columns[~np.array(expected_cols)]]
y = df[df.columns[expected_cols]]

x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

nb_sports = len(y.columns)
nb_features = len(X.columns)

checkpoint = keras.callbacks.ModelCheckpoint(model_file_name, verbose=1, monitor='val_loss',save_best_only=True, mode='auto')  


model = Sequential()
model.add(Dense(512, input_shape=(nb_features,)))
model.add(Activation('relu'))
model.add(Dropout(0.2))
model.add(Dense(512))
model.add(Activation('relu'))
model.add(Dropout(0.2))
model.add(Dense(nb_sports))
model.add(Activation('softmax'))

model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.Adadelta(),
              metrics=['accuracy'])

model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          callbacks=[checkpoint],
          validation_data=(x_test, y_test))

score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

model = load_model(model_file_name)

score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

h = X[0:1].copy()

prediction = model.predict(h)
results = pd.DataFrame(data=prediction, columns=y.columns).T.sort_values(by=[0], ascending=False)
results['sports'] = results.index
print(results)