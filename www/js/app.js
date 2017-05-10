// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','oc.lazyLoad','ngCordova'])

.run(function($ionicPlatform,$rootScope,$ionicLoading) {
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
   $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
		template: 'Loading',
		animation: 'fade-in',
		showBackdrop: true
		})
  })
  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
	
   // $httpProvider.interceptors.push(function($rootScope) {
   // return {
	//	  request: function(config) {
	//		$rootScope.$broadcast('loading:show')
	//		return config
	//	  },
	//	  response: function(response) {
	//		$rootScope.$broadcast('loading:hide')
	//		return response
	//	  }
	//	}
	//})
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.makefriends', {
    url: '/makefriends',
    views: {
      'tab-makefriends': {
        templateUrl: 'templates/tab-makefriends.html',
        controller: 'makefriendsCtrl'
      }
    }
  })
  
  .state('tab.messages', {
    url: '/messages',
    views: {
      'tab-messages': {
        templateUrl: 'templates/tab-messages.html',
        controller: 'messagesCtrl'
      }
    }
  })
  
   .state('tab.messageDetail', {
    url: '/messageDetail/:userIndex',
    views: {
      'tab-messages': {
        templateUrl: 'templates/messageDetail.html',
        controller: 'messageDetailCtrl'
      }
    }
   })

  .state('tab.personHome',{
	  url:'/makefriends/personHome',
	  views:{
	  'tab-makefriends':{
		   templateUrl:'templates/personHome.html',
		   controller:'personHomeCtrl'
		}
	  }
  })
  .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news.html',
          controller: 'newsCtrl'
        }
      }
    })
    .state('tab.news-detail', {
      url: '/news/:newsId',
      views: {
        'tab-news': {
          templateUrl: 'templates/news-detail.html',
          controller: 'newsDetailCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'accountCtrl'
      }
    }
  })
    .state('tab.setting',{
      url:'/account/setting/:userid',
      views:{
        'tab-account':{
          templateUrl:'templates/accountSetting.html',
          controller:'accountSettingCtrl'
        }
      }
    })
	 .state('tab.myHome',{
      url:'/account/myHome/:userid',
      views:{
        'tab-account':{
          templateUrl:'templates/myHome.html',
          controller:'myHomeCtrl'
        }
      }
    })
	.state('tab.editInfomation',{
      url:'/editInfomation',
      views:{
        'tab-account':{
          templateUrl:'templates/editinfomation.html',
          controller:'editInfomationCtrl'
        }
      }
    })
	.state('login',{
		url:'/login',		
		templateUrl:'templates/login.html',
		controller:'loginCtrl'		
	})
	.state('tab.activityDetail',{
		url:'/personHome/activityDetail',	
		views:{
        'tab-makefriends':{
          templateUrl:'templates/activityDetail.html',
		  controller:'activityDeatilCtrl'
        }
      }	
	});
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/makefriends');
  
  $urlRouterProvider.otherwise('/tab/makefriends');
});
