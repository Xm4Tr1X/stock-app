var Stocks = function () {
    var $tbody;
    var existingData;
    var names;
    var date;
    var cssClass;
    function init() {
        $tbody = $('#myTable').find('tbody');
        names = [];
        existingData = [[]];
    }


    function setData(index, element, updateTime, cssClass) {
        existingData[index][0] = element[0];
        existingData[index][1] = element[1];
        existingData[index][2] = updateTime;
        existingData[index][3] = cssClass;
        existingData[index][4] = new Date;
    }
    function getData(args) {
        var jsonData = JSON.parse(args);
        //existingData = jsonData;
        let prevValue;
        let updateTime;
        let cssClass = '';
        for (let i = 0; i < jsonData.length; i++) {
            const element = jsonData[i];
            let index = names.indexOf(element[0]);
            if (index == -1) {
                index = names.push(element[0]) - 1;
                cssClass = 'white';
            } else {
                prevValue = existingData[index][1];
            }
            existingData[index] = [];
            if (prevValue < element[1]) {
                cssClass = 'green';
            } else {
                cssClass = 'red';
            }
            if (existingData[index][0] === element[0]) {
                updateTime = moment().fromNow();
            } else {
                updateTime = moment(existingData[index][4]).fromNow();
            }
            setData(index, element, updateTime, cssClass);
        }
        _render();
    }

    function _render() {
        $tbody.html('');
        existingData.forEach(element => {
            $tbody.append('<tr>');
            $tbody.append('<td>' + element[0] + '</td>');
            $tbody.append('<td class="' + element[3] + '">' + element[1] + '</td>');
            $tbody.append('<td>' + element[2] + '</td>');
            $tbody.append('</tr>')
        });
    }
    return {
        init: function () {
            init();
            Websocket.init();
        },
        getData: function (args) {
            getData(args);
        }
    };
}();