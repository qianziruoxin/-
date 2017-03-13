/**
 * @author 翟倩倩(zqq10861@ly.com)
 * @module
 * @exports
 * @desc
 */
function tabFn(){
    $(".tabList li").on("click",function(){
        var li_index =$(this).index();
        if(!$(this).hasClass("on")){
            $(".tabList li").removeClass("on");
            $(this).addClass("on");
        }
        if($(".liBox").eq(li_index).hasClass("none")){
            $(".liBox").addClass("none");
            $(".liBox").eq(li_index).removeClass("none");
        }
    });
}
tabFn();