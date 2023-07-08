window.BangDangKyController = function ($scope, $location, $http) {
  $scope.bdk = "Danh Sách Đã Đăng Ký";
  let apiUrl = "http://localhost:3000/khoahoc";
  $scope.getData = function () {
    //gọi api sử dụng phương thức get để lấy toàn bộ dữ liệu
    $http.get(apiUrl).then(function (reponse) {
      // sau khi đón được thành công dữ liệu thì dữ liệu sẽ nằm ở
      //reponse
      if (reponse.status == 200) {
        $scope.danhsach = reponse.data;
      }
    });
  };
  $scope.getData();
};
