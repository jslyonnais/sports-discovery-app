import random
import csv

nb_data_points = 10000
age_bounds = [1, 99]
sexes = ["f", "m"]
location_x_bounds = [-90, 90]
location_y_bounds = [-180, 180]
all_sports = ["hockey", "tennis", "volleyball", "soccer", "football"]


def generate():
    headers = ["age", "sex", "location_x", "location_y", "sports"]
    data = [headers]

    for i in range(nb_data_points):
        age = random.randint(age_bounds[0], age_bounds[1])
        sex = sexes[random.randint(0, 1)]
        location_x = random.uniform(location_x_bounds[0], location_x_bounds[1])
        location_y = random.uniform(location_y_bounds[0], location_y_bounds[1])
        random.shuffle(all_sports)
        sports = all_sports[:random.randint(0, len(all_sports))]

        data.append([age, sex, location_x, location_y, sports])

    with open('fake_data.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(data)


generate()
