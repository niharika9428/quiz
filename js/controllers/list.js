(function(){
 
 angular.module("turtuleFacts")
        .controller("listCtrl",ListController);
           ListController.$inject=['quizMetrics','dataService'];
       function ListController(quizMetrics,dataService){
       	                var vm=this;
                          vm.turtlesData=dataService.turtlesData;
                          vm.activeTurtle={};
                          vm.changeActiveTurtle=changeActiveTurtle;
                          vm.search="";
                          vm.quizMetrics=quizMetrics;
                          vm.activateQuiz=activateQuiz;
                          function changeActiveTurtle(index){
                            vm.activeTurtle=index;
                          }

                             function activateQuiz(){
                             quizMetrics.changeState("quiz",true);
                            
                          }
                   

                        

           
      }     
      
})();