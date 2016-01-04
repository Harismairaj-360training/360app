angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopover, $ionicModal, Course)
{
	$scope.userProfile = {
		title:'',
		scf:0,
		fav:{
			"111":111,
			"333":333
		},
		enr:{
			"222":222,
			"444":444,
			"555":555,
			"666":666,
		},
		occ:{
			"1":1,
		},
		isTabHide:false
	};
	
	$scope.logout = function(){
		$state.go('login');
	};
	
	$scope.countFav = function(){
		var i = 0;
		for(fav in $scope.userProfile.fav){
			i++;
		}
		return i;
	};
	
	// .fromTemplateUrl() method
	$ionicPopover.fromTemplateUrl('templates/menu.html', {
		scope: $scope
	}).then(function(menu) {
		$scope.menu = menu;
	});

	$scope.openMenu = function($event) {
		$scope.menu.show($event);
	};
	$scope.closeMenu = function() {
		$scope.menu.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.loginModal = modal;
	});
	
	$scope.openLoginModal = function()
	{
		$scope.loginModal.show();
	};
	
	$scope.closeLoginModal = function()
	{
		$scope.loginModal.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/signup.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.signupModal = modal;
	});
	
	$scope.openSignupModal = function()
	{
		$scope.signupModal.show();
	};
	
	$scope.closeSignupModal = function()
	{
		$scope.signupModal.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/trouble.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.troubleModal = modal;
	});
	
	$scope.openTroubleModal = function()
	{
		$scope.troubleModal.show();
	};
	
	$scope.closeTroubleModal = function()
	{
		$scope.troubleModal.hide();
	};
})

.controller('LoginCtrl', function($scope, $ionicModal, $state)
{
	$scope.login = function(){
		$state.go('tab.category_list',{"catId":0});
	};
	
	$scope.guest = function(){
		$state.go('tab.category_list',{"catId":0});
	};
})

.controller('OnlineCourseCatListCtrl', function($scope, $state, $http, $stateParams, Category)
{
	$scope.userProfile.isTabHide = false;
	
	$scope.getCategoryList = function(catId)
	{
		$http.get('services/courses/category.json').then(function(obj)
		{
			Category.set(obj.data);
			$scope.categories = Category.getAt(catId);
		}
		,function(err)
		{
			console.error('ERR', err);
		});
		
		$scope.$broadcast('scroll.refreshComplete');
	};
	
	$scope.refreshCategoryList = function()
	{
		$scope.getCategoryList($stateParams.catId);
	};
	
	$scope.onCategory = function(category)
	{
		$scope.userProfile.title = category.title;
		var temp = Category.getAt(category.catId);
		if(temp.length == 0)
		{
			$state.go('tab.course_list',{"catId":category.catId});
		}
		else
		{
			$state.go('tab.category_list',{"catId":category.catId});
		}
	};
	
	$scope.getCategoryList($stateParams.catId);
})

.controller('OnlineCourseListCtrl', function($scope, $state, $http, $stateParams, $ionicModal, Course)
{
	$scope.userProfile.isTabHide = false;
	
	$scope.onCourse = function(course)
	{
		switch($stateParams.type)
		{
			case 'cat':
				$state.go('tab.course_details',{"cid":course.cid});
			break;
			case 'fav':
				$state.go('tab.fav_course_details',{"cid":course.cid});
			break;
			case 'enr':
				$state.go('tab.enr_course_details',{"cid":course.cid});
			break;
			case 'srh':
				$state.go('tab.srh_course_details',{"cid":course.cid});
			break;
		}
	};
	
	$scope.getNumber = function(num)
	{
		return new Array(num);
	};
		
	$scope.getCourseList = function()
	{
		switch($stateParams.type)
		{
			case 'cat':
				$http.get('services/courses/all.json').then(function(obj)
				{
					Course.set(obj.data);
					$scope.courses = Course.getAt($stateParams.catId);
				}
				,function(err)
				{
					console.error('ERR', err);
				});
			break;
			case 'fav':
				$http.get('services/courses/all.json').then(function(obj)
				{
					Course.set(obj.data);
					$scope.courses = Course.getFav($scope.userProfile.fav);
				}
				,function(err)
				{
					console.error('ERR', err);
				});
			break;
			case 'enr':
				$http.get('services/courses/all.json').then(function(obj)
				{
					Course.set(obj.data);
					$scope.courses = Course.getEnr($scope.userProfile.enr);
				}
				,function(err)
				{
					console.error('ERR', err);
				});
			break;
			case 'rec':
				$http.get('services/courses/all.json').then(function(obj)
				{
					Course.set(obj.data);
					$scope.courses = Course.getRec($scope.userProfile.occ);
				}
				,function(err)
				{
					console.error('ERR', err);
				});
			break;
		}
		
		$scope.$broadcast('scroll.refreshComplete');
	};
	
	$scope.refreshCourseList = function()
	{
		$scope.getCourseList();
	};
	
	$scope.doFav = function(course)
	{
		course.isItfav = !course.isItfav;
		if(course.isItfav)
		{
			$scope.userProfile.fav[course.cid] = course.cid;
		}
		else
		{
			delete $scope.userProfile.fav[course.cid];
		}
    };
	
	$scope.isFav = function(course)
	{
		course.isItfav = ($scope.userProfile.fav[course.cid] == course.cid);
	};
	
	$ionicModal.fromTemplateUrl('templates/course_share.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.shareModal = modal;
	});
	
	$scope.openShareModal = function()
	{
		$scope.shareModal.show();
	};
	
	$scope.closeShareModal = function()
	{
		$scope.shareModal.hide();
	};
	
	$scope.subHeadFilter = function(scf)
	{
		$scope.userProfile.scf = scf;
		$scope.c = ['','',''];
		$scope.c[$scope.userProfile.scf] = 'active';
		$scope.getCourseList();
	}
	
	$scope.subHeadFilter(0);
})

.controller('OnlineCourseDetailsCtrl', function($scope, $stateParams, $ionicModal, Course)
{
	$scope.userProfile.isTabHide = true;
	
	$ionicModal.fromTemplateUrl('templates/course_share.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.shareModal = modal;
	});
	
	$scope.openShareModal = function()
	{
		$scope.shareModal.show();
	};
	
	$scope.closeShareModal = function()
	{
		$scope.shareModal.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/course_reviews.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.reviewsModal = modal;
	});
	
	$scope.openReviewsModal = function()
	{
		$scope.reviewsModal.show();
	};
	
	$scope.closeReviewsModal = function()
	{
		$scope.reviewsModal.hide();
	};
	
	$scope.doFav = function(course)
	{
		course.isItfav = !course.isItfav;
		if(course.isItfav)
		{
			$scope.userProfile.fav[course.cid] = course.cid;
		}
		else
		{
			delete $scope.userProfile.fav[course.cid];
		}
    };
	
	$scope.getNumber = function(num)
	{
		return new Array(num);
	};
	
	$scope.getTopBtnLabel = function(status)
	{
		switch(status){
			case "In-Progress":
				return "Launch Now";
			break;
			case "Not Started":
				return "Launch Now";
			break;
			case "Pass":
				return "Get Certificate";
			break;
			case "Fail":
				return "Try Again";
			break;
		}
	}
	
	$scope.course = Course.getDetail($stateParams.cid);
});