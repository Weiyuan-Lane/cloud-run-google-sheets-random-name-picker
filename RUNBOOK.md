

## Compare versioning of secrets via CLI (After showing from console)

console link - https://console.cloud.google.com/security/secret-manager?project=fine-program-267007

Show all secrets

Show principle of least privilege

```
echo `gcloud secrets versions access latest --secret="test_secret"`
echo `gcloud secrets versions access 3 --secret="test_secret"`
echo `gcloud secrets versions access 2 --secret="test_secret"`
echo `gcloud secrets versions access 1 --secret="test_secret"`
```

## Load secrets in local environment 

```
npm run get-secrets
```

## Start the server

```
npm run start
```

## Show debug route and then add more secrets

```
echo "Hello Jakarta 2" | gcloud secrets versions add debug-secret-two --data-file=-
```
