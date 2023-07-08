window.DangKyController = function ($scope, $location, $http) {
  $scope.dk = "Đăng Ký Khóa Học";
  $scope.tt = "Đăng Ký Khóa Học";
  //Tạo đối 1 tượng kiểm tra dữ liệu
  $scope.kiemTraDuLieu = {
    hoten: false,
    sodienthoai1: false,
    sodienthoai2: false,
    email1: false,
    email2: false,
    cmnd1: false,
    cmnd2: false,
    cs: false,
    trinhdo: false,
  };
  let apiUrl = "http://localhost:3000/khoahoc";
  $scope.getData = function () {
    //gọi api sử dụng phương thức get để lấy toàn bộ dữ liệu
    $http.get(apiUrl).then(function (response) {
      // sau khi đón được thành công dữ liệu thì dữ liệu sẽ nằm ở
      //reponse
      if (response.status == 200) {
        $scope.danhsach = response.data;
      }
    });
  };
  $scope.getData();
  $scope.onClose = function () {
    $scope.inputValue = {
      hoten: "",
      sodienthoai: "",
      email: "",
      cmnd: "",
    };
    $scope.editId = 0;
  };
  $scope.OnSubmit = function () {
    let flag = false;
    if (!$scope.inputValue || !$scope.inputValue.hoten) {
      // họ tên bỏ trống
      $scope.kiemTraDuLieu.hoten = true; //có lỗi
      flag = true;
    } else {
      $scope.kiemTraDuLieu.hoten = false;
    }
    if (!$scope.inputValue || !$scope.inputValue.cs) {
      // họ tên bỏ trống
      $scope.kiemTraDuLieu.cs = true; //có lỗi
      flag = true;
    } else {
      $scope.kiemTraDuLieu.cs = false;
    }
    if (!$scope.inputValue || !$scope.inputValue.trinhdo) {
      // họ tên bỏ trống
      $scope.kiemTraDuLieu.trinhdo = true; //có lỗi
      flag = true;
    } else {
      $scope.kiemTraDuLieu.trinhdo = false;
    }
    let checkdt = /^(0|\+84)(\d{9}|\d{10})$/;
    if (!$scope.inputValue || !$scope.inputValue.sodienthoai) {
      // họ tên bỏ trống
      $scope.kiemTraDuLieu.sodienthoai1 = true; //có lỗi
      flag = true;
    } else {
      $scope.kiemTraDuLieu.sodienthoai1 = false;
      if (!checkdt.test($scope.inputValue.sodienthoai)) {
        $scope.kiemTraDuLieu.sodienthoai2 = true;
        flag = true;
      } else {
        $scope.kiemTraDuLieu.sodienthoai2 = false;
      }
    }

    let mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // console.log(check);
    if (!$scope.inputValue || !$scope.inputValue.email) {
      $scope.kiemTraDuLieu.email1 = true; //có lỗi
      flag = true;
    } else {
      $scope.kiemTraDuLieu.email1 = false;
      if (!mail.test($scope.inputValue.email)) {
        $scope.kiemTraDuLieu.email2 = true; //có lỗi
        flag = true;
      } else {
        $scope.kiemTraDuLieu.email2 = false;
      }
    }
    let checkcmd = /^\d{9}$/;
    if (!$scope.inputValue || !$scope.inputValue.cmnd) {
      // họ tên bỏ trống
      $scope.kiemTraDuLieu.cmnd1 = true; //có lỗi
      flag = true;
    } else {
      $scope.kiemTraDuLieu.cmnd1 = false;
      if (!checkcmd.test($scope.inputValue.cmnd)) {
        $scope.kiemTraDuLieu.cmnd2 = true;
        flag = true;
      } else {
        $scope.kiemTraDuLieu.cmnd2 = false;
      }
    }
    if (!flag) {
      let newId = {
        hoten: $scope.inputValue.hoten,
        sodt: $scope.inputValue.sodienthoai,
        email: $scope.inputValue.email,
        cmnd: $scope.inputValue.cmnd,
        cs: $scope.inputValue.cs,
        trinhdo: $scope.inputValue.trinhdo,
        loinhan: $scope.inputValue.loinhan,
      };
      $http.post(apiUrl, newId).then(function (response) {
        if (response.status == 201) {
          $scope.getData();
        }
      });
      $scope.onClose();
      alert("Đăng Kí Thành Công");
      $location.path("bangdangky");
    }
  };
};
