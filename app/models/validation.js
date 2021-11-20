function Validation() {
    this.stringName = `^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ` + `ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ` + `ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$`;
    this.regExName = new RegExp(this.stringName);


    this.regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
    
    this.regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.regExDescription = /^[a-zA-Z0-9-ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s,()?'";.:+-]{0,60}$/;

    this.checkEmpty = function (value, tagID, inputName) {
        if (value.trim() != "") {
            document.getElementById(tagID).innerHTML = "";
            document.getElementById(tagID).style.display = "none";
            return true;
        }
        document.getElementById(tagID).innerHTML = inputName + " không được để trống";
        document.getElementById(tagID).style.display = "block";
        return false;
    }


    /**
     * Input: Nhập useraccount và nhấn nút add hoặc update
     * Process: 
     * - Sau khi nhấn nút add hoặc update
     * - Gọi lên server để lấy dữ liệu mới nhất 
     * - Duyệt mảng để so sánh giá trị nhập vào và giá trị có trong mảng:
     * + Nếu trùng thì return false và xuất ra câu thông báo
     * + Nếu không trùng thì return true
     * 
     * 
     * Output: Nếu hợp lệ thì không xuất ra thông báo gì, nếu không thì hiện thông báo bị trùng
     */


    this.checkDuplicate = function (value, tagID, inputName, usersArray) {
        var isExist = false;
        isExist = usersArray.some(function (user) {
            return value == user.taiKhoan;
        });

        //Detect duplicate username
        if (isExist) {
            document.getElementById(tagID).innerHTML = inputName + " không được trùng";
            document.getElementById(tagID).style.display = "block";
            return false;
        }
        //No duplicate username
        document.getElementById(tagID).innerHTML = "";
        document.getElementById(tagID).style.display = "none";
        return true;
    }

    this.checkSelect = function (selectID, tagID, inputName) {
        if (document.getElementById(selectID).selectedIndex != 0) {
            //Valid
            document.getElementById(tagID).innerHTML = "";
            document.getElementById(tagID).style.display = "none";
            return true;
        }
        //Invalid
        document.getElementById(tagID).innerHTML = inputName + " không hợp lệ";
        document.getElementById(tagID).style.display = "block";
        return false;
    }

    this.checkFormat = function (regEx, value, tagID, inputName) {
        if (value.match(regEx)) {
            //Valid
            document.getElementById(tagID).innerHTML = "";
            document.getElementById(tagID).style.display = "none";
            return true;
        }
        else {
            //Invalid
            document.getElementById(tagID).innerHTML = inputName + " không hợp lệ";
            document.getElementById(tagID).style.display = "block";
            return false;
        }
    }
}