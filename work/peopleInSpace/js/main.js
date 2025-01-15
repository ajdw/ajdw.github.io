function getData(){
  var results = document.getElementById('results');
  results.innerHTML = '';
  
  var people = document.getElementById('people');
  people.innerHTML = '';
  
  
  $.ajax({
    url: 'http://api.open-notify.org/astros.json',
    dataType: 'json',
    type: 'GET',
 
    success:function(data) {
      
      console.log(data.number);
      results.innerHTML += data.number;
      results.style.display = 'block';
      
      for(var i = 0; data.people.length > i; i++){
      people.innerHTML += data.people[i].name + '<br>' + '<br>';
      people.style.display = 'block';   
  }
      }
  });
      
}

document.getElementById('button').addEventListener('click', getData, false);

