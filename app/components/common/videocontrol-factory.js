'use strict';

angular
        .module('App.Services')
        .factory('videoControl', videoControl);

function videoControl() {
        // Video Methods
        return {
            goTo:goTo
        };
        
        //Hoisted Functions
        
        // Jump To Seconds
        function goTo(time , id ){
            var video = document.getElementById(id);
            video.currentTime=time;    
        }
}