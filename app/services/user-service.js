function UserService() {
    this.getListUserApi = function () {
        return axios({
            url: "https://6183cae691d76c00172d1b55.mockapi.io/api/BC20_BT-Axios_Le-Thanh-Duy",
            method: "GET",
        });
    }

    this.addUserApi = function (objectUser) {
        return axios({
            url: "https://6183cae691d76c00172d1b55.mockapi.io/api/BC20_BT-Axios_Le-Thanh-Duy",
            method: "POST",
            data: objectUser,
        });
    }


    this.getUserApi = function (userID) {
        return axios({
            url: `https://6183cae691d76c00172d1b55.mockapi.io/api/BC20_BT-Axios_Le-Thanh-Duy/${userID}`,
            method: "GET",
        });
    }

    this.updateUserApi = function (userID, objectUser) {
        return axios({
            url: `https://6183cae691d76c00172d1b55.mockapi.io/api/BC20_BT-Axios_Le-Thanh-Duy/${userID}`,
            method: "PUT",
            data: objectUser,
        });
    }


    this.deleteUserApi = function (userID) {
        return axios({
            url: `https://6183cae691d76c00172d1b55.mockapi.io/api/BC20_BT-Axios_Le-Thanh-Duy/${userID}`,
            method: "DELETE",
        });
    }

}