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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3741379310344828, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/api-14"], "isController": false}, {"data": [0.0, 500, 1500, "/api-13"], "isController": false}, {"data": [0.0, 500, 1500, "/api-16"], "isController": false}, {"data": [0.0, 500, 1500, "/api-15"], "isController": false}, {"data": [0.0, 500, 1500, "/api-10"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-1"], "isController": false}, {"data": [0.0, 500, 1500, "/api-12"], "isController": false}, {"data": [0.0, 500, 1500, "/api-9"], "isController": false}, {"data": [0.0, 500, 1500, "/api-8"], "isController": false}, {"data": [1.0, 500, 1500, "/bitrix/js/main/popup/dist/main.popup.bundle.js-25"], "isController": false}, {"data": [0.0, 500, 1500, "/api-6"], "isController": false}, {"data": [0.0, 500, 1500, "/api-5"], "isController": false}, {"data": [0.0, 500, 1500, "/api-18"], "isController": false}, {"data": [0.0, 500, 1500, "/api-4"], "isController": false}, {"data": [0.0, 500, 1500, "/api-17"], "isController": false}, {"data": [0.0, 500, 1500, "/api-19"], "isController": false}, {"data": [0.85, 500, 1500, "/-3"], "isController": false}, {"data": [0.0, 500, 1500, "/api-27"], "isController": false}, {"data": [0.0, 500, 1500, "/api-21"], "isController": false}, {"data": [0.0, 500, 1500, "/api-20"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-31"], "isController": false}, {"data": [1.0, 500, 1500, "/cart/-30"], "isController": false}, {"data": [1.0, 500, 1500, "/-32"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/-26"], "isController": false}, {"data": [0.0, 500, 1500, "/api-28"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/-23"], "isController": false}, {"data": [1.0, 500, 1500, "/-29"], "isController": false}, {"data": [1.0, 500, 1500, "/generate_204-2"], "isController": false}, {"data": [1.0, 500, 1500, "/lp/bonus/-24"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 290, 180, 62.06896551724138, 71.31379310344832, 34, 578, 35.0, 133.0, 253.89999999999998, 510.3899999999982, 108.1282624906786, 3865.7110044975766, 72.16440040082028], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api-14", 10, 10, 100.0, 35.4, 35, 36, 35.0, 36.0, 36.0, 36.0, 16.55629139072848, 5.238514072847682, 12.805256622516557], "isController": false}, {"data": ["/api-13", 10, 10, 100.0, 35.0, 35, 35, 35.0, 35.0, 35.0, 35.0, 16.58374792703151, 5.456117848258707, 16.940039386401327], "isController": false}, {"data": ["/api-16", 10, 10, 100.0, 35.0, 34, 36, 35.0, 36.0, 36.0, 36.0, 16.528925619834713, 5.438081095041323, 8.425878099173554], "isController": false}, {"data": ["/api-15", 10, 10, 100.0, 35.300000000000004, 34, 40, 35.0, 39.5, 40.0, 40.0, 16.55629139072848, 5.238514072847682, 23.10443398178808], "isController": false}, {"data": ["/api-10", 10, 10, 100.0, 35.300000000000004, 35, 36, 35.0, 36.0, 36.0, 36.0, 16.55629139072848, 5.238514072847682, 17.20302152317881], "isController": false}, {"data": ["/generate_204-1", 10, 0, 0.0, 83.0, 74, 109, 80.0, 107.10000000000001, 109.0, 109.0, 11.148272017837236, 1.3826470178372352, 3.603591833890747], "isController": false}, {"data": ["/api-12", 10, 10, 100.0, 34.9, 34, 36, 35.0, 35.9, 36.0, 36.0, 16.58374792703151, 5.456117848258707, 7.4011453150912105], "isController": false}, {"data": ["/api-9", 10, 10, 100.0, 35.0, 35, 35, 35.0, 35.0, 35.0, 35.0, 16.55629139072848, 5.308037562086093, 16.847319950331126], "isController": false}, {"data": ["/api-8", 10, 10, 100.0, 34.9, 34, 35, 35.0, 35.0, 35.0, 35.0, 16.528925619834713, 5.438081095041323, 7.9577737603305785], "isController": false}, {"data": ["/bitrix/js/main/popup/dist/main.popup.bundle.js-25", 10, 0, 0.0, 43.300000000000004, 40, 47, 44.0, 46.8, 47.0, 47.0, 21.41327623126338, 536.6911469486081, 12.588664346895074], "isController": false}, {"data": ["/api-6", 10, 10, 100.0, 34.9, 34, 35, 35.0, 35.0, 35.0, 35.0, 16.528925619834713, 5.438081095041323, 6.731017561983471], "isController": false}, {"data": ["/api-5", 10, 10, 100.0, 35.1, 34, 36, 35.0, 36.0, 36.0, 36.0, 16.528925619834713, 5.438081095041323, 11.024664256198347], "isController": false}, {"data": ["/api-18", 10, 10, 100.0, 35.1, 35, 36, 35.0, 35.9, 36.0, 36.0, 16.528925619834713, 5.368672520661157, 11.412060950413224], "isController": false}, {"data": ["/api-4", 10, 10, 100.0, 70.10000000000001, 69, 72, 70.0, 71.8, 72.0, 72.0, 15.552099533437016, 4.920781493001555, 14.413029743390357], "isController": false}, {"data": ["/api-17", 10, 10, 100.0, 35.0, 34, 36, 35.0, 35.9, 36.0, 36.0, 16.55629139072848, 5.447084540562914, 11.786656663907285], "isController": false}, {"data": ["/api-19", 10, 10, 100.0, 35.3, 35, 36, 35.0, 36.0, 36.0, 36.0, 16.528925619834713, 5.229855371900826, 11.81559917355372], "isController": false}, {"data": ["/-3", 10, 0, 0.0, 421.4, 348, 578, 374.5, 577.7, 578.0, 578.0, 8.710801393728223, 1489.8013869229096, 6.311928353658537], "isController": false}, {"data": ["/api-27", 10, 10, 100.0, 35.1, 35, 36, 35.0, 35.9, 36.0, 36.0, 23.148148148148145, 7.32421875, 10.217737268518519], "isController": false}, {"data": ["/api-21", 10, 10, 100.0, 35.0, 34, 36, 35.0, 35.9, 36.0, 36.0, 16.528925619834713, 5.299263946280992, 6.666451446280992], "isController": false}, {"data": ["/api-20", 10, 10, 100.0, 34.9, 34, 35, 35.0, 35.0, 35.0, 35.0, 16.528925619834713, 5.368672520661157, 8.635717975206612], "isController": false}, {"data": ["/generate_204-31", 10, 0, 0.0, 40.4, 37, 45, 40.0, 44.9, 45.0, 45.0, 25.188916876574307, 3.124016057934509, 8.142120591939547], "isController": false}, {"data": ["/cart/-30", 10, 0, 0.0, 99.89999999999999, 89, 127, 96.5, 125.5, 127.0, 127.0, 21.929824561403507, 5958.36759868421, 15.976219846491228], "isController": false}, {"data": ["/-32", 10, 0, 0.0, 91.1, 85, 96, 92.5, 95.9, 96.0, 96.0, 22.727272727272727, 3886.929598721591, 16.557173295454547], "isController": false}, {"data": ["/actions/-26", 10, 0, 0.0, 107.60000000000001, 85, 139, 96.0, 139.0, 139.0, 139.0, 19.41747572815534, 2056.181735436893, 14.202821601941746], "isController": false}, {"data": ["/api-28", 10, 10, 100.0, 34.9, 34, 35, 35.0, 35.0, 35.0, 35.0, 23.148148148148145, 7.615831163194445, 11.82273582175926], "isController": false}, {"data": ["/actions/-23", 10, 0, 0.0, 198.5, 121, 278, 205.5, 277.1, 278.0, 278.0, 14.326647564469916, 1517.0968391833812, 10.479159204871062], "isController": false}, {"data": ["/-29", 10, 0, 0.0, 123.0, 91, 144, 127.5, 143.3, 144.0, 144.0, 20.491803278688522, 3504.46056928791, 14.988633452868854], "isController": false}, {"data": ["/generate_204-2", 10, 0, 0.0, 40.5, 37, 45, 40.0, 44.9, 45.0, 45.0, 12.150668286755772, 1.5069676488456867, 3.927608596597813], "isController": false}, {"data": ["/lp/bonus/-24", 10, 0, 0.0, 153.20000000000002, 133, 177, 156.0, 176.4, 177.0, 177.0, 17.123287671232877, 153.541042380137, 12.675246147260275], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 180, 100.0, 62.06896551724138], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 290, 180, "404/Not Found", 180, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/api-14", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-13", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-16", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-15", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-10", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-12", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-9", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-8", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-6", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-5", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-18", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-4", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-17", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-19", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-27", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-21", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/api-20", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api-28", 10, 10, "404/Not Found", 10, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
