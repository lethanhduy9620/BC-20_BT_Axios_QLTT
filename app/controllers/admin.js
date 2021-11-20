var userService = new UserService();
var validation = new Validation();
var userList = [];

function getListUser() {
    userService.getListUserApi()
        .then(function (result) {
            renderData(result.data);
            userList = result.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

getListUser();

function renderData(arrayData) {
    var contentHTML = "";
    arrayData.forEach(function (user, index) {
        contentHTML += `
         <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" onclick="getUser(${user.id})" data-toggle="modal"
                data-target="#myModal">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        </tr>`;
    });

    getElement("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getFormInput() {
    var id = ""; //Server automatically generates ID for each user.
    var taiKhoan = getElement("TaiKhoan").value;
    var hoTen = getElement("HoTen").value;
    var matKhau = getElement("MatKhau").value;
    var email = getElement("Email").value;
    var loaiND = getElement("loaiNguoiDung").value;
    var ngonNgu = getElement("loaiNgonNgu").value;
    var moTa = getElement("MoTa").value;
    var hinhAnh = getElement("HinhAnh").value;
    var user = new User(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
    return user;
}

function checkValidation(userObject, mode) {
    // * Check validation
    var isValid = true;

    //Check Username
    isValid &= validation.checkEmpty(userObject.taiKhoan, "alertTaiKhoan", "Tài khoản");

    //Username input is not empty and only for feature "Add User"
    if (isValid && mode == "add") {
        isValid &= validation.checkDuplicate(userObject.taiKhoan, "alertTaiKhoan", "Tài khoản", userList);
    }

    //Check Name
    isValid &= validation.checkEmpty(userObject.hoTen, "alertHoTen", "Họ tên") && validation.checkFormat(validation.regExName, userObject.hoTen, "alertHoTen", "Họ tên");

    //Check password
    isValid &= validation.checkEmpty(userObject.matKhau, "alertMatKhau", "Mật khẩu") && validation.checkFormat(validation.regExPassword, userObject.matKhau, "alertMatKhau", "Mật khẩu");

    //Check email
    isValid &= validation.checkEmpty(userObject.email, "alertEmail", "Email") && validation.checkFormat(validation.regExEmail, userObject.email, "alertEmail", "Email");

    //Check image
    isValid &= validation.checkEmpty(userObject.hinhAnh, "alertHinhAnh", "Hình ảnh");

    //Check type
    isValid &= validation.checkSelect("loaiNguoiDung", "alertNguoiDung", "Loại người dùng");

    //Check language
    isValid &= validation.checkSelect("loaiNgonNgu", "alertNgonNgu", "Loại ngôn ngữ");

    //Check description
    isValid &= validation.checkEmpty(userObject.moTa, "alertMoTa", "Mô tả") && validation.checkFormat(validation.regExDescription, userObject.moTa, "alertMoTa", "Mô tả");

    return isValid;
}

//Modify the interface for Adding User
getElement("btnThemNguoiDung").onclick = function () {
    queryElement(".modal-header .modal-title").innerHTML = "Add User";
    resetForm();
    var footerButton = `<button class="btn btn-primary" onclick="resetForm()">Reset Form</button>`;
    var addButton = `<button class="btn btn-success" onclick="addUser()">Add User</button>`;
    footerButton += addButton;
    queryElement(".modal-footer").innerHTML = footerButton;
    queryElement(".modal-footer").innerHTML = footerButton;
    getElement("TaiKhoan").disabled = false;
}

function addUser() {
    var user = getFormInput();
    if (checkValidation(user, "add")) {
        userService.addUserApi(user)
            .then(function () {
                getListUser();
                queryElement(".close").click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function fillForm(objectUser) {
    getElement("TaiKhoan").value = objectUser.taiKhoan;
    getElement("HoTen").value = objectUser.hoTen;
    getElement("MatKhau").value = objectUser.matKhau;
    getElement("Email").value = objectUser.email;
    getElement("HinhAnh").value = objectUser.hinhAnh;
    getElement("MoTa").value = objectUser.moTa;
    getElement("loaiNguoiDung").value = objectUser.loaiND;
    getElement("loaiNgonNgu").value = objectUser.ngonNgu;

}

function getUser(id) {
    //Modify the interface for Updating User
    queryElement(".modal-header .modal-title").innerHTML = "Edit User";
    var footerButton = `<button class="btn btn-success" onclick="updateUser(${id})">Edit User</button>`;
    queryElement(".modal-footer").innerHTML = footerButton;
    getElement("TaiKhoan").disabled = true;

    userService.getUserApi(id)
        .then(function (result) {
            fillForm(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updateUser(id) {
    var user = getFormInput();
    if (checkValidation(user, "update")) {
        userService.updateUserApi(id, user)
            .then(function () {
                getListUser();
                queryElement(".close").click();
            })
            .catch(function (error) {
                console.log(error);
            });
        getElement("TaiKhoan").disabled = false;
    }
}

function deleteUser(id) {
    userService.deleteUserApi(id)
        .then(function () {
            getListUser();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function resetForm() {
    getElement("TaiKhoan").value = "";
    getElement("HoTen").value = "";
    getElement("MatKhau").value = "";
    getElement("Email").value = "";
    getElement("HinhAnh").value = "";
    getElement("MoTa").value = "";
    getElement("loaiNguoiDung").selectedIndex = "0";
    getElement("loaiNgonNgu").selectedIndex = "0";
}