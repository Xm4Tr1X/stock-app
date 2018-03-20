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
    }
    stockWebSocket.onmessage = function (event) {
        Stocks.setData(event.data);
    }
    return {
        init: function () {
            connect();
        }
    };
}();