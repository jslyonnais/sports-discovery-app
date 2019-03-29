import random
import csv

nb_data_points = 10000
age_bounds = [1, 99]
sexes = ["f", "m"]
location_x_bounds = [-90, 90]
location_y_bounds = [-180, 180]
all_sports = [
    {
        "Name": "Golf",
        "Id": 270
    },
    {
        "Name": "Ice hockey",
        "Id": 175
    },
    {
        "Name": "Soccer",
        "Id": 81
    },
    {
        "Name": "Baseball",
        "Id": 74
    },
    {
        "Name": "Volleyball",
        "Id": 93
    },
    {
        "Name": "Basketball",
        "Id": 78
    },
    {
        "Name": "Downhill skiing",
        "Id": 67
    },
    {
        "Name": "Cycling",
        "Id": 258
    },
    {
        "Name": "Swimming",
        "Id": 224
    },
    {
        "Name": "Badminton",
        "Id": 132
    },
    {
        "Name": "Tennis",
        "Id": 134
    },
    {
        "Name": "Curling",
        "Id": 999
    },
    {
        "Name": "Softball",
        "Id": 347
    },
    {
        "Name": "Football",
        "Id": 87
    },
    {
        "Name": "Ball hockey",
        "Id": 368
    },
    {
        "Name": "Bowling",
        "Id": 858
    },
    {
        "Name": "Martial arts",
        "Id": 593
    },
    {
        "Name": "Squash",
        "Id": 141
    },
    {
        "Name": "Kayaking",
        "Id": 996
    },
    {
        "Name": "Equestrian mounted games",
        "Id": 412
    },
    {
        "Name": "Rugby",
        "Id": 89
    },
    {
        "Name": "Olympic weightlifting",
        "Id": 710
    },
    {
        "Name": "Cross country running",
        "Id": 339
    }
]


def generate():
    headers = ["age", "sex", "location_x", "location_y", "sports"]
    data = [headers]

    for i in range(nb_data_points):
        age = random.randint(age_bounds[0], age_bounds[1])
        sex = sexes[random.randint(0, 1)]
        location_x = random.uniform(location_x_bounds[0], location_x_bounds[1])
        location_y = random.uniform(location_y_bounds[0], location_y_bounds[1])
        random.shuffle(all_sports)
        sports = all_sports[:random.randint(0, min(5, len(all_sports)))]
        sports = list(map(lambda sport: sport["Name"], sports))

        data.append([age, sex, location_x, location_y, sports])

    with open('fake_data.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(data)


generate()
