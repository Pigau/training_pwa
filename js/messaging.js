
const messaging = firebase.messaging();

messaging.requestPermission()
    .then(() => {
        console.log('granted !');
        return messaging.getToken();
    })
    .then(token => console.log(token))
    .catch(() => console.log('refused'));

messaging.onMessage(payload => alert(JSON.stringify(payload)));
