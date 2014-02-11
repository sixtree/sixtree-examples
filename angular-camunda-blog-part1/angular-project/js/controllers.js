var DefaultCtrl = function DefaultCtrl($scope,CreateOrderService){
    $scope.createOrder = function() {
        CreateOrderService.createOrder({});
    }
};

var TaskDetailCtrl = function TaskDetailCtrl($scope, $routeParams, TaskService) {
    TaskService.getFormForTask($routeParams.id).then(function(url){
        $scope.formUrl = url;
    })
}

var CreateOrderCtrl = function CreateOrderCtrl($scope, $routeParams,  TaskService, $location, AuthService) {

    var taskId = $routeParams.id;
	
    TaskService.getTaskDetail(taskId).then(function(task) {
        $scope.task = task;
        TaskService.getProcessVariables(task.processInstanceId).then(function(variables) {
            $scope.form = flattenVariables(variables);            
        })
    });

    $scope.submit = function() {
        console.log("Submitting form", $scope.form);        
        TaskService.completeTask($scope.task.id, expandVariables($scope.form)).then(function() {
            console.log("Finished submitting");
            $location.path("/");
        });
    };
}