var Stocks = function () {
    var $tbody;
    var existingData;
    var names;
    var date;
    var cssClass;
    function getDom() {
        $tbody = $('#myTable').find('tbody');
        names = [];
        existingData = [[]];
    }

    function setData(args) {
        var jsonData = JSON.parse(args);
        //existingData = jsonData;
        let prevValue;
        let cssClass = '';
        for (let i = 0; i < jsonData.length; i++) {
            const element = jsonData[i];
            let index = names.indexOf(element[0]);
            if (index == -1) {
                index = names.push(element[0]) - 1;
                cssClass = 'white';
            } else {
                prevValue = existingData[index][1];
                if (prevValue < element[1]) {
                    cssClass = 'red';
                } else {
                    cssClass = 'green';
                }
            }
            date = new Date;
            existingData[index] = [];
            existingData[index][0] = element[0];
            existingData[index][1] = element[1];
            existingData[index][2] = date.toLocaleTimeString();
            existingData[index][3] = cssClass;
        }
        _render();
    }

    function _render() {
        $tbody.html('');
        existingData.forEach(element => {
            $tbody.append('<tr>');
            $tbody.append('<td>' + element[0] + '</td>');
            $tbody.append('<td class="' + element[3] + '">' + element[1] + '</td>');
            $tbody.append('<td>' + date.toLocaleTimeString() + '</td>');
            $tbody.append('</tr>')
        });
    }
    return {
        init: function () {
            getDom();
            Websocket.init();
        },
        setData: function (args) {
            setData(args);
        }
    };
}();