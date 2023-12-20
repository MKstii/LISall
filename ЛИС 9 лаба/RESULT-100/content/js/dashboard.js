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

    var data = {"OkPercent": 37.93103448275862, "KoPercent": 62.06896551724138};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.28155172413793106, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/api-14"], "isController": false}, {"data": [0.0, 500, 1500, "/api-13"], "isController": false}, {"data": [0.0, 500, 1500, "/api-16"], "isController": false}, {"data": [0.0, 500, 1500, "/api-15"], "isController": false}, {"data": [0.0, 500, 1500, "/api-10"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-1"], "isController": false}, {"data": [0.0, 500, 1500, "/api-12"], "isController": false}, {"data": [0.0, 500, 1500, "/api-9"], "isController": false}, {"data": [0.0, 500, 1500, "/api-8"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.js-25"], "isController": false}, {"data": [0.0, 500, 1500, "/api-6"], "isController": false}, {"data": [0.0, 500, 1500, "/api-5"], "isController": false}, {"data": [0.0, 500, 1500, "/api-18"], "isController": false}, {"data": [0.0, 500, 1500, "/api-4"], "isController": false}, {"data": [0.0, 500, 1500, "/api-17"], "isController": false}, {"data": [0.0, 500, 1500, "/api-19"], "isController": false}, {"data": [0.5, 500, 1500, "/-3"], "isController": false}, {"data": [0.0, 500, 1500, "/api-27"], "isController": false}, {"data": [0.0, 500, 1500, "/api-21"], "isController": false}, {"data": [0.0, 500, 1500, "/api-20"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-31"], "isController": false}, {"data": [0.515, 500, 1500, "/cart/-30"], "isController": false}, {"data": [0.815, 500, 1500, "/-32"], "isController": false}, {"data": [0.505, 500, 1500, "/actions/-26"], "isController": false}, {"data": [0.0, 500, 1500, "/api-28"], "isController": false}, {"data": [0.785, 500, 1500, "/actions/-23"], "isController": false}, {"data": [0.505, 500, 1500, "/-29"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-2"], "isController": false}, {"data": [0.54, 500, 1500, "/lp/bonus/-24"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2900, 1800, 62.06896551724138, 225.54517241379264, 34, 21032, 35.0, 889.9000000000001, 1033.9499999999998, 1179.859999999997, 121.44053601340033, 4341.989202195876, 81.01015330559045], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api-14", 100, 100, 100.0, 35.02, 34, 42, 35.0, 35.900000000000006, 36.0, 41.93999999999997, 4.676174888940846, 1.4795709609539396, 3.6167290156651855], "isController": false}, {"data": ["/api-13", 100, 100, 100.0, 34.780000000000015, 34, 38, 35.0, 35.0, 35.0, 37.97999999999999, 4.676174888940846, 1.548297945405658, 4.776639583820435], "isController": false}, {"data": ["/api-16", 100, 100, 100.0, 34.84999999999999, 34, 41, 35.0, 35.0, 36.0, 40.95999999999998, 4.676174888940846, 1.542407061024082, 2.383753214870236], "isController": false}, {"data": ["/api-15", 100, 100, 100.0, 34.94999999999999, 34, 39, 35.0, 35.0, 36.0, 38.969999999999985, 4.676174888940846, 1.4795709609539396, 6.52563859013327], "isController": false}, {"data": ["/api-10", 100, 100, 100.0, 35.030000000000015, 34, 39, 35.0, 36.0, 36.94999999999999, 38.97999999999999, 4.675737597606022, 1.4794325992425306, 4.858383597512508], "isController": false}, {"data": ["/generate_204-1", 100, 0, 0.0, 81.54000000000002, 68, 124, 75.0, 104.60000000000002, 108.0, 123.92999999999996, 101.41987829614604, 12.578441937119676, 32.78318331643002], "isController": false}, {"data": ["/api-12", 100, 100, 100.0, 34.730000000000004, 34, 38, 35.0, 35.0, 35.94999999999999, 37.989999999999995, 4.676174888940846, 1.544370689151274, 2.086925707271452], "isController": false}, {"data": ["/api-9", 100, 100, 100.0, 34.699999999999996, 34, 38, 35.0, 35.0, 35.0, 37.97999999999999, 4.675956233049659, 1.5521526202889742, 4.758150776208735], "isController": false}, {"data": ["/api-8", 100, 100, 100.0, 34.779999999999994, 34, 38, 35.0, 35.0, 36.0, 37.989999999999995, 4.675956233049659, 1.5462620113625738, 2.251217209856916], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.js-25", 100, 0, 0.0, 77.38000000000001, 40, 174, 79.0, 87.0, 87.94999999999999, 173.62999999999982, 4.715424152402508, 118.1849227259867, 2.772153652096006], "isController": false}, {"data": ["/api-6", 100, 100, 100.0, 34.74000000000003, 34, 37, 35.0, 35.0, 35.0, 37.0, 4.675956233049659, 1.5462620113625738, 1.9041735831852615], "isController": false}, {"data": ["/api-5", 100, 100, 100.0, 35.06999999999999, 34, 70, 35.0, 35.0, 35.0, 69.67999999999984, 4.675956233049659, 1.5482255476713738, 3.1188262765360517], "isController": false}, {"data": ["/api-18", 100, 100, 100.0, 34.68, 34, 36, 35.0, 35.0, 35.0, 36.0, 4.676393565282455, 1.5483703499111485, 3.2287209479049754], "isController": false}, {"data": ["/api-4", 100, 100, 100.0, 279.44, 69, 21032, 70.0, 70.0, 71.0, 20822.42999999989, 4.674644727000748, 1.6088264596578161, 4.288940886195774], "isController": false}, {"data": ["/api-17", 100, 100, 100.0, 34.70000000000001, 34, 38, 35.0, 35.0, 35.94999999999999, 37.989999999999995, 4.676393565282455, 1.5581889496820052, 3.329190340909091], "isController": false}, {"data": ["/api-19", 100, 100, 100.0, 35.01, 34, 38, 35.0, 36.0, 36.94999999999999, 38.0, 4.676612262077351, 1.479709348547912, 3.3430470467193567], "isController": false}, {"data": ["/-3", 100, 0, 0.0, 825.8799999999998, 592, 1344, 788.0, 1046.5000000000002, 1159.2999999999997, 1343.4099999999996, 54.525627044711015, 9325.176143334242, 39.509780534351144], "isController": false}, {"data": ["/api-27", 100, 100, 100.0, 35.01, 34, 38, 35.0, 35.0, 36.0, 37.989999999999995, 4.83863163497363, 1.5309732907533748, 2.1358022451250784], "isController": false}, {"data": ["/api-21", 100, 100, 100.0, 34.78, 34, 38, 35.0, 35.0, 35.0, 37.97999999999999, 4.676612262077351, 1.552370384768274, 1.8861727189823692], "isController": false}, {"data": ["/api-20", 100, 100, 100.0, 34.699999999999996, 34, 38, 35.0, 35.0, 36.0, 37.97999999999999, 4.6768309793284075, 1.5465512756056494, 2.4434614979889626], "isController": false}, {"data": ["/generate_204-31", 100, 0, 0.0, 39.480000000000004, 35, 47, 38.0, 46.0, 46.0, 47.0, 5.264266161297115, 0.6528923852389977, 1.7016329095599074], "isController": false}, {"data": ["/cart/-30", 100, 0, 0.0, 839.0299999999999, 107, 1245, 820.5, 1122.7, 1184.2999999999997, 1245.0, 5.0337259639585215, 1367.6731267460736, 3.66714801671197], "isController": false}, {"data": ["/-32", 100, 0, 0.0, 448.18, 93, 1185, 415.5, 840.7, 887.3999999999996, 1184.1299999999997, 5.238344683080147, 895.8896387179151, 3.81621595075956], "isController": false}, {"data": ["/actions/-26", 100, 0, 0.0, 953.6299999999999, 90, 1134, 975.5, 1062.0, 1088.35, 1133.9099999999999, 4.704775346977182, 498.2086475976241, 3.4412858739120207], "isController": false}, {"data": ["/api-28", 100, 100, 100.0, 34.61999999999998, 34, 35, 35.0, 35.0, 35.0, 35.0, 4.83863163497363, 1.6000560978855178, 2.4712933057531328], "isController": false}, {"data": ["/actions/-23", 100, 0, 0.0, 502.84, 122, 1030, 428.5, 851.7, 958.8499999999999, 1029.6899999999998, 4.637573621481241, 491.0916920767055, 3.3921314868061034], "isController": false}, {"data": ["/-29", 100, 0, 0.0, 909.1899999999999, 160, 1212, 936.0, 1078.8, 1106.95, 1211.93, 4.8095421315890725, 822.55818982361, 3.517917047422085], "isController": false}, {"data": ["/generate_204-2", 100, 0, 0.0, 38.940000000000005, 34, 57, 37.0, 45.0, 45.94999999999999, 56.909999999999954, 109.05125408942203, 13.524911395856051, 35.249965921483096], "isController": false}, {"data": ["/lp/bonus/-24", 100, 0, 0.0, 953.1300000000001, 131, 1320, 1078.5, 1204.0, 1251.6499999999999, 1319.4799999999998, 4.6356387910254035, 41.564930088772485, 3.4314591832004453], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 1799, 99.94444444444444, 62.03448275862069], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 91.105.192.100:80 [/91.105.192.100] failed: Connection timed out: connect", 1, 0.05555555555555555, 0.034482758620689655], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2900, 1800, "404/Not Found", 1799, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 91.105.192.100:80 [/91.105.192.100] failed: Connection timed out: connect", 1, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api-14", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-13", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-16", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-15", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-10", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-12", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-9", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-8", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-6", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-5", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-18", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-4", 100, 100, "404/Not Found", 99, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 91.105.192.100:80 [/91.105.192.100] failed: Connection timed out: connect", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["/api-17", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-19", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-27", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-21", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-20", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-28", 100, 100, "404/Not Found", 100, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
