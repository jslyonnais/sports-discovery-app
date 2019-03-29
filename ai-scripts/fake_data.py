import random
import csv
from functools import reduce

nb_data_points = 10000
age_bounds = [1, 99]
sexes = ["f", "m"]
location_x_bounds = [-90, 90]
location_y_bounds = [-180, 180]
all_sports = [
    {
        "Name": "Golf",
        "Id": 270,
        "f": 15.2,
        "m": 22.7,
    },
    {
        "Name": "Ice hockey",
        "Id": 175,
        "f": 4.4,
        "m": 23.2,
    },
    {
        "Name": "Soccer",
        "Id": 81,
        "f": 11.7,
        "m": 14.4,
    },
    {
        "Name": "Baseball",
        "Id": 74,
        "f": 6.2,
        "m": 8.9,
    },
    {
        "Name": "Volleyball",
        "Id": 93,
        "f": 9.3,
        "m": 6.4,
    },
    {
        "Name": "Basketball",
        "Id": 78,
        "f": 3.2,
        "m": 8.9,
    },
    {
        "Name": "Downhill skiing",
        "Id": 67,
        "f": 6.4,
        "m": 6.0,
    },
    {
        "Name": "Cycling",
        "Id": 258,
        "f": 5.6,
        "m": 5.4,
    },
    {
        "Name": "Swimming",
        "Id": 224,
        "f": 11.1,
        "m": 2.5,
    },
    {
        "Name": "Badminton",
        "Id": 132,
        "f": 4.1,
        "m": 4.4,
    },
    {
        "Name": "Tennis",
        "Id": 134,
        "f": 5.1,
        "m": 3.0,
    },
    {
        "Name": "Curling",
        "Id": 999,
        "f": 3.6,
        "m": 3.3,
    },
    {
        "Name": "Softball",
        "Id": 347,
        "f": 3.3,
        "m": 2.9,
    },
    {
        "Name": "Football",
        "Id": 87,
        "f": 0.6,
        "m": 3.5,
    },
    {
        "Name": "Ball hockey",
        "Id": 368,
        "f": 0.8,
        "m": 2.4,
    },
    {
        "Name": "Bowling",
        "Id": 858,
        "f": 3,
        "m": 1.2,
    },
    {
        "Name": "Martial arts",
        "Id": 593,
        "f": 0.43,
        "m": 1.9,
    },
    {
        "Name": "Squash",
        "Id": 141,
        "f": 0.39,
        "m": 1.9,
    },
    {
        "Name": "Kayaking",
        "Id": 996,
        "f": 1.5,
        "m": 1.3,
    },
    {
        "Name": "Equestrian mounted games",
        "Id": 412,
        "f": 4.3,
        "m": 0.06,
    },
    {
        "Name": "Rugby",
        "Id": 89,
        "f": 1.5,
        "m": 1.4,
    },
    {
        "Name": "Olympic weightlifting",
        "Id": 710,
        "f": 0.13,
        "m": 1.9,
    },
    {
        "Name": "Cross country running",
        "Id": 339,
        "f": 2.1,
        "m": 0.7,
    }
]


def pick_sport(sex):
    return lambda acc, sport: pick_sport_based_on_sex(acc, sport, sex)


def pick_sport_based_on_sex(acc, sport, sex):
    roll = random.uniform(0, 100)
    if roll <= sport[sex]:
        return acc + [sport["Name"]]

    return acc


def generate():
    headers = ["age", "sex", "location_x", "location_y", "sports"]
    data = [headers]

    for i in range(nb_data_points):
        sex = sexes[random.randint(0, 1)]

        random.shuffle(all_sports)
        sports = reduce(pick_sport(sex), all_sports, [])

        age = random.randint(age_bounds[0], age_bounds[1])
        
        location_x = random.uniform(location_x_bounds[0], location_x_bounds[1])
        location_y = random.uniform(location_y_bounds[0], location_y_bounds[1])

        data.append([age, sex, location_x, location_y, sports])

    with open('fake_data.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(data)


generate()
