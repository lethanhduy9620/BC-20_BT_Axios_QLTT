var userService = new UserService();

function getListTeacher() {
    userService.getListUserApi()
        .then(function (result) {
            renderData(checkTeacher(result.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

getListTeacher();

function checkTeacher(arrayUser) {
    var arrTeacher = arrayUser.filter(function (user) {
        return user.loaiND == "GV";
    });
    return arrTeacher;
}

function renderData(arrayData) {
    var contentHTML = "";
    arrayData.forEach(function (user) {
        contentHTML += `
        <div class="card-item col-6 col-lg-3">
            <div class="card-background">
                <div class="img-container">
                    <img src="./../../assets/img/${user.hinhAnh}" alt="${user.hinhAnh}">
                </div>
                <div class="card-content">
                    <h6 class="sub-title">${user.ngonNgu}</h6>
                    <h2 class="main-title">${user.hoTen}</h2>
                    <p>${user.moTa}</p>
                </div>
            </div>
        </div>`;
    });
    queryElement(".wavyCards .card-container").innerHTML = contentHTML;
}

