| Method     | Path                          | Data                               | Description                                                                                  |
|------------|-------------------------------|------------------------------------|----------------------------------------------------------------------------------------------|
| GET        | /boards/lists                 |                                    | Get a list all `list`s.                                                                      |
| POST       | /boards/lists                 | {"title": string}                  | Create a new `list` with a `title`.                                                          |
| GET        | /boards/lists/<id: int>       |                                    | Get the data of a `list`.                                                                    |
| PUT/PATCH  | /boards/lists/<id: int>       | {"title": string}                  | Update the title of a `list`.                                                                |
| DELETE     | /boards/lists/<id: int>       |                                    | Delete a `list`.                                                                             |
| GET        | /boards/cards                 |                                    | Get a list all `card`s.                                                                      |
| POST       | /boards/cards                 | {"title": string, "to_list": int}  | Create a new `card` with a `title` and set it belong to the `list` which `id` == `to_list`.  |
| GET        | /boards/cards/<id: int>       |                                    | Get the data of a `card`.                                                                    |
| PUT/PATCH  | /boards/cards/<id: int>       | {"title": string}                  | Update the title of a `card`.                                                                |
| DELETE     | /boards/cards/<id: int>       |                                    | Delete a `card`.                                                                             |
| PUT        | /boards/cards/<id: int>/move  | {"order": int, "to_list": int}     | Move a `card` to a `list` which id == `to_list` with a new `order`.                          |
