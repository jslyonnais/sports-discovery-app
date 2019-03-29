import random
import csv
from functools import reduce

nb_pattern_data_points = 10000
age_bounds = [1, 120]
sexes = ["f", "m"]
location_x_bounds = [-90, 90]
location_y_bounds = [-180, 180]
all_sports = [
    {
        "Name": "Golf",
        "Id": 270,
        "f": 15.2,
        "m": 22.7,
        "age_bounds": [16, 80]
    },
    {
        "Name": "Ice hockey",
        "Id": 175,
        "f": 4.4,
        "m": 23.2,
        "age_bounds": [6, 50]
    },
    {
        "Name": "Soccer",
        "Id": 81,
        "f": 11.7,
        "m": 14.4,
        "age_bounds": [6, 55]
    },
    {
        "Name": "Baseball",
        "Id": 74,
        "f": 6.2,
        "m": 8.9,
        "age_bounds": [15, 41]
    },
    {
        "Name": "Volleyball",
        "Id": 93,
        "f": 9.3,
        "m": 6.4,
        "age_bounds": [18, 46]
    },
    {
        "Name": "Basketball",
        "Id": 78,
        "f": 3.2,
        "m": 8.9,
        "age_bounds": [13, 52]
    },
    {
        "Name": "Downhill skiing",
        "Id": 67,
        "f": 6.4,
        "m": 6.0,
        "age_bounds": [22, 36]
    },
    {
        "Name": "Cycling",
        "Id": 258,
        "f": 5.6,
        "m": 5.4,
        "age_bounds": [20, 85]
    },
    {
        "Name": "Swimming",
        "Id": 224,
        "f": 11.1,
        "m": 2.5,
        "age_bounds": [3, 120]
    },
    {
        "Name": "Badminton",
        "Id": 132,
        "f": 4.1,
        "m": 4.4,
        "age_bounds": [22, 72]
    },
    {
        "Name": "Tennis",
        "Id": 134,
        "f": 5.1,
        "m": 3.0,
        "age_bounds": [17, 86]
    },
    {
        "Name": "Curling",
        "Id": 999,
        "f": 3.6,
        "m": 3.3,
        "age_bounds": [35, 45]
    },
    {
        "Name": "Softball",
        "Id": 347,
        "f": 3.3,
        "m": 2.9,
        "age_bounds": [25, 55]
    },
    {
        "Name": "Football",
        "Id": 87,
        "f": 0.6,
        "m": 3.5,
        "age_bounds": [14, 31]
    },
    {
        "Name": "Ball hockey",
        "Id": 368,
        "f": 0.8,
        "m": 2.4,
        "age_bounds": [18, 45]
    },
    {
        "Name": "Bowling",
        "Id": 858,
        "f": 3,
        "m": 1.2,
        "age_bounds": [42, 92]
    },
    {
        "Name": "Martial arts",
        "Id": 593,
        "f": 0.43,
        "m": 1.9,
        "age_bounds": [9, 32]
    },
    {
        "Name": "Squash",
        "Id": 141,
        "f": 0.39,
        "m": 1.9,
        "age_bounds": [25, 54]
    },
    {
        "Name": "Kayaking",
        "Id": 996,
        "f": 1.5,
        "m": 1.3,
        "age_bounds": [18, 97]
    },
    {
        "Name": "Equestrian mounted games",
        "Id": 412,
        "f": 4.3,
        "m": 0.06,
        "age_bounds": [16, 29]
    },
    {
        "Name": "Rugby",
        "Id": 89,
        "f": 1.5,
        "m": 1.4,
        "age_bounds": [20, 30]
    },
    {
        "Name": "Olympic weightlifting",
        "Id": 710,
        "f": 0.13,
        "m": 1.9,
        "age_bounds": [18, 38]
    },
    {
        "Name": "Cross country running",
        "Id": 339,
        "f": 2.1,
        "m": 0.7,
        "age_bounds": [12, 49]
    }
]


def get_sport_age_bounds(acc, sport_name):
    sport = list(filter(lambda sport_data: sport_data["Name"] == sport_name, all_sports))
    return acc + [sport[0]["age_bounds"]]


def get_age(sports):
    bounds = reduce(get_sport_age_bounds, sports, [])

    if len(bounds) == 0:
        return random.randint(age_bounds[0], age_bounds[1])

    lower_bound = max(list(map(lambda bound: bound[0], bounds)))
    upper_bound = min(list(map(lambda bound: bound[1], bounds)))

    if lower_bound >= upper_bound:
        lower_bound, upper_bound = upper_bound, lower_bound

    return random.randint(lower_bound, upper_bound)


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

    data += generate_pattern_data()
    data += generate_random_data()

    with open('fake_data.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(data)


def generate_pattern_data():
    data = []
    for i in range(nb_pattern_data_points):
        sex = sexes[random.randint(0, 1)]

        sports = reduce(pick_sport(sex), all_sports, [])

        age = get_age(sports)

        location_x = random.uniform(location_x_bounds[0], location_x_bounds[1])
        location_y = random.uniform(location_y_bounds[0], location_y_bounds[1])

        data.append([age, sex, location_x, location_y, sports])

    return data


def generate_random_data():
    data = []
    random_data_ratio = 0.1
    for i in range(round(nb_pattern_data_points * random_data_ratio)):
        sex = sexes[random.randint(0, 1)]
        age = random.randint(age_bounds[0], age_bounds[1])
        location_x = random.uniform(location_x_bounds[0], location_x_bounds[1])
        location_y = random.uniform(location_y_bounds[0], location_y_bounds[1])

        random.shuffle(all_sports)
        sports = list(map(lambda sport: sport["Name"], all_sports[:random.randint(0, 5)]))

        data.append([age, sex, location_x, location_y, sports])

    return data


generate()
