var app = angular.module('wildridgeApp', []);

app.factory('wildridgeHomePageService', function ($http) {
	return {
		getLatestVideos: function () {
			//since $http.get returns a promise,
			//and promise.then() also returns a promise
			//that resolves to whatever value is returned in it's
			//callback argument, we can return that.
			return $http.get('http://speakglobally.net/api/videos/latest').then(function (result) {
				return result.data.rows;
			});
		},
		getLatestOneVideo: function () {
			return $http.get('http://speakglobally.net/api/videos/latest_one').then(function (result) {
				return result.data.rows[0];
			});
		},
		getTop5News: function () {
			return $http.get('/api/news/top5').then(function (result) {
				return result.data.rows;
			});
		},
		getFeaturedVideo: function () {
			return $http.get('http://speakglobally.net/api/videos/home_video').then(function (result) {
				return result.data.rows;
			});
		}
	};
});

app.controller('WildridgeHome', function ($scope, wildridgeHomePageService, $window) {
	//the clean and simple way
	$scope.latestVideos = wildridgeHomePageService.getLatestVideos();
	$scope.latestVideo = wildridgeHomePageService.getLatestOneVideo();
	$scope.top5 = wildridgeHomePageService.getTop5News();

	$scope.$watch('latestVideo', function (videoObj) {
		if (videoObj !== undefined) {
			$window.hiro.playList[0].url= 'http://91cefb89b61292d7a6a5-9b3e53ad93e76fa27450765a72dfcdf1.r61.cf2.rackcdn.com/' + videoObj.value.video_path;
			$window.hiro.playList[0].customProperties.videoTitle = videoObj.value.title;
			$window.hiro.playList[0].customProperties.videoExternalId = videoObj.value._id;
			$window.hiro.playList[0].customProperties.videoDescription = videoObj.value.description;
			$window.hiro.playList[0].customProperties.videoKeyWords = videoObj.value.description;
			$window.hiro.playList[0].customProperties.videoTags = videoObj.value.title;
			$window.hiro.playList[0].customProperties.videoDurationSecs = videoObj.value.duration;
		}
	});
});