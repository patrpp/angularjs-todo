angular.module('todoApp', [])
    .controller('TodoController', function ($scope) {
        const STORAGE_KEY = 'my-angularjs-tasks';

        // Betöltés localStorage-ból
        $scope.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        $scope.newTask = '';
        $scope.filterStatus = 'all'; // 'all', 'active', 'done'
        $scope.editingIndex = null;
        $scope.editedTaskName = '';

        $scope.addTask = function () {
            const name = $scope.newTask.trim();
            if (name) {
                $scope.tasks.push({ name, done: false });
                $scope.newTask = '';
                saveTasks();
            }
        };

        $scope.removeTask = function (index) {
            $scope.tasks.splice(index, 1);
            saveTasks();
        };

        $scope.filteredTasks = function () {
            return $scope.tasks.filter(task => {
                if ($scope.filterStatus === 'active') return !task.done;
                if ($scope.filterStatus === 'done') return task.done;
                return true;
            });
        };

        $scope.setFilter = function (status) {
            $scope.filterStatus = status;
        };

        $scope.toggleDone = function (task) {
            task.done = !task.done;
            saveTasks();
        };

        $scope.startEdit = function (index) {
            $scope.editingIndex = index;
            $scope.editedTaskName = $scope.tasks[index].name;
        };

        $scope.saveEdit = function (index) {
            const name = $scope.editedTaskName.trim();
            if (name) {
                $scope.tasks[index].name = name;
                $scope.editingIndex = null;
                $scope.editedTaskName = '';
                saveTasks();
            }
        };

        $scope.cancelEdit = function () {
            $scope.editingIndex = null;
            $scope.editedTaskName = '';
        };

        function saveTasks() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify($scope.tasks));
        }
    });
