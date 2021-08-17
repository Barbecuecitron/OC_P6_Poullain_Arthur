import requests
import json
film_50 = []

def get_next_movie(url):
    print(url.json()['next'])
    if url.json()['next'] is not None:
        return url.json()['next']
    return None


def search_for_movies(url,parameters):
    current_movie = requests.get(url, params=parameters)
    movies_list = []
   # print(movie_to_check['next'])
   # while movie_to_check['next'] != None:
   #     movies_list.append(movie_to_check)
   #     movie_to_check = requests.get(movie_to_check['next'] ,params=parameters).json()
   # print(movie_list)
    while get_next_movie(current_movie) is not None:
        print("searching")
        next_movie = get_next_movie(current_movie)
        movies_list.append(current_movie)
        current_movie = requests.get(next_movie)

    print(movies_list)

if __name__ == "__main__":
    query = {'year': '1950'}
    search_for_movies("http://localhost:8000/api/v1/titles/?page=65&year=1950", query)
    pass