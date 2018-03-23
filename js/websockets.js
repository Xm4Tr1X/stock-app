var Websocket = function () {
    var stockWebSocket;
    function connect() {
        stockWebSocket = new WebSocket("ws://stocks.mnet.website");
    }
    connect();
    stockWebSocket.onopen = function () {
        console.log('Websocket Connection Established');
    }

    stockWebSocket.onclose = function () {
        console.error('Websocket Connection Terminated');
        connect();
    }
    stockWebSocket.onmessage = function (event) {
        Stocks.getData(event.data);
    }
    stockWebSocket.onerror = function(err){
        console.log('Error occured in websocket connection' + err);
        connect();
    }
    return {
        init: function () {
            connect();
        }
    };
}();