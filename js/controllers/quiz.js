(function(){
 
 angular.module("turtuleFacts")
        .controller("quizCtrl",QuizController);
         QuizController.$inject=['quizMetrics','dataService'];
       function QuizController(quizMetrics,dataService){
          var vm=this;
          vm.quizMetrics=quizMetrics;
          vm.dataService=dataService;
          vm.activeQuestion=0;
          vm.questionAnswered=questionAnswered;
          vm.setActiveQuestion=setActiveQuestion;
          vm.selectAnswer=selectAnswer;
          vm.error=false;
          vm.finalise=false;
           var numQuestionsAnswered=0;
           vm.finaliseAnswers=finaliseAnswers;
         
           function setActiveQuestion(index){
           if(index===undefined){
              var breakout=false;
              var quizLength=dataService.quizQuestions.length-1;
            while(!breakout){
             
              vm.activeQuestion=vm.activeQuestion<quizLength?++vm.activeQuestion:0;
                        if(vm.activeQuestion===0){
                          vm.error=true;
                        }

                   if(dataService.quizQuestions[vm.activeQuestion].selected===null){
                     breakout=true;
                     
                   }
            }

           }else{
            vm.activeQuestion=index;
           }
         }

          function questionAnswered() {
            
            var quizLength=dataService.quizQuestions.length;
              if(dataService.quizQuestions[vm.activeQuestion].selected!==null){
                     
                        numQuestionsAnswered++;
                        if(numQuestionsAnswered>=quizLength){
                                 for(var i=0;i<quizLength;i++){
                                  if(dataService.quizQuestions[i].selected===null){
                                          setActiveQuestion(i);
                                          return;
                                  }
                                 }
                                 vm.error=false;
                                 vm.finalise=true;
                                 return;
                        }
                      
              }
               vm.setActiveQuestion();
          }

          function selectAnswer(index){
            dataService.quizQuestions[vm.activeQuestion].selected=index;

          }

          function finaliseAnswers () {
              vm.finalise=false;
              vm.numQuestionsAnswered=0;
              vm.activeQuestion=0;
              quizMetrics.markQuiz();
              quizMetrics.changeState("quiz",false);
              quizMetrics.changeState("results",true);
            


          }
       }
       	            
})();