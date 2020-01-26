Для корректной работы необходимо созадть директорию config в корне проекта
c файлом default.json, в котором описать слудующие поля:

```
{
  "port": <the port on which it will work backend>,
  "mongoUri": "mongodb+srv://<login>:<password>@cluster0-14kwk.azure.mongodb.net/app?retryWrites=true&w=majority",
  "jwtSalt": <secret string required for creationjwtToken>,
  "baseUrl": "http://localhost:5000"
}
```