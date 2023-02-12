# Project REST-Rant

REST-Rant is an app where users can review restaurants.

| Method      | Path        | Purpose       |
|  ---        |    ----     |           --- |
| Get      | /       | The home page   |
| Get   | /places        | Index page listing all places      |
| Get      | /places/new      | New form for a place   |
| Post   | /places        | Create a new place      |
| Get      | /places:id       | Show one place in detail (Associated rants, new rant form, delete rant button)s   |
| Get   | /places:id/edit        | Edit form for a place      |
| Put      | /places:id       | Make changes to existing place   |
| Delete   | /places:id         | Delete a place      |
| Post      | /places:id/rant       | Add rant to a place   |
| Delete   | /places:id/rant:rantId  | Delete a rant      |