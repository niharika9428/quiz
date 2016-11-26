(function(){
 
 angular.module("turtuleFacts")
        .controller("resultsCtrl",ResultsController);
           ResultsController.$inject=['quizMetrics','dataService'];
       function ResultsController(quizMetrics,dataService){
       	                var vm=this;
                          
                         vm.quizMetrics=quizMetrics;
                              vm.dataService=dataService;
                            vm.activeQuestion=0;
                            vm.getAnswerClass=getAnswerClass;
                            vm.setActiveQuestion=setActiveQuestion;
                            vm.calculatePerc=calculatePerc;
                            vm.reset=reset;
                        function getAnswerClass(index) {
                          if(index===quizMetrics.correctAnswers[vm.activeQuestion]){
                             return "bg-success";
                          }else if(index===dataService.quizQuestions[vm.activeQuestion].selected){
                            return "bg-danger";
                          }
                        }

                        function setActiveQuestion (index) {
                         vm.activeQuestion=index;
                        }
                     
                     function calculatePerc() {
                       return quizMetrics.numCorrect/dataService.quizQuestions.length*100;
                     }
                     function reset() {
                      quizMetrics.changeState("results", false);
                      quizMetrics.numCorrect = 0;
 
                      for(var i = 0; i < dataService.quizQuestions.length; i++){
                      var data = dataService.quizQuestions[i]; //binding the current question to data to keep code clean
 
                           data.selected = null;
                           data.correct = null;
                       }
                     }
           
      }     
      
})();