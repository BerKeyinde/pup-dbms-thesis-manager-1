function loadAll() {
  var thesis_list_api = '/thesis/create/api';
  $.get(thesis_list_api, {}, function(response) {
    response.faculty_data.forEach(function(faculty) {
      var thesis_adviser = faculty.full_name;
      $('.thesis_adviser').append('<option value="' + thesis_adviser + '">' + thesis_adviser + '</option>');
      $('.faculty-list').append('<li>' + thesis_adviser + '</li>')
    });

    response.student_data.forEach(function(student){
      var thesis_proponent = student.full_name;
      //$('.thesis_proponents').append('<option value="' + thesis_proponent + '">' + thesis_proponent + '</option>');
      var select = document.getElementById('thesis_proponents');
        var opt = document.createElement('option'); 
            opt.value = thesis_proponent;
            opt.innerHTML = thesis_proponent;
            select.appendChild(opt);
    });

    response.department_data.forEach(function(department){
      var thesis_department = department.name
      var select = document.getElementById('department-list');
        var opt = document.createElement('option'); 
            opt.value = thesis_department;
            opt.innerHTML = thesis_department + '/' + department.college + '/' + department.university;
            select.appendChild(opt);
    });
  });
}

function onForm(event){
  var d = $('.thesis_proponents').val();
  var data = $(event.target).serializeArray();

  var thesis = {};
  var j = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].name == 'thesis_proponents') {
      thesis['thesis_proponent_' + j] = d[j];
      j++;
    } else {thesis[data[i].name] = data[i].value;}
  }

  var thesis_api = '/api/thesis';
  $.post(thesis_api, thesis, function(response) {
    console.log('data', response)
    if (response.status = 'OK') {
       alert('Registration success');
       window.location.replace("/");
     } else {
       alert('Something went wrong');
     }
  });
  return false;
}

loadAll();
$('.thesis-entry').submit(onForm);