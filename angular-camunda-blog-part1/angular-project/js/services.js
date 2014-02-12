/**
 * Created by ciju.joseph on 11/02/14.
 */
 
app.factory("AuthService", function() {    
    var user = "demo";
    return {
        user: user
    };
});

app.factory("TaskService", function($http) {
    var processes = {};
    // index the process definition identifiers (id) by their process definition names (key)
    $http.get(camundaRestUrl + '/process-definition')
        .then(function(res) {
            var mapped = _.reduce(res.data, function(result, value) {
                result[value.key] = value.id;
                return result;
            }, {});
            processes = mapped;
        });
   
    function startProcess(process, variables) {
        var id = processes[process];
        console.log("Step 1")
        return $http.post(camundaRestUrl + '/process-definition/' + id + '/start', {variables: variables})
            .then(function(res) {
                return getTasksForProcess(res.data.id);
            })
            .then(function(res) {
                return _.map(res, 'id');
            });
    }	
	
	function getTasksForProcess(processId) {
        console.log("Step 2")
        return $http.get(camundaRestUrl + '/task?processInstanceId=' + processId)
            .then(function(res) {
                return res.data;
            });
    }
	
	function getTaskDetail(id) {
        console.log("Step 4")
        return $http.get(camundaRestUrl + '/task/' + id)
            .then(function(res) {
                return res.data;
            });
    }
	
	function getProcessVariables(id) {
        console.log("Step 5")
        return $http.get(camundaRestUrl + '/process-instance/' + id + '/variables')
            .then(function(res) {
                return res.data;
            });
    }
	
	function completeTask(id, variables) {
        console.log("Step 5")
        return $http.post(camundaRestUrl + '/task/' + id + '/complete', { variables: variables })
            .then(function(res) {
                console.log("Task Completed: ", id, variables);                
                return res.data;
            });
    }    
	function getFormForTask(taskId) {
        console.log("Step 3")
        return $http.get(camundaRestUrl + '/task/' + taskId + '/form')
            .then(function(res) {
                return "partials/" + res.data.key + ".html";
            });
    }

    return {
        startProcess: startProcess,
		getTasksForProcess: getTasksForProcess,
		getTaskDetail: getTaskDetail,
		getProcessVariables: getProcessVariables,
        completeTask: completeTask,
		getFormForTask: getFormForTask			
    };
});

app.factory("CreateOrderService", function($location, AuthService, TaskService) {
    

    function createOrder(variables) {
        variables.member = AuthService.user

        // returns any tasks created as part of starting this process
        TaskService.startProcess('create-order', expandVariables(variables))
            .then(function (tasks) {
                if (tasks.length > 0) {
                    $location.path("/task/" + tasks[0]);
                }
            })
    }

    return {
        createOrder: createOrder
    };
});
