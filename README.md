
# PWA Tranning

## Prerequisites

- Node & npm


## Cmd

- Get dependencies `npm install`
- Build app: `npm run build`
- Deploy app to firebase: `npm run deploy`


## To send notif

curl -X POST \
    --header "Authorization: key=<SERVER KEY>" \
    --Header "Content-Type: application/json" \
    https://fcm.googleapis.com/fcm/send \
    -d "{\"to\":\"<FCM TOKEN>\",\"notification\":{\"body\":\"Super notif from curl\"}"
