import pandas as pd 
import numpy as np
import keras
from keras.models import Sequential
from keras.datasets import mnist
from keras.layers.core import Dense, Dropout, Activation
from sklearn.model_selection import train_test_split

batch_size = 5
epochs = 1

path = r'C:\Dev\sports-discovery-app\ai-scripts\data-formated.csv'
df = pd.read_csv(path)
df = df.drop('Unnamed: 0', axis=1)

expected_cols = pd.Series(df.columns).str.endswith('-expected')


X = df[df.columns[~np.array(expected_cols)]]
y = df[df.columns[expected_cols]]

x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

nb_sports = len(y.columns)
nb_features = len(X.columns)

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
          validation_data=(x_test, y_test))

score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

model.save('model.h5')  # creates a HDF5 file 'my_model.h5'
del model  # deletes the existing model

# returns a compiled model
# identical to the previous one
model = load_model('model.h5')