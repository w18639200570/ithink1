/*angular.module('routeapp',['ngRoute'])
            .config(['$routeProvider', function($routeProvider){
                $routeProvider
                .when('/',{template:'Welcome'})
                .when('/list',{templateUrl:'list.html'})
                .when('/nedit',{templateUrl:'nedit.html'})
                .when('/info',{templateUrl:'info.html'})
                .otherwise({redirectTo:'/'});
            }]);   */
var list;
var nm=0;
function typ (obj) {
    if(obj==='首页banner')
        {return 0;}
    if(obj==='找职位banner')
      	{return 1;}
    if(obj==='找精英banner')
    	{return 2;}
    if(obj==='行业大图')
		{return 3;}
}
function state (obj) {
	if(obj==='草稿')
      	{return 1;}	    		
    if(obj==='上线') 
    	{return 2;}
}
function tob(obj) {
    var a=obj+'';
    var b=[];
	for(var i=0,j=0;i+1<10;i++){
		if(a[i]!=='-'){
          	b[j]=a[i];j++;
		}
	}
	return b;
}
var app = angular.module('routeapp', ['ui.router']);
      app.controller('listctr',function ($scope,$http) {
      		$scope.Get=function (pge,type,stat,at,end) {
      			if(at){var at1=at.valueOf();}
      			if(end){var end1=end.valueOf()}
      			$http({
    			method:'get',
    			url:'/api/a/article/search',
    			params: {page:pge,type:typ(type),status:state(stat),startAt:at1,endAt:end1}
    		}).success(function(respone){
    			console.log(respone);
    			$scope.list=respone.data;
    		})};
    		$scope.ste=function (obj) {
    			switch (obj){
    				case 1:
    					return "草稿";break;
    				case 2:
    					return "上线";break;
    			}
    		};
    		$scope.type=function (obj) {
    			switch (obj){
    				case 0:
    					return "首页banner ";break;
    				case 1:
    					return "找职位banner";break;
    				case 2:
    					return "找精英banner";break;
    				case 3:
    					return "行业大图";break;
    			}
    		};
    		$scope.data=function (obj) {
    			var yy=parseInt(obj/100000000000);
    			var mm=parseInt(obj/1000000000%100);
    			var dd=parseInt(obj/10000000%100);
    			var hh=parseInt(obj/100000%100);
    			var mi=parseInt(obj/1000%100);
    			var ss=parseInt(obj%100);
    			return '20'+yy+'年'+mm+'月'+dd+'日'+hh+':'+mi+':'+ss;
    		};
    		$scope.msclear=function () {
    			$scope.dataf='';
    			$scope.datat='';
    			$scope.stus='';
    			$scope.TYPE='';
    		}
    	});
  //  angular 上传返回码不正确
       app.controller('neditctr',function ($scope,$http) {
		  $scope.suBmit=function (title,type,url) {
			  var file = document.querySelector('input[type=file]').files[0];
         /*     var fd=new FormData;
              fd.append('name','admin');
              fd.append('pwd','123456');
              fd.append('title',title);
              fd.append('type',typ(type));
              fd.append('status',2);
              fd.append('url',url);
              fd.append('file', file); */
              // console.log({'name':'admin','pwd':'123456','title':title,'type':typ(type),'status':2,'url':url,'file':file});
              $scope.str = $.param({"name":"admin","pwd":"123456","title":title,"type":typ(type),"status":2,"url":url,"file":file});
              console.log($scope.str);
              $http  ({
                  method:'post',
                  url:'/api/a/u/article',
                  data: $scope.str
              }).success(function (respone) {
                  alert("uplaod success");
              });
          }});
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('list', {
            url:'/list',
            templateUrl: 'list.html',
            controller: 'listctr'
       });
    $stateProvider.state('nedit', {
            url:'/nedit',
            templateUrl: 'nedit.html',
            controller: 'neditctr'
       });
    $stateProvider.state('info', {
            url:'/info',
            templateUrl: 'info.html'
       });
}]);
app.directive('fileModel',function ($parse) {
	return {
		restrict:'AEC',
		link:function (scope,element,attrs) {
			var model=$parse(attrs.fileModel);
			var modelSetter=model.assign;
			element.bind('change',function () {
				scope.$apply(function () {
					modelSetter(scope,element[0].files[0]);
                });
            });
			}		
		};
   });
app.service('fileUpload',function ($http) {
	this.uploadFileToUrl=function (file,uploadUrl,Type,Title) {
		var fd=new FormData();
        fd.append('name','admin');
        fd.append('pwd','123456');
        fd.append('title',Title);
        fd.append('type',typ(Type));
        fd.append('status',2);
        fd.append('url','www.baidu.com');
		fd.append('img',file);
	//	fd.append('content',editor.txt.text());
		$http.post(uploadUrl,fd,{
            headers: { 'Content-Type': undefined},
            transformRequest: angular.identity
		}).success(function () {
			alert("upload file success!");
        }).error(function () {
			alert("upload file error!");
        });
    }
});
app.controller("submitModule",function ($scope,fileUpload) {
	$scope.uploadFile=function () {
		var file=$scope.myFile;
		var uploadUrl='/api/a/u/article';
		fileUpload.uploadFileToUrl(file,uploadUrl,$scope.Type,$scope.Title);
    };
    $scope.checkUrl=function (str) {
        var patt1 = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
        arr = str.match(patt1);
        return !arr ;
    };
    $scope.Isdisable=false;
    $scope.Watch=function () {
        if (Type==='首页banner'||Type==='找职位banner'||Type==='找精英banner'||Type==='行业大图') {
            $scope.Isdisable = true;
        }
        else  $scope.Isdisable=false;
		};
});

	
