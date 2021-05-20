var database = 'http://localhost:5555/sources';

function start(){
    getCourses(renderCourses);
    hendleCreateForm();
}

start();

// lấy dữ liệu database
function getCourses(callback){
    fetch(database).then( (response)=>{
        return response.json();
    }).then((callback));
}

// render course
function renderCourses(courses){
    var listCourses = document.getElementById('list-courses');
    var htmls = courses.map( (course)=>{
        
        return `
            <li class = "course-item-${course.id}">
                <h3 class ="itemName-${course.id}" > ${course.name} </h3> 
                <p class ="itemDescription-${course.id}"  > ${course.description} </p>
                <div class= "updata-items-${course.id}"></div>
                
                <button class="updata" id="btnUpdata-item-${course.id}"   onclick ="hendleUpdateForm(${ course.id })">Update</button>
                <button id="delete" onclick = "handleDeleteCourses(${course.id})">xóa</button>

            </li>
        `;
    });
    listCourses.innerHTML = htmls.join('') ;
}


//  xu ly lấy data tì client nhập vào
function hendleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = () =>{
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('#description1').value;

        if(name === '' && description === ''){
            name  = 'Name chưa có dữ liệu nào !!!';
            description  = 'Description chưa có dữ liệu nào !!!';
            alert(
                'dữ liệu Name trống'
                + ' \ndữ liệu description trống'
            );
        } 
        if(name === '') {
            name  = 'Name chưa có dữ liệu nào !!!';
            alert( ' dữ liệu name trống');
        }
        if(description === ''){
            description  = 'Description chưa có dữ liệu nào !!!';
            alert( 'dữ liệu description trống');
        }
        
        var formdata = {
            name: name ,
            description: description
        };
        
        createCourses(formdata , ()=>{
            getCourses(renderCourses);
        }) ;
    };
}
// xy ly dữ liệu nhập vào 
function xylydata(dataName , dataDescription){
    if(dataName === ''  ){
        dataName  = 'Name chưa có dữ liệu nào !!!';
    }else if(dataName === '') {
        dataDescription = 'Description chưa có dữ liệu nào !!!';
    }else if(dataName === '' , dataDescription === ''){
        dataName  = 'Name chưa có dữ liệu nào !!!';
        dataDescription  = 'Name chưa có dữ liệu nào !!!';
    }
}
// create  data
function createCourses(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(database, options).then( function(response){
        response.json();
    }).then(callback);
}

// delete 
function handleDeleteCourses(id){
    var options = {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(database + '/' + id, options).then( function(response){
        response.json();
    }).then( ()=>{
        // cách 1
        //getCourses(renderCourses);
        // cách 2
        var courseItem =document.querySelector('.course-item-' + id);
        if(courseItem){
            courseItem.remove();
        };
    });
}



// updata 
function handleUpdateCourses(data , id){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(database + '/' + id, options).then( function(response){
        response.json();
    }).then( ()=>{
        getCourses(renderCourses);
    });
}


function renderupdate(dataName , dataDescription){
    return `
        <input type="text" id="inputDataName" name="updateName" value="${dataName.innerHTML}" >
        <input type="text" id="inputDataDescription" name="updateDescription" value="${ dataDescription.innerHTML}" >
    `;
}


//  xu ly update data
function hendleUpdateForm(id){ 
    var valueName = document.querySelector('.itemName-'+ id);
    var valueDescription = document.querySelector('.itemDescription-'+ id);

    var updataBtn = document.querySelector('#btnUpdata-item-'+ id);
    var list_update = document.querySelector('.updata-items-'+ id);


    list_update.innerHTML = renderupdate(valueName , valueDescription);

    updataBtn.onclick = ()=>{
        var name = document.querySelector('#inputDataName').value;
        var description = document.querySelector('#inputDataDescription').value;
        try{
            if(name === '' && description === ''){
                name  = 'Name chưa có dữ liệu nào !!!';
                description  = 'Description chưa có dữ liệu nào !!!';
                alert(
                    'dữ liệu Name trống'
                    + ' \ndữ liệu description trống'
                );
            } 
            if(name === '' && description !== '') {
                name  = 'Name chưa có dữ liệu nào !!!';
                alert( ' dữ liệu name trống');
            }
            if(name !== '' && description === ''){
                description  = 'Description chưa có dữ liệu nào !!!';
                alert( 'dữ liệu description trống');
            }
            var formdata = {
                name: name ,
                description: description
            };
            handleUpdateCourses(formdata , id) ;
            list_update.innerHTML = '';
        }catch(err){
            alert( err.message);
        }
    }
}
