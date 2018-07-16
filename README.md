# Email Status
A simple webpage to check if an email address exists or not.

### Example
| Input                 | Output    | Meaning                        |
| --------------------- | :-------- | -------                        |
| contact@param.me      | Green     | Email exists                   |
| somerando@example.com | Red       | Email does not exist           |
| hafaxohubi@larjem.com | Yellow    | Email exists but is disposable |

### How It Works
The script requests data from the [Mailboxlayer API](https://mailboxlayer.com), a REST API which validates and verifies email addresses.
If an email address exists the page turns green, otherwise it turns red. If the API detects that the email address exists but is disposable, the page turns yellow.


### Coming Soon
The API provides much more information about email addresses that could be implemented into the site. An example result:
```
{
  "email":"contact@param.me",
  "did_you_mean":"",
  "user":"contact",
  "domain":"param.me",
  "format_valid":true,
  "mx_found":true,
  "smtp_check":true,
  "catch_all":null,
  "role":false,
  "disposable":false,
  "free":false,
  "score":0.96
}
```
In the future, auto-correction will be implemented,  as well as the score (rating) of the trustworthiness of an email address.
