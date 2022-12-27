document.getElementById('issueInputForm').addEventListener('submit', function(){
  if(document.getElementById("issueDescription").value == ''){
    alert("Please Enter a valid issue to submit");
  }
  else{
    submitIssue();
  }
});

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

function closeIssue(id){
 
  
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  
}

function deleteIssue(id){
    const issues = JSON.parse(localStorage.getItem('issues')); 
    const remainingIssues = issues.filter(issue => issue.id != id);
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    fetchIssues();
}


const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  const openIssue = document.getElementById("openIssue");
  const openCounter = issues.filter(issue => issue.status == "Open");
  openIssue.innerText = openCounter.length;
  const counter = document.getElementById("issueCounter");
  counter.innerText = issues.length;
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    if (status === 'Closed'){
      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span style="color: green;" class="label label-info"> ${status} </span></p>
                              <h3><del> ${description} </del></h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
    else{
      issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span style="color:red;" class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
  }
}
