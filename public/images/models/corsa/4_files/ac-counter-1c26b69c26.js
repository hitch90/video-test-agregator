$(document).ready(function(){$("[data-counter]").each(function(){var a=$(this).data("counter"),t=$(this).data("counter-id");a&&t&&$.ajax({type:"POST",url:"/ac-ajax/counter",dataType:"json",data:{counterName:a,counterId:t}})})});