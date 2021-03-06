/*global cordova, module*/

module.exports = {
    findDevices: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "findDevices", []);
    },
    setPassword: function (password, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "setPassword", [password]);
    },
    connect: function (deviceId, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "connect", [deviceId]);
    },
    setTime: function (time, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "setTime", [time]);
    },
    getTime: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getTime", []);
    },
    setPersonalInformation: function (info, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "setPersonalInformation", [info]);
    },
    getPersonalInformation: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getPersonalInformation", []);
    },
    setTargetSteps: function (steps, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "setTargetSteps", [steps]);
    },
    getTargetSteps: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getTargetSteps", []);
    },
    getCurrentActivityInformation: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getCurrentActivityInformation", []);
    },
    getTotalActivityData: function (day, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getTotalActivityData", [day]);
    },
    getDetailActivityData: function (day, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getDetailActivityData", [day]);
    },
    startRealTimeMeterMode: function (realtimeCallback, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "startRealTimeMeterMode", [realtimeCallback]);
    },
    stopRealTimeMeterMode: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "stopRealTimeMeterMode", []);
    },
    getSleepMonitorMode: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getSleepMonitorMode", []);
    },
    switchSleepMonitorMode: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "switchSleepMonitorMode", []);
    },
    startECGMode: function (ECGModeCallback, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "startECGMode", [ECGModeCallback]);
    },
    stopECGMode: function (successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "stopECGMode", []);
    },
    getECGData: function (index, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SPCFit", "getECGData", [index]);
    }
};

