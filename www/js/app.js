// Ionic Starter App
angular.module('app', ['ionic', 'app.controllers', 'app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	$ionicConfigProvider.backButton.text('');
	$ionicConfigProvider.backButton.previousTitleText(false);
	
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
    .state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html',
		controller: 'AppCtrl'
	})

	// Each tab has its own nav history stack:
	.state('tab.category_list', {
		url: '/category_list/:catId',
		views: {
		  'tab-category': {
			templateUrl: 'templates/category_list.html',
			controller: 'OnlineCourseCatListCtrl'
		  }
		}
	})
	.state('tab.course_list', {
		url: '/course_list/:catId',
		params: {type: 'cat'},
		cache: false,
		views: {
			'tab-category': {
			  templateUrl: 'templates/course_list.html',
			  controller: 'OnlineCourseListCtrl'
			}
		}
    })
    .state('tab.course_details', {
		url: '/course_details/:cid',
		views: {
			'tab-category': {
			  templateUrl: 'templates/course_details.html',
			  controller: 'OnlineCourseDetailsCtrl'
			}
		}
    })
	
	.state('tab.fav', {
		url: '/fav',
		cache: false,
		params: {type: 'fav'},
		views: {
			'tab-fav': {
			  templateUrl: 'templates/fav_course_list.html',
			  controller: 'OnlineCourseListCtrl'
			}
		}
	})
	.state('tab.fav_course_details', {
		url: '/course_details/:cid',
		views: {
			'tab-fav': {
			  templateUrl: 'templates/course_details.html',
			  controller: 'OnlineCourseDetailsCtrl'
			}
		}
    })
	
	.state('tab.enr', {
		url: '/enr',
		cache: false,
		params: {type: 'enr'},
		views: {
			'tab-enr': {
			  templateUrl: 'templates/enr_course_list.html',
			  controller: 'OnlineCourseListCtrl'
			}
		}
	})
	.state('tab.enr_course_details', {
		url: '/course_details/:cid',
		views: {
			'tab-enr': {
			  templateUrl: 'templates/enr_course_details.html',
			  controller: 'OnlineCourseDetailsCtrl'
			}
		}
    })
	
	.state('tab.search', {
		url: '/search',
		cache: false,
		params: {type: 'srh'},
		views: {
			'tab-search': {
			  templateUrl: 'templates/srh_course_list.html',
			  controller: 'OnlineCourseListCtrl'
			}
		}
	})
	.state('tab.srh_course_details', {
		url: '/course_details/:cid',
		views: {
			'tab-search': {
			  templateUrl: 'templates/course_details.html',
			  controller: 'OnlineCourseDetailsCtrl'
			}
		}
    });

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/category_list/0');
});