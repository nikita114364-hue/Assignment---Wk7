# Testing Checklist

Record the actual response and mark Pass or Fail after running each request.

| ID | Endpoint | Method | Input | Expected result | Status | Actual result | Pass/Fail |
|---|---|---|---|---|---|---|---|
| P01 | `/api/tasks` | POST | Valid title and description | Task created | 201 |  |  |
| P02 | `/api/tasks` | GET | None | All tasks returned | 200 |  |  |
| P03 | `/api/tasks?completed=true` | GET | Completed filter | Completed tasks returned | 200 |  |  |
| P04 | `/api/tasks?completed=false` | GET | Incomplete filter | Incomplete tasks returned | 200 |  |  |
| P05 | `/api/tasks/:id` | GET | Existing ID | Task returned | 200 |  |  |
| P06 | `/api/tasks/:id` | PATCH | `isCompleted: true` | Task updated | 200 |  |  |
| P07 | `/api/tasks/:id` | DELETE | Existing ID | Task deleted | 200 |  |  |
| N01 | `/api/tasks` | POST | Missing title | Clear validation error | 400 |  |  |
| N02 | `/api/tasks` | POST | Empty title | Clear validation error | 400 |  |  |
| N03 | `/api/tasks` | POST | Title over 100 characters | Clear validation error | 400 |  |  |
| N04 | `/api/tasks?completed=abc` | GET | Invalid filter | Clear validation error | 400 |  |  |
| N05 | `/api/tasks/not-an-id` | GET | Invalid ID | Clear validation error | 400 |  |  |
| N06 | `/api/tasks/000000000000000000000000` | GET | Unknown ID | Not found message | 404 |  |  |
| N07 | `/api/tasks/000000000000000000000000` | PATCH | Update unknown task | Not found message | 404 |  |  |
| N08 | `/api/tasks/000000000000000000000000` | DELETE | Delete unknown task | Not found message | 404 |  |  |
