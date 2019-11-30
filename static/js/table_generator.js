function dateParser(date_str) {
    date_str = date_str.split(" ");
    date = date_str[0].split("/");
    base_str_date = date[2] + "-" + date[1] + "-" + date[0];
    base_hour_str = "T" + date_str[1];
    return new Date(base_str_date + base_hour_str);
}

function createCell(row, text) {
    let cell = row.insertCell()
    let cell_text = document.createTextNode(text)
    cell.appendChild(cell_text)
}

function createHeadCell(row, text) {
    let head_cell = document.createElement("th");
    let head_cell_text = document.createTextNode(text);
    head_cell.appendChild(head_cell_text);
    row.appendChild(head_cell);
    return head_cell
}

function generateTableHead(table, param_Dict, param_order) {
    if (Object.keys(param_Dict) < 1) {
        return;
    }
    let thead = table.createTHead();
    let row = thead.insertRow();
    param_order.forEach(key => {
        let thead_cell = createHeadCell(row, key)
        $(thead_cell).attr("scope", "col")
    });
    return table
}

function genarateRowCelles(telem_param, row, param_order){
    for (let param_index = 1; param_index < param_order.length; param_index++) {
        createCell(row, telem_param[param_order[param_index]]);
    }
}

function generateAllTable(table, data) {
    let time_sorted_data = $.extend(true, [], sortByNewestTime(data));
    let tbody = table.appendChild(document.createElement("tbody"));
    time_sorted_data.forEach(telem_param => {
        let row = tbody.insertRow();
        $(row).addClass(telem_param["Color"])
        let headCell = createHeadCell(row, telem_param[_param_order[0]]);
        genarateRowCelles(telem_param, row, _param_order);
        $(headCell).attr("scope", "row");
    });
    return table
}

function sortByNewestTime(param_Dict) {

    return param_Dict.sort((a, b) => dateParser(b["Sat Time"]) - dateParser(a["Sat Time"]));
}

function refresh_table(table_params, param_order, table_div_id) {
    let table_div = document.getElementById(table_div_id);
    table_div.innerHTML = "";

    let table = document.createElement("table");
    table.className = "highlight white black-text";

    let head = generateTableHead(table, table_params, param_order);

    table_div.appendChild(generateAllTable(head, table_params));
}