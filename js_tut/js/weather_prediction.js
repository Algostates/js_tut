let fileIp = document.getElementById('uploadfile')
    pageNumSpan = document.getElementById('pageNum'),
    csvData = {},
    totalRows = 0,
    headings = null,
    numOfRowsPerPage = 10,
    pageNum = 0,
    newStart = 0,
    newEnd = numOfRowsPerPage;

function setPageNum(){
    pageNumSpan.textContent = pageNum;
}

document.getElementById('nextBtn').onclick = function() {
    newStart = newEnd;
    newEnd = newEnd + numOfRowsPerPage;
    console.log(newStart, newEnd);
    if(newStart === newEnd)
        return;
    if(newEnd >= totalRows){
        newEnd = totalRows;
        alert('its the last one, No more pages remaining');
        console.log('Last Page...');
    }
    makepage(newStart, newEnd);
    pageNum++;
    setPageNum();
}
document.getElementById('prevBtn').onclick = function() {
    if(newStart <= 0){
        alert('no previuos pages.');
        console.log('no previous pages, newStart:', newStart);
        return;
    }
    newStart = newStart - numOfRowsPerPage;
    newEnd = newEnd - numOfRowsPerPage;
    makepage(newStart, newEnd);
    pageNum--;
    setPageNum();
}
let ourTable = document.querySelector('.datatable_container table');
console.log('weather prediction js file loaded.')

function resetTable(){
    ourTable.innerHTML = '';
    newStart = 0;
    newEnd = numOfRowsPerPage;
    pageNum = 0;
}

fileIp.onchange = function(e){
    
    let file = e.target.files[0];
    let freader = new FileReader();
    // reset the table if we select another csv file to be show in table without refreshing the page!!
    resetTable() // 1 second  after closing file dialog, previous table will get removed!!
    freader.onload = function(fe){
        csvData = csv2obj(fe.target.result);
        headings = Object.keys(csvData).sort();
        totalRows = csvData[headings[0]].length;
        console.log(csvData);
        createHeadings(csvData);
        newEnd = newEnd >= totalRows ? totalRows : newEnd;
        makepage(newStart, newEnd);
        pageNum++;
        setPageNum();
    }

    freader.readAsText(file);
    
}

// PPIQ.SQUII1200,"PPI output index level 3 - Rail, water, air and other transport",2020.06,1237,1238
function msplit(stringToBeSplited, delimiter){
    let chBlackListed = '\'\"', // string of single quote and double quote i.e., "'""
        finalSplits = [], 
        stringBuffer = '', 
        blfound = [], 
        strarr = Array.from(stringToBeSplited), 
        szOfStr = stringToBeSplited.length;
    function saveStr(s){
        finalSplits.push(s);
    }
    strarr.forEach((currentCharacter, i) => {
        //console.log('stringBuffer:', stringBuffer);
        if(chBlackListed.indexOf(currentCharacter) !== -1) // if current char is a quote
            // match two double/single quotes so we will find the whole string in b/w caontaining delimiter (here comma)            
            if(blfound.length) // if its end quote
                blfound.pop(); // remove the start quote from array
            else // else if its start quote
                blfound.push(currentCharacter); // save hte start quote inside array
        else{ // if it is not a quote
            if(currentCharacter !== delimiter) // then check if current char is not a delimiter (here comma)
                stringBuffer += currentCharacter; // keep concatenating the characters to the string buffer
            else{ // if it is a delimiter (here comma)
                // terminate the string and save
                if(blfound.length !== 0)// if it is the case then it's getting characters b/w quotes so we dont want to complete the string
                    stringBuffer += currentCharacter; // save the delimiter because its part of quoted string
                else{
                    saveStr(stringBuffer); // all strings are saved here one by one except last one
                    // reset the string buffer variable
                    stringBuffer = '';
                }
            }
            if(i === szOfStr - 1) // last character hit
                saveStr(stringBuffer); // save the last string here
        } 
    });
    return finalSplits;
}

let clone = o => JSON.parse(JSON.stringify(o));

function csv2obj(csv){
    let rws = csv.split('\n');
    let headings = rws[0].split(',').map(heading => heading.trim());
    let tmpObj = {}, 
        tmparr=[];
    
    headings.forEach(heading => {
        tmpObj[heading] = [];
    });
    for(let i=1; i<rws.length; ++i){
        tmparr = msplit(rws[i], ',');
        tmparr.forEach((val, j) => {
            tmpObj[headings[j]].push(val);
        });
    }
    return tmpObj;
}

/*
just for reference 
<tr> // first create this
    <th>Firstname</th> // then these
    <th>Lastname</th>
    <th>Age</th>
  </tr>
*/

// here in this function we'll setup the table we need
function createHeadings(data){
    let numOfRows = data[headings[0]].length;
    // lets first create only headings of our table
    // just to see how it is going to render

    let tableHeadingsContainer = document.createElement('tr'); // this will contain the th
    let th = null;
    headings.forEach(heading => {
        th = document.createElement('th');
        // now we have the th. so lets put the heading into it
        th.textContent = heading;
        // now we have the heading, lets put that as a child of our tableheadings container
        tableHeadingsContainer.appendChild(th);
    });
    // now until now we have our tr containing all the ths
    // so its time for attaching this tr as a child of our table
    ourTable.appendChild(tableHeadingsContainer); // that is it!!!!!
}


function makepage(start, end){
    console.log('start:', start, 'end:', end)
    let dataRow = null, dataField = null;

    function getDataRowCreated(rowNumber){
        let tmp = document.createElement('tr');
        headings.forEach(heading => {
            dataField = document.createElement('td');
            dataField.textContent = csvData[heading][rowNumber];
            tmp.appendChild(dataField);
            console.log('heading', heading, 'rownumber: ', rowNumber);
        });
        console.log('tmp', tmp);
        return tmp;
    }

    // replace/update this table rendering code with pagination
    // lets run a for loop numOfRows times
    for(let rowNumber=start; rowNumber<end; ++rowNumber){
        console.log('dataRow', dataRow)
        dataRow = getDataRowCreated(rowNumber)
        console.log('dataRow', dataRow)
        if(rowNumber%2)
            dataRow.classList.add('odd_row');
        else
            dataRow.classList.add('even_row');

        ourTable.appendChild(dataRow);
    }

}


// let my click = function pageRedirect() {
//     window.location.replace("https://www.tutorialrepublic.com/");
// }      
// setTimeout("pageRedirect()", 10000);