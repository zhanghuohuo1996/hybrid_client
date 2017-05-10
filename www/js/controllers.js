angular.module('starter.controllers', [])
.controller('makefriendsCtrl', function($scope,$ionicLoading,$timeout,$rootScope,$http) {
	  //以下是进入页面的loading的假广播事件（可通过ajax）
	//ajax
	$scope.pageCount=1;
	$scope.rows=new Array({},{},{},{},{},{});
	$http.get('http://222.31.101.52:3000/makefriends?p=1').success(function(result){
		$scope.items=result;
		console.log($scope.items);	
	}).error(function(err){console.log(err);});
	$rootScope.$broadcast('loading:show');
	//$ionicLoading.show();
	  $timeout(function(){
		$rootScope.$broadcast('loading:hide');  
	  },1000);
	  //refresh
	  $scope.doRefresh=function(){
		// $http.jsonp('http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?%22')
		//	.success(function(result) {
		//})
		//	.finally(function() {
			// 停止广播ion-refresher
			$scope.$broadcast('scroll.refreshComplete');
		//});
	  }
	  //init-scroll
	   $scope.moredata=true;
	   $scope.loadMore=function(){
		   $scope.pageCount++;
		   console.log($scope.pageCount);
			$http.get('http://222.31.101.52:3000/makefriends?p='+$scope.pageCount).success(function(result){
					console.log(result);
					for(var i=0;i<result.length;i++)
					$scope.items.push(result[i]);
					$scope.rows.push({},{},{},{},{},{});
			}).error(function(err){console.log(err);});
			 if($scope.rows.length>100)
			 {$scope.moredata=false;}
			 $scope.$broadcast('scroll.infiniteScrollComplete');
		// });
	  }
     $scope.indexInRange = function(columnIndex,rowIndex) {
		return columnIndex >= (rowIndex * 5) && columnIndex < (rowIndex * 5) + 5;
    };
        //$scope.defaultchoose=true;
        $scope.sexchoose=false;
        $scope.agechoose=false;
        $scope.showmenu=false;
        $scope.showMenuFun=function(){
            if($scope.showmenu==false)
            {
                $scope.showmenu=true;
            }
            else{
                $scope.showmenu=false;
            }
            if($scope.agechoose==false&&$scope.sexchoose==false)
            {
                $scope.defaultchoose=true;
            }
            else{$scope.defaultchoose=false;}
           /* if($scope.sexchoose==false&&$scope.agechoose==false)
            {
                $scope.defaultchoose=true;
            }*/
        }
        $scope.sexchooseFun=function(){
            $scope.agechoose=false;
            if($scope.sexchoose==false)
            {$scope.sexchoose=true;}
        }
        $scope.agechooseFun=function(){
            $scope.sexchoose=false;
            $scope.agechoose=true;
        }
        $scope.defaultchooseFun=function(){
            $scope.sexchoose=false;
            $scope.agechoose=false;
        }
      /*  $scope.$watch('defaultchoose',change_value);
        function change_value(){
                $scope.sexchoose=false;
                $scope.agechoose=false;
        }*/
  })
  
  
  .controller('messagesCtrl',function($scope,messageService,$timeout,$ionicModal,$state){
	  $scope.$on('$ionicView.loaded',function(){
		  $scope.messages=messageService.getAllMessages();
		  $scope.popup={isPopup:false,index:0};
	  });
	  $scope.popupMessageOptions=function(message){
		   $scope.openModal(); 
	   }
	  $scope.markMessage=function(){
		  
	  }
	  $scope.deleteMessage=function(){
		  
	  }  
	$ionicModal.fromTemplateUrl('templates/chatPopup.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
   $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
	$scope.gotoMessageDetail=function(index){
		$state.go('tab.messageDetail',{'userIndex':index});
	}
	  $scope.showsearch=false;

  })
  .controller('messageDetailCtrl',function($scope,$state,$timeout){
  
  var socket=io.connect('http://222.31.101.52:3000');
  socket.on('message', function(obj){
		$scope.messages.push({content:obj.content});
	});
  $scope.messages=[{content:'Ionic既是一个CSS框架也是一个Javascript UI库',fromme:true},{content:'许多组件需要Javascript才能产生神奇的效果，尽管通常组件不需要编码，通过框架扩展可以很容易地使用，比如我们的AngularIonic扩展。'},{content:'Ionic遵循视图控制模式，通俗的理解和 Cocoa 触摸框架相似。',fromme:true},{content:'在视图控制模式中，我们将界面的不同部分分为子视图或包含其他视图的子视图控制器。然后视图控制器“驱动”内部视图来提供交互和UI功能。'},{content:'一个很好的例子就是标签栏（Tab Bar）视图控制器处理点击标签栏在一系列可视化面板间切换。',fromme:true}];
  $scope.backToChat=function(){
	  $state.go('tab.messages');
  }
  $scope.friend={
	  name:"王五"
  };
	$scope.sendMessage=function(){
		var value=angular.element('#messageValue').val();
		//value=usernameA+'/*/from:'+usernameB+'/*/from:'+value;
		var obj={username:'zhangsan',content:value};
		socket.emit('message',obj);
		console.log(value);
		angular.element('#messageValue').val('');
		$scope.messages.push({content:value,fromme:true});
	}
	 function appendLog(type, nickname, message) {
            if (typeof message == "undefined") return;
           // var preface_label;
           // if (type === 'notification') {
           //     
           // } else if (type == 'nick_update') {
           //    
           // } else {
           //     $scope.messages.push({content:message});
           // }
		   $scope.messages.push({content:message});
        }
        //收到消息处理
       
	
  })
//bounceInDown fadeOutDownBig
.controller('newsCtrl', function($scope,$ionicLoading){
	
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated
  // or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	$scope.moredata=true;
	$scope.loadMore=function(){
		//$http.get('').then(function(result){
		$scope.newsItems.push({},{},{},{},{});
		if($scope.newsItems.length==28){
			$scope.moredata=false;
		}
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
	
    $scope.newsItems=[{},{},{},{},{},{},{},{}];
	  $scope.doRefresh=function(){
		// $http.jsonp('http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?%22')
		//	.success(function(result) {
		//})
		//	.finally(function() {
			// 停止广播ion-refresher
			$scope.$broadcast('scroll.refreshComplete');
		//});
	  }
})

.controller('newsDetailCtrl', function($scope,$stateParams,$state,$ionicLoading) {
 // $scope.chat = Chats.get($stateParams.newsId);
    $scope.text=$stateParams.newsId;
	$scope.showWriteComment=true;
	$scope.content={
		'newsTitle':'法庭交锋：同性婚姻"修"还是"订"法？',
		'newsTime':'2017-03-28',
		'newsAuthor':'华夏经纬网',
		'newsImage':'img/newsdemo.jpg',
		'newsContent':'同性婚姻“修法”？订“专法”？“宪法”法庭交锋'+

　　'华夏经纬网3月26日讯：据台湾媒体报道，“同性是否能结婚？”“宪法”法庭前天进行辩论，声请人祁家威和台北市政府力争同性婚姻权利。“民法”主管机关台“法务部长”邱太三表示，“民法”婚姻限男女未“违宪”，婚姻制度应“立法者”就社会作规范，还询问声请人“同性婚的需求何时出现”。六位学者的鉴定虽都肯定同志权益应受保护，该如何“立法”各有主张.'+

　　'据报道，同性婚释“宪案”前天在台“司法院宪法法庭”召开，“司法院”外有挺同与反同人士“尬场”，大批警力维安进驻。15位大法官中，“立法委员”尤美女的丈夫黄瑞明自请回避，14位大法官同坐台上聆听各方意见，并有多位大法官提问。辩论进行约4小时结束，审判长许宗力谕知一个月内指定日期公布解释。依规定，最慢5月23日必须做出解释。'+

　　'祁家威：立“专法”像骑协力车'+

　　'前天辩论的焦点在于厘清“‘民法’是否允许同性别二人结婚”，如果不允许是否违反“宪法”保障的婚姻自由与平等权？如果“立法”创设“同性伴侣”等非婚姻其他制度，是否“合宪”？'+

　　'台湾第一个出柜的男同志祁家威二度为同婚声请“释宪”，前天进场前，祁对挺同团体表示，会极力争取“一定要用‘民法’来保障同志伴侣的婚姻”。他在法庭上陈述时，希望大法官不要朝“专法”方向走，“这不啻是如次等民众般的歧视”，像是异性恋骑摩托车，同志只能骑协力车，“很累”。祁表示，很多国家是由伴侣法进步到婚姻法，从没有一个国家是从婚姻法退步到伴侣法，设立“专法”，是对同志侮辱，也侮辱台湾地区的民主法治。'+

　　'廖元豪：婚姻样态在改变中'+

　　'同样提出“释宪”声请的台北市政府由廖元豪副教授任代理人，他指出，婚姻制度是“立法者”所形塑，自古以来有它的变与常。以前婚姻可以纳妾，唐律更说“无子可休妻”，代代的价值观都不一样，现在的婚姻要求一对一的忠诚、法律保障，婚姻样态“在改变中”。',
		'newsCommentCount':'521'
	};
	$scope.hhh="true";
    console.log($scope.text);
    $scope.backToNews=function(){
      $state.go('tab.news');
    }
	$scope.touchTheContent=function(){
		if($scope.showWriteComment==true)
		{$scope.showWriteComment=false}
		else{
			$scope.showWriteComment=true;
		}
			console.log('touchtouch');
	}
})

.controller('accountCtrl', function($scope,$state,$ionicLoading,$ionicLoading,$ionicPopup,$timeout,$interval,$cordovaSms) {
  $scope.bindPhoneFlag="未绑定手机";
  $scope.settings = {
    enableFriends: true
  };
    $scope.user={
      username:'Dave',
      usertitle:'you belong to me!'
    };
    $scope.gotoAccountSetting=function(){
      $state.go('tab.setting',{'userid':'dave'});
	}
	$scope.gotoMyHome=function(){
		$state.go('tab.myHome',{'userid':'dave'});
	}
	
		$scope.bindPhone=function(){
	// var OriginName=$scope.user.name;
	$scope.timeinfo="获取验证码";
	 var myPopup = $ionicPopup.show({
	 template: '<input id="phoneNumberId" type="number" placeholder="输入手机号"/><input id="checkNum" type="number" style="width:50%;display:inline-block;height:30px;" placeholder="输入验证码"/><a id="getCheckNumId" ng-click="getCheckNumber()" style="line-height:30px;">{{timeinfo}}</a>',
	 title: '绑定手机',
	 subTitle: '',
	 scope: $scope,
	 buttons: [
	   { text: 'Cancel',
		onTap:function(e){
			// $scope.user.name=OriginName;  
		}
	   },
	   {
		 text: '<b>Save</b>',
		 type: 'button-positive',
		 onTap: function(e) { 
			if(angular.element('#checkNum').val()==$scope.checkNum){
					var popupsave=$ionicPopup.show({
						title:'绑定成功！'
					});
					$scope.bindPhoneFlag="已绑定:"+$scope.phoneNumber.toString().substr(0,3)+"****"+$scope.phoneNumber.toString().substr(7);
					angular.element('#bindPhoneFlagId').addClass('bindsuccess');
					window.setTimeout(function(){popupsave.close();},500);	
			}
			else{
				var popupsave=$ionicPopup.show({
						title:'绑定失败，请重新绑定！'
					});
					window.setTimeout(function(){popupsave.close();},500);	
			}
		 }
	   },
	 ]
   });
  }
 // $scope.sendCheckMessage=function(phoneNumber){
//	  console.log(phoneNumber);
 // }
  $scope.getCheckNumber=function(){
	   var phoneNumber=angular.element('#phoneNumberId').val();
		   console.log(phoneNumber);
		   if (phoneNumber.length==0) {
			// $scope.user.name=OriginName;
			// e.preventDefault();
		   } else {
			   //$scope.sendCheckMessage(phoneNumber);
			 $scope.phoneNumber=phoneNumber;
		   }
	      console.log($scope.phoneNumber);
	  	   var options = {
				replaceLineBreaks: false, 
				android: {
				intent: 'INTENT' 
				}
			 };
			 $scope.time=60;
			$interval(function(){	
				$scope.time--;
				$scope.timeinfo='重新获取'+$scope.time;
				if($scope.time==0)
				{
					$scope.timeinfo='获取验证码';
				}
			},1000,$scope.time); 
			var checkNum= Math.floor(Math.random()*9000)+1000;
			console.log(checkNum);
			$scope.checkNum=checkNum;
	        $cordovaSms.send($scope.phoneNumber, '验证码为'+checkNum, options);
  }
})
  .controller('accountSettingCtrl',function($scope,$stateParams,$state,$ionicLoading){
    var name=$stateParams.userid;
    $scope.hello="hello "+name;
    $scope.backToAccount=function(){
      $state.go('tab.account');
    }
    $scope.volumevalue=30;
    $scope.sunnyvalue=30;
    $scope.setting={
      flow:true,
      geolocation:true,
      addFriend:true,
      allowOtherInto:true,
      orientation:true,
      notDisturb:true
    };

  })
  .controller('myHomeCtrl',function($scope,$stateParams,$state,$ionicActionSheet,$ionicModal,$ionicPopup,$rootScope,$timeout,$ocLazyLoad,$ionicLoading){
		
		
		$ocLazyLoad.load([
          '/js/provinceAndcity.js'
        ]);
	$scope.backToAccount=function(){
		 $state.go('tab.account');
	 }
	$scope.changeTouxiang=function(){
		var sheet=$ionicActionSheet.show({
			buttons:[{text:'拍照'},{text:'手机相册选择'}],
			cancelText:'取消',
			buttonClicked:function(index){
				if(index==0)
				{
					//var popupsave=$ionicPopup.show({
					//	title:'保存成功！'
					//});
					//window.setTimeout(function(){popupsave.close();},500);
					$rootScope.openCamerea();
				}
				if(index==1)
				{
					//var confirmPopup=$ionicPopup.confirm({
					//	title:'',
					//	template:'您确定要删除该照片吗？'
					///});
					//confirmPopup.then(function(res){
					//	if(res)
					//	{
					//		var dom=angular.element('#albumId').find('img')[0];
					//		console.log($(dom));
					//		$(dom).attr("style","display:none");
					//		$scope.closeModal();
					//	}
					//	else{
					////		
					//	}
					//});
					$rootScope.openLibray();
				}
				return true;
			}
		});
	}
	$rootScope.openLibray=function(){
		var srcType= Camera.PictureSourceType.SAVEDPHOTOALBUM;
		var options = setOptions(srcType);
			navigator.camera.getPicture(function cameraSuccess(imageUri) {
			displayImage(imageUri);
			}, function cameraError(error) {
				console.log('error:'+error);
			}, options);
			
	}
	$rootScope.openCamerea=function(){
		    var srcType = Camera.PictureSourceType.CAMERA;
			var options = setOptions(srcType);
			navigator.camera.getPicture(function cameraSuccess(imageUri) {
			displayImage(imageUri);
			}, function cameraError(error) {
				console.log('error:'+error);
			}, options);
	}
	function setOptions(srcType) {
		var options = {
		  quality: 50,
		  destinationType: Camera.DestinationType.FILE_URI,
		  sourceType: srcType,
		  encodingType: Camera.EncodingType.JPEG,
		  mediaType: Camera.MediaType.PICTURE,
		  allowEdit: true,
		  correctOrientation: true  //Corrects Android orientation quirks
		}
		return options;
      }
	function displayImage(imgUri) {
		//var dom = document.getElementById('imageFile');
		//dom.src = imgUri;
		var dom=angular.element('#touxiang').find('img');
		$(dom).attr('src',imgUri);
      }
	$scope.noedit=true;
	$scope.edit=false;
  $scope.showActivityComment=false;
  $scope.user={
	  'name':'David','height':'178','weight':'70','province':'北京','city':'海淀区',
	  'emotionStatu':'单身','age':'23','sex':'0',
	  'title':'Never mind, i will find someone like you.',
	  'level':'3',
	  'loves':'25',
	  'activityDegree':'78'};
  $scope.photos=[{},{},{},{},{},{},{},{},{},{}];
  $scope.activitys=[{},{},{},{}];
  $scope.tags=['小清新','暖男','阳光','傲娇受','匀称','找男票'];
  $scope.alltags=['阳光','闷骚','小清新','暖男','腹黑','傲娇受','忠犬攻','匀称','找男票','求约会','天然呆','肌肉男'];
  $scope.showOptions=function(index){
	  var activity=$scope.activitys[index];
	  console.log(index);
	  var dom=angular.element('.card').find('.sharegroup')[index];
	  if($(dom).hasClass('hide'))
	  {
		$(dom).removeClass('hide');
	  }
	  else{$(dom).addClass('hide');}
  }
  $scope.shareQQ=function(){
	$scope.showShareGroup=false;
  }
  $scope.shareWeChat=function(){
	$scope.showShareGroup=false;
  }
  $scope.shareWeibo=function(){
	$scope.showShareGroup=false;
  }
  $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
   $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
	$scope.showImage = function(index) {
	$scope.imageSrc='img/p10.jpg';
      $scope.openModal();   
    }
	$rootScope.showSaveOrDelete=function(){
			var sheet=$ionicActionSheet.show({
			buttons:[{text:'保存'},{text:'删除'}],
			cancelText:'取消',
			buttonClicked:function(index){
				if(index==0)
				{
					var popupsave=$ionicPopup.show({
						title:'保存成功！'
					});
					window.setTimeout(function(){popupsave.close();},500);	
				}
				if(index==1)
				{
					var confirmPopup=$ionicPopup.confirm({
						title:'',
						template:'您确定要删除该照片吗？'
					});
					confirmPopup.then(function(res){
						if(res)
						{
							var dom=angular.element('#albumId').find('img')[0];
							console.log($(dom));
							$(dom).attr("style","display:none");
							$scope.closeModal();
						}
						else{
							
						}
					});
				}
				return true;
			}
		});
		}
	$scope.dianzan=function(index){
	  var activity=$scope.activitys[index];
	  //console.log(index);
	  var dom=angular.element('.card').find('#zan')[index];
	  if($(dom).hasClass('alreadyGood'))
	  {
		var confirmPopup=$ionicPopup.confirm({
			title:'请确认或取消',
			template:'您确定要取消该赞吗？'
		});
		confirmPopup.then(function(res){
			if(res)
			{
				$(dom).removeClass('alreadyGood');
			}
			else{
				
			}
		});
		
	  }
	  else{$(dom).addClass('alreadyGood');}
	}
	$scope.pinglun=function(index){
		if($scope.showActivityComment==false)
		{$scope.showActivityComment=true;}
		else{
			$scope.showActivityComment=false;
		}
	}
	$scope.sendcomment=function(){
		 var value=angular.element('ion-footer-bar').find('#activityCommentInput').val();
		 if(value.replace(' ','')=='')
		 {
			//angular.element('ion-footer-bar').find('#activityCommentInput').val('');
			angular.element('ion-footer-bar').find('#activityCommentInput').attr('placeholder','发送内容不能为空');
		 }
			else
			{
				angular.element('ion-footer-bar').find('#activityCommentInput').val('');
				$scope.showActivityComment=false;
				var dom=angular.element('.card').find('#zan');
			}
	}
	
	$scope.editInfomation=function(){
		if($scope.noedit==true)
		{
			$scope.edit=true;
			$scope.noedit=false;
			$timeout( function (){ 
				for(var i=0;i<$scope.tags.length;i++)
					{
						(function(a){
						var tag=$scope.tags[a];
						var temp=$scope.alltags.indexOf(tag);
						console.log(temp);
						var dom=angular.element('#modifytag').siblings('.tag')[temp];
						console.log($(dom));
						$(dom).addClass("chooseTag");})(i);
					}
			} , 0 , false);
		}
		else{
			$scope.edit=false;
			$scope.noedit=true;
		}
	}
	$scope.chooseTag=function(index){
		 var dom=angular.element('#modifytag').siblings('.tag')[index];
		 if($(dom).hasClass('chooseTag'))
		 {
			 $(dom).removeClass('chooseTag');
			 }
		else{
			 $(dom).addClass("chooseTag");
		}	
	}
	
	$scope.deleteActivity=function(index){
		var dom=angular.element('.activitySection')[index];
		var confirmPopup=$ionicPopup.confirm({
			title:'',
			template:'您是否要删除该条动态？'
		});
		confirmPopup.then(function(res){
			if(res)
			{
				$(dom).attr('style','display:none');	
			}
			else{
				
			}
		});
	}
	//以下是‘修改信息’的弹出框部分：
	$scope.modifyName=function(){
		 var OriginName=$scope.user.name;
		 var myPopup = $ionicPopup.show({
		 template: '<input type="text" ng-model="user.name">',
		 title: '修改昵称',
		 subTitle: '',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancel',
			onTap:function(e){
				 $scope.user.name=OriginName;  
			}
		   },
		   {
			 text: '<b>Save</b>',
			 type: 'button-positive',
			 onTap: function(e) { 
			   var username=$scope.user.name.replace(/(^s*)|(s*$)/g, "");
			   if (username.length==0) {
				 $scope.user.name=OriginName;
				// e.preventDefault();
			   } else {
				 return $scope.user.name;
			   }
			 }
		   },
		 ]
	   });
	}
	
	$scope.modifyHeight=function(){
		 var OriginHeight=$scope.user.height;
		 var myPopup = $ionicPopup.show({
		 template: '<div><input type="text" ng-model="user.height"></div>',
		 title: '修改身高(cm)',
		 subTitle: '',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancel',
			onTap:function(e){
				 $scope.user.height=OriginHeight;  
			}
		   },
		   {
			 text: '<b>Save</b>',
			 type: 'button-positive',
			 onTap: function(e) { 
			   //var userheight=$scope.user.height.replace(/(^s*)|(s*$)/g, "");
			  // if (username.length==0) {
			//	 $scope.user.name=OriginName;
				// e.preventDefault();
			//   } else {
				 return $scope.user.height;
			  // }
			 }
		   },
		 ]
	   });
	}
	$scope.modifyWeight=function(){
		 var OriginWeight=$scope.user.weight;
		 var myPopup = $ionicPopup.show({
		 template: '<div><input type="text" ng-model="user.weight"></div>',
		 title: '修改体重(kg)',
		 subTitle: '',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancel',
			onTap:function(e){
				 $scope.user.weight=OriginWeight;  
			}
		   },
		   {
			 text: '<b>Save</b>',
			 type: 'button-positive',
			 onTap: function(e) { 
			   //var userheight=$scope.user.height.replace(/(^s*)|(s*$)/g, "");
			  // if (username.length==0) {
			//	 $scope.user.name=OriginName;
				// e.preventDefault();
			//   } else {
				 return $scope.user.weight;
			  // }
			 }
		   },
		 ]
	   });
	}
	$scope.modifySex=function(){
		 var OriginSex=$scope.user.sex;
		 var myPopup = $ionicPopup.show({
		 template: '<div><select style="width:100%" ng-model="user.sex"><option value="0">0</option><option value="1">1</option></select></div>',
		 title:'修改型号',
		 subTitle: '',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancel',
			onTap:function(e){
			$scope.user.sex=OriginSex; } 
		   },
		   {
			 text: '<b>Save</b>',
			 type: 'button-positive',
			 onTap: function(e) { 
				 return $scope.user.sex;
			 }
		   },
		 ]
	   });
	} 
	$scope.modifyCity=function(){
		$scope.city=city;
		$scope.citys=[];
		$scope.pro=pro;
		console.log($scope.city);
		console.log($scope.pro);
		 var OriginCity=$scope.user.city;
		 var myPopup = $ionicPopup.show({
		 template: '<div><select id="provinceSelect" style="width:50%" ng-model="user.province" ng-change="changeProvince(user.province)"><option ng-repeat="p in pro">{{p}}</option></select><select style="width:50%"><option ng-model="user.city" ng-repeat="c in citys">{{c}}</option></select></div>',
		 title:'修改家乡',
		 subTitle: '',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancel',
			onTap:function(e){
			$scope.user.city=OriginCity; } 
		   },
		   {
			 text: '<b>Save</b>',
			 type: 'button-positive',
			 onTap: function(e) { 
				 return $scope.user.city;
			 }
		   },
		 ]
	   });
	}
	$scope.changeProvince=function(province){
		console.log(province);
		console.log($scope.city[province]);
		cities=[];
		$scope.citys=[];
		var cities = $scope.city[province];
		console.log(cities);
        for (var i in cities) {  
            $scope.citys.push(cities[i]);  
        }  
		console.log($scope.citys);
		$scope.user.city=$scope.citys[0];
	}
	$scope.modifyEmotionStatu=function(){
	 var OriginEmotionStatu=$scope.user.emotionStatu;
	 var myPopup = $ionicPopup.show({
	 template: '<div><select style="width:100%" ng-model="user.emotionStatu"><option value="单身">单身</option><option value="恋爱">恋爱</option></select></div>',
	 title:'修改爱情状态',
	 subTitle: '',
	 scope: $scope,
	 buttons: [
	   { text: 'Cancel',
		onTap:function(e){
		$scope.user.emotionStatu=OriginEmotionStatu; } 
	   },
	   {
		 text: '<b>Save</b>',
		 type: 'button-positive',
		 onTap: function(e) { 
			 return $scope.user.emotionStatu;
		 }
	   },
	 ]
   });
	} 
	$scope.modifyAge=function(){
		$timeout(function(){
		$('#demobirthday').mobiscroll().date({
        theme: 'ios',
        display: 'bottom',
        max: max
    });
		},0);
	 var OriginAge=$scope.user.age;
	 var myPopup = $ionicPopup.show({
	 template: '<div> <input type="text"  id="demobirthday" ng-model="user.age" name="txtBirthday" /></div>',
	 title:'修改年龄',
	 subTitle: '',
	 scope: $scope,
	 buttons: [
	   { text: 'Cancel',
		onTap:function(e){
		$scope.user.age=OriginAge } 
	   },
	   {
		 text: '<b>Save</b>',
		 type: 'button-positive',
		 onTap: function(e) { 
			 return $scope.user.age;
		 }
	   },
	 ]
   });
	} 
	
	
  })
  .controller('editInfomationCtrl',function($scope, $stateParams,$state,$ionicActionSheet,$ionicModal,$ionicPopup,$rootScope,$ionicLoading){
	  $scope.backToMyHome=function(){
		  $state.go('tab.myHome',{'userid':'dave'});
	  }
  })
  .controller('personHomeCtrl', function($scope, $stateParams,$state,$ionicActionSheet,$ionicModal,$ionicPopup,$rootScope,$ionicLoading) {
	 $scope.backToMakefriends=function(){
		 $state.go('tab.makefriends');
	 }
	 $scope.user={
		 name:'Mr.right',
		 title:'Never mind, i will find someone like you.',
		 level:2,
		 address:"北京-朝阳",
		 loves:30,
		 activityDegree:25
	 };
  $scope.showActivityComment=false;
  $scope.photos=[{},{},{},{},{},{},{},{},{},{}];
  $scope.activitys=[{},{},{},{}];
  $scope.tags=['小清新','暖男','阳光','傲娇受','匀称','找男票'];
  $scope.showOptions=function(index){
	  var activity=$scope.activitys[index];
	  console.log(index);
	  var dom=angular.element('.card').find('.sharegroup')[index];
	  if($(dom).hasClass('hide'))
	  {
		$(dom).removeClass('hide');
	  }
	  else{$(dom).addClass('hide');}
	 // document.getElementsByClassName('card').getElementsByClassName('sharegroup').
	//  angular.element('#'+'activity'+index).removeClass('.hide');
	//  if($s.showShareGroup==true)
	//  {$s.showShareGroup=false;}
//	else
	//  {$s.showShareGroup=true;}  
  }
  $scope.shareQQ=function(){
	$scope.showShareGroup=false;
  }
  $scope.shareWeChat=function(){
	$scope.showShareGroup=false;
  }
  $scope.shareWeibo=function(){
	$scope.showShareGroup=false;
  }
  $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
   $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
	

    $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function(index) {
	$scope.imageSrc='img/p5.jpg';
      $scope.openModal();   
    }
		  	$rootScope.showSave=function(){
			var sheet=$ionicActionSheet.show({
			buttons:[{text:'保存'}],
			cancelText:'取消',
			buttonClicked:function(index){
				if(index==0)
				{
					var popupsave=$ionicPopup.show({
						title:'保存成功！'
					});
					window.setTimeout(function(){popupsave.close();},500);	
				}
				return true;
			}
		});
		}
	
	
	
	$scope.dianzan=function(index){
	  var activity=$scope.activitys[index];
	  //console.log(index);
	  var dom=angular.element('.card').find('#zan')[index];
	  if($(dom).hasClass('alreadyGood'))
	  {
		var confirmPopup=$ionicPopup.confirm({
			title:'请确认或取消',
			template:'您确定要取消该赞吗？'
		});
		confirmPopup.then(function(res){
			if(res)
			{
				$(dom).removeClass('alreadyGood');
			}
			else{
				
			}
		});
		
	  }
	  else{$(dom).addClass('alreadyGood');}

	}
	$scope.pinglun=function(index){
		if($scope.showActivityComment==false)
		{$scope.showActivityComment=true;}
		else{
			$scope.showActivityComment=false;
		}
	}
	$scope.sendcomment=function(){
		 var value=angular.element('ion-footer-bar').find('#activityCommentInput').val();
		 if(value.replace(' ','')=='')
		 {
			//angular.element('ion-footer-bar').find('#activityCommentInput').val('');
			angular.element('ion-footer-bar').find('#activityCommentInput').attr('placeholder','发送内容不能为空');
		 }
			else
			{
				angular.element('ion-footer-bar').find('#activityCommentInput').val('');
				$scope.showActivityComment=false;
				var dom=angular.element('.card').find('#zan');
			}
		
	}
})
  .controller('loginCtrl', function($scope, $stateParams,$state,$ionicActionSheet,$ionicModal,$ionicPopup,$rootScope,$location,$ionicLoading) {
	  $scope.login=function(){
		var hre = '/#/tab/makefriends';
		location.href=hre;
	  }
	  
	})
  .controller('activityDeatilCtrl', function($scope, $stateParams,$state,$ionicActionSheet,$ionicModal,$ionicPopup,$rootScope,$location,$timeout,$ionicLoading) {
	 $timeout(function(){
		 if($scope.comments.length==0)
		 {
			 $scope.showtip=true;
		 }
	 },0);
	 $scope.comments=[{},{},{},{},{}]; 
	 $scope.subcomments=[{},{}];
	 $scope.dianzan=function(){
	  //var activity=$scope.activitys[index];
	  //console.log(index);
	  var dom=angular.element('.card').find('#zan');
	  if($(dom).hasClass('alreadyGood'))
	  {
		var confirmPopup=$ionicPopup.confirm({
			title:'请确认或取消',
			template:'您确定要取消该赞吗？'
		});
		confirmPopup.then(function(res){
			if(res)
			{
				$(dom).removeClass('alreadyGood');
			}
			else{
				
			}
		});
		
	  }
	  else{$(dom).addClass('alreadyGood');}

	}
	$scope.pinglun=function(){
		if($scope.showActivityComment==false)
		{$scope.showActivityComment=true;}
		else{
			$scope.showActivityComment=false;
		}
	}
	$scope.sendcomment=function(){
		 var value=angular.element('ion-footer-bar').find('#activityCommentInput').val();
		 if(value.replace(' ','')=='')
		 {
			//angular.element('ion-footer-bar').find('#activityCommentInput').val('');
			angular.element('ion-footer-bar').find('#activityCommentInput').attr('placeholder','发送内容不能为空');
		 }
			else
			{
				var str=angular.element('ion-footer-bar').find('#activityCommentInput').val();
				angular.element('ion-footer-bar').find('#activityCommentInput').val('');
				$scope.showActivityComment=false;
				//var dom=angular.element('.card').find('#zan');
				//var dom=angular.element('.addcommentParent')[0];
				//console.log($(dom));
	           // var subdom=$(dom).find('.adcomment');
				//console.log($(subdom));
				//$(subdom).append('<div class="addcomment" style="overflow:hidden;margin-left:30px;" ng-repeat="subcomment in subcomments"><div><a><img src="img/p16.jpg" style="width:20px;height:20px;border-radius:10px;float:left"></img></a></div><div style="margin-left:25px;border-top:1px solid #e5e5e5;"><p style="font-color:#727272;font-size:0.3em;">'+str+'</p></div></div>');
			}
	}
	 $scope.shareQQ=function(){
	$scope.showShareGroup=false;
  }
  $scope.shareWeChat=function(){
	$scope.showShareGroup=false;
  }
  $scope.shareWeibo=function(){
	$scope.showShareGroup=false;
  }
  $ionicModal.fromTemplateUrl('image-activity-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
   $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
	

    //$scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';

    $scope.showImage = function() {
	$scope.imageSrc='img/img_small_1.jpg';
      $scope.openModal();   
    }
	 $scope.showOptions=function(){
	  //var activity=$scope.activitys[];
	 // console.log(index);
	  var dom=angular.element('.card').find('.sharegroup');
	  if($(dom).hasClass('hide'))
	  {
		$(dom).removeClass('hide');
	  }
	  else{$(dom).addClass('hide');}
    }
	
	$scope.replyComment=function(index){
		//var dom=angular.element('.addcommentParent')[index];
		//var subdom=$(dom).find('.adcomment');
		if($scope.showActivityComment==false)
		{
			$scope.showActivityComment=true;
		}
		else{
			$scope.showActivityComment=false;
		}
	}
	
  })
.directive('personInfo',function(){
   return{
     restrict:'E',
     template:' <div class="row"><div class="personInfo"><a href=""><img class="col-80 col-offset-10" src="img/p1.jpg" alt=""/></a><p>hhhhs</p></div><div class="personInfo"><a href=""><img class="col-80 col-offset-10" src="img/p1.jpg" alt=""/></a><p>hhhhs</p></div><div class="personInfo"><a href=""><img class="col-80 col-offset-10" src="img/p1.jpg" alt=""/></a><p>hhhhs</p></div><div class="personInfo"><a href=""><img class="col-80 col-offset-10" src="img/p1.jpg" alt=""/></a><p>hhhhs</p></div><div class="personInfo"><a href=""><img class="col-80 col-offset-10" src="img/p1.jpg" alt=""/> </a> <p>hhhhs</p> </div> </div>'
   }
  })
.directive('hideTabs',function($rootScope){
    return {
      restrict:'AE',
      link:function($scope){
        $rootScope.hidetabs = 'tabs-item-hide';
        $scope.$on('$destroy',function(){
          $rootScope.hidetabs = '';
        })
      }
    }
  });
