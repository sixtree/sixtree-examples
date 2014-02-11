var camundaRestUrl = "http://localhost:8085/engine-rest";

var app = angular.module("AngularCamundaApp", ["ngRoute"]);

function flattenVariables(variables) {
    var flattened = {};
    _.forOwn(variables, function(a,b) { flattened[b] = a.value; });
    return flattened;
}

function expandVariables(variables) {
    var expanded = {};
    _.forOwn(variables, function(a,b) { expanded[b] = {value: a}; });
    return expanded;
}

var AppConfig = function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');    
    $routeProvider.when("/task/:id", {
        templateUrl: "/partials/taskDetail.html",
        controller: TaskDetailCtrl
    });
    $routeProvider.otherwise({ redirectTo: "/" });;
};

app.config(AppConfig);