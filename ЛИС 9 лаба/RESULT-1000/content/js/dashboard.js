/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 37.41724137931035, "KoPercent": 62.58275862068965};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.18594827586206897, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/api-14"], "isController": false}, {"data": [0.0, 500, 1500, "/api-13"], "isController": false}, {"data": [0.0, 500, 1500, "/api-16"], "isController": false}, {"data": [0.0, 500, 1500, "/api-15"], "isController": false}, {"data": [0.0, 500, 1500, "/api-10"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-1"], "isController": false}, {"data": [0.0, 500, 1500, "/api-12"], "isController": false}, {"data": [0.0, 500, 1500, "/api-9"], "isController": false}, {"data": [0.0, 500, 1500, "/api-8"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.js-25"], "isController": false}, {"data": [0.0, 500, 1500, "/api-6"], "isController": false}, {"data": [0.0, 500, 1500, "/api-5"], "isController": false}, {"data": [0.0, 500, 1500, "/api-18"], "isController": false}, {"data": [0.0, 500, 1500, "/api-4"], "isController": false}, {"data": [0.0, 500, 1500, "/api-17"], "isController": false}, {"data": [0.0, 500, 1500, "/api-19"], "isController": false}, {"data": [0.0045, 500, 1500, "/-3"], "isController": false}, {"data": [0.0, 500, 1500, "/api-27"], "isController": false}, {"data": [0.0, 500, 1500, "/api-21"], "isController": false}, {"data": [0.0, 500, 1500, "/api-20"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-31"], "isController": false}, {"data": [0.253, 500, 1500, "/cart/-30"], "isController": false}, {"data": [0.348, 500, 1500, "/-32"], "isController": false}, {"data": [0.202, 500, 1500, "/actions/-26"], "isController": false}, {"data": [0.0, 500, 1500, "/api-28"], "isController": false}, {"data": [0.206, 500, 1500, "/actions/-23"], "isController": false}, {"data": [0.232, 500, 1500, "/-29"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-2"], "isController": false}, {"data": [0.147, 500, 1500, "/lp/bonus/-24"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 29000, 18149, 62.58275862068965, 1687.3351034482769, 34, 104281, 35.0, 2722.0, 8753.900000000001, 54146.93000000001, 51.57306747713446, 1800.1566177637653, 34.40813659893848], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api-14", 1000, 1000, 100.0, 35.126000000000005, 34, 89, 35.0, 36.0, 36.94999999999993, 39.0, 8.112273870365865, 2.566774154295449, 6.274336821611098], "isController": false}, {"data": ["/api-13", 1000, 1000, 100.0, 35.035999999999994, 34, 109, 35.0, 35.0, 36.0, 44.99000000000001, 8.109773899503683, 2.6763204232491, 8.28400732312583], "isController": false}, {"data": ["/api-16", 1000, 1000, 100.0, 35.17100000000004, 34, 289, 35.0, 35.0, 36.0, 47.99000000000001, 8.112405490476036, 2.6840020321575753, 4.135425455105948], "isController": false}, {"data": ["/api-15", 1000, 1000, 100.0, 35.099000000000004, 34, 49, 35.0, 36.0, 37.0, 39.99000000000001, 8.112405490476036, 2.566815799720933, 11.320925240127202], "isController": false}, {"data": ["/api-10", 1000, 1000, 100.0, 35.15899999999998, 34, 83, 35.0, 36.0, 37.0, 39.99000000000001, 8.109773899503683, 2.5659831478898365, 8.426561942453043], "isController": false}, {"data": ["/generate_204-1", 1000, 0, 0.0, 87.08900000000015, 67, 273, 84.0, 108.0, 122.0, 173.97000000000003, 323.93909944930357, 40.17604065435698, 104.71078312277291], "isController": false}, {"data": ["/api-12", 1000, 1000, 100.0, 34.93100000000002, 34, 84, 35.0, 35.0, 36.0, 45.99000000000001, 8.109773899503683, 2.6844935547571933, 3.619303390696467], "isController": false}, {"data": ["/api-9", 1000, 1000, 100.0, 35.00199999999999, 34, 93, 35.0, 35.0, 36.0, 44.0, 8.109773899503683, 2.683812460464852, 8.252328518830895], "isController": false}, {"data": ["/api-8", 1000, 1000, 100.0, 34.95700000000004, 34, 79, 35.0, 35.0, 36.0, 47.98000000000002, 8.109773899503683, 2.6776826118337818, 3.9044126293508934], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.js-25", 1000, 0, 0.0, 94.31499999999998, 39, 406, 85.0, 121.0, 194.0, 312.98, 8.319744417451496, 208.5217192127858, 4.891099745415821], "isController": false}, {"data": ["/api-6", 1000, 1000, 100.0, 34.88399999999997, 34, 93, 35.0, 35.0, 36.0, 43.0, 8.109708131604345, 2.677660896609331, 3.3024885653115343], "isController": false}, {"data": ["/api-5", 1000, 1000, 100.0, 35.092999999999954, 34, 77, 35.0, 35.0, 36.0, 53.960000000000036, 8.109708131604345, 2.678682529762629, 5.409111966685319], "isController": false}, {"data": ["/api-18", 1000, 1000, 100.0, 34.834999999999965, 34, 64, 35.0, 35.0, 36.0, 46.960000000000036, 8.112405490476036, 2.6812767709381187, 5.601045587662654], "isController": false}, {"data": ["/api-4", 1000, 1000, 100.0, 216.89200000000005, 68, 21052, 70.0, 71.0, 72.0, 118.84000000000015, 8.108984755108661, 2.735531163842037, 7.462459518427668], "isController": false}, {"data": ["/api-17", 1000, 1000, 100.0, 34.784, 34, 65, 35.0, 35.0, 35.0, 38.99000000000001, 8.112405490476036, 2.6816174285905507, 5.7753355493721], "isController": false}, {"data": ["/api-19", 1000, 1000, 100.0, 35.04100000000001, 34, 68, 35.0, 36.0, 36.0, 38.0, 8.112339679887077, 2.56679497683927, 5.799055318044277], "isController": false}, {"data": ["/-3", 1000, 140, 14.0, 28962.444999999996, 825, 104281, 10772.5, 63994.899999999994, 103988.75, 104246.93, 9.589290680168387, 1412.138096049332, 6.94848992645014], "isController": false}, {"data": ["/api-27", 1000, 1000, 100.0, 34.93299999999996, 34, 48, 35.0, 35.0, 36.0, 38.0, 8.431561019207097, 2.667798603733495, 3.721743731134382], "isController": false}, {"data": ["/api-21", 1000, 1000, 100.0, 34.77199999999999, 34, 72, 35.0, 35.0, 36.0, 38.99000000000001, 8.112668743509865, 2.679319767937111, 3.272004092841381], "isController": false}, {"data": ["/api-20", 1000, 1000, 100.0, 34.84300000000009, 34, 83, 35.0, 35.0, 35.0, 38.0, 8.112668743509865, 2.6827264550071392, 4.238552517361112], "isController": false}, {"data": ["/generate_204-31", 1000, 0, 0.0, 51.42499999999996, 34, 97, 44.0, 86.0, 89.0, 90.0, 8.708373972411872, 1.0800424750940505, 2.814913852410478], "isController": false}, {"data": ["/cart/-30", 1000, 0, 0.0, 2203.46, 87, 32551, 1623.0, 3130.4999999999995, 5014.9, 17149.910000000003, 8.547300762419228, 2322.3277348290753, 6.22684215699682], "isController": false}, {"data": ["/-32", 1000, 0, 0.0, 1754.2519999999986, 81, 16793, 1495.5, 2869.8999999999996, 4744.75, 9174.470000000001, 1.8179240035049575, 310.909428341867, 1.3243860416159163], "isController": false}, {"data": ["/actions/-26", 1000, 2, 0.2, 3414.855999999998, 83, 35649, 1713.5, 8688.0, 16637.3, 32483.72, 8.319329129299012, 879.2187854221436, 6.085134294770469], "isController": false}, {"data": ["/api-28", 1000, 1000, 100.0, 35.855999999999945, 34, 70, 35.0, 36.0, 36.0, 69.0, 8.431632111027731, 2.7885564703290866, 4.306390228581547], "isController": false}, {"data": ["/actions/-23", 1000, 6, 0.6, 4847.872999999999, 275, 63752, 1753.0, 10038.199999999992, 19946.14999999995, 56219.86, 8.094871898652203, 852.1119078095277, 5.92095610555713], "isController": false}, {"data": ["/-29", 1000, 0, 0.0, 2617.2479999999982, 86, 32781, 1656.0, 4685.5, 8703.9, 31464.41, 8.423038695439768, 1440.5594055861593, 6.160992170785533], "isController": false}, {"data": ["/generate_204-2", 1000, 0, 0.0, 43.635000000000005, 34, 228, 41.0, 50.0, 57.0, 122.99000000000001, 331.23550844650543, 41.08096637959589, 107.06929032792316], "isController": false}, {"data": ["/lp/bonus/-24", 1000, 1, 0.1, 4043.7059999999915, 127, 63763, 1855.0, 8913.4, 16877.75, 32867.66, 8.186655751125665, 73.33631005679491, 6.060044003274662], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 149, 0.8209818722794644, 0.5137931034482759], "isController": false}, {"data": ["404/Not Found", 17993, 99.14044850955976, 62.0448275862069], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 91.105.192.100:80 [/91.105.192.100] failed: Connection timed out: connect", 7, 0.03856961816078021, 0.02413793103448276], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 29000, 18149, "404/Not Found", 17993, "502/Bad Gateway", 149, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 91.105.192.100:80 [/91.105.192.100] failed: Connection timed out: connect", 7, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api-14", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-13", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-16", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-15", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-10", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-12", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-9", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-8", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-6", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-5", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-18", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-4", 1000, 1000, "404/Not Found", 993, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 91.105.192.100:80 [/91.105.192.100] failed: Connection timed out: connect", 7, "", "", "", "", "", ""], "isController": false}, {"data": ["/api-17", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-19", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/-3", 1000, 140, "502/Bad Gateway", 140, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-27", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-21", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-20", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/actions/-26", 1000, 2, "502/Bad Gateway", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-28", 1000, 1000, "404/Not Found", 1000, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/actions/-23", 1000, 6, "502/Bad Gateway", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/lp/bonus/-24", 1000, 1, "502/Bad Gateway", 1, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
