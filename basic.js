/**
 * @author 翟倩倩(zqq10861@ly.com)
 * @module
 * @exports
 * @desc
 */

var Index={
    tagList:[],
    hobbyList:[],
    tagInput:document.getElementById("tagInput"),
    hobbyText:document.getElementById("hobbyText"),
    tagRex:/[，,;；\s\n]+/,
    hobbyRex:/[，,;；.。、\s\n\t]+/,
    tagHtml:document.getElementsByClassName("tagList")[0],
    hobbyHtml:document.getElementsByClassName("hobbyList")[0],
    hobbyBtn:document.getElementsByClassName("button")[0],
    init:function(){
        this.addEvent();
    },
    //事件绑定
    addEvent: function () {
        var _self = this;
        this.tagInput.addEventListener("keyup",function(){
            _self.tagKeyup();
        });
        this.tagHtml.addEventListener("mouseover",function(elem){
            if(elem.target && elem.target.className == "tagLi"){
                elem.target.firstChild.insertData(0,"点击删除");
                elem.target.style.background = "red";
            }
        });
        this.tagHtml.addEventListener("mouseout",function(elem){
            if(elem.target && elem.target.className == "tagLi"){
                elem.target.firstChild.deleteData(0,4);
                elem.target.style.background = "#08dfff";
            }
        });
        this.tagHtml.addEventListener("click",function(elem){
            if(elem.target && elem.target.className == "tagLi"){
                elem.target.firstChild.deleteData(0,4);
                _self.deleteTag(elem.target.firstChild.textContent);
                this.removeChild(elem.target);
            }
        });
        this.hobbyBtn.addEventListener("click", function () {
            _self.hobbyFn();
            _self.hobbyText.value = "";
        });
    },
    //tagInput键盘输入
    tagKeyup:function(){
        var _ownThis = this;
        if(_ownThis.tagInput.value ==" "){
            return;
        }
        if(_ownThis.tagRex.test(_ownThis.tagInput.value) || event.keyCode ==13){
            var tagData = _ownThis.splitStr(_ownThis.tagInput.value,"tag");
            //判断是否包含重复的字段 -1表示不含重复字段
            if(_ownThis.tagList.indexOf(tagData) == -1 && tagData !=""){
                //超过10个元素的时候，删除第一个
                if(_ownThis.tagList.length >= 10){
                    _ownThis.tagList.shift();
                }
                _ownThis.tagList.push(tagData);
            }
            _ownThis.tagInput.value = "";
            _ownThis.createList(_ownThis.tagList,"tagList","tagLi",_ownThis.tagHtml);
        }
    },
    //对输入的字符做处理
    splitStr:function(str,index){
        var dataString ="";
        switch (index){
            case "tag":
                dataString = str.trim().split(this.tagRex)[0];
                break;
            case "hobby":
               //var dataLen = str.trim().split(this.hobbyRex).length;
                dataString = str.trim().split(this.hobbyRex);
                break;
        }
        return dataString;
    },
    //添加元素
    //list--输入的数组元素;clsName--ul的类名;
    //liName--添加的标签类名;box--所属哪个主体;
    createList:function(list,clsName,liName,box){
        box.className=clsName;
        var liHtml="";
        for(var i=0;i< list.length; i++){
            if(list[i] == ""){
                continue;
            }
            liHtml += "<li class='"+liName+"'>"+list[i]+"</li>";
        }
        box.innerHTML = liHtml;
    },
    //匹配删除tagList里的数据
    deleteTag:function(tagStr){
        var index = this.tagList.indexOf(tagStr);
        this.tagList.splice(index,1);
    },
    hobbyFn:function(){
        var _hobbyThis = this;
        if(_hobbyThis.hobbyText.value == " "){
            return;
        }
        var hobbyData = _hobbyThis.splitStr(_hobbyThis.hobbyText.value,"hobby");
        for(var j= 0;j < hobbyData.length; j++){
            if(_hobbyThis.hobbyList.indexOf(hobbyData[j]) == -1 && hobbyData !=""){
                //超过10个元素的时候，删除第一个
                if(_hobbyThis.hobbyList.length >= 10){
                    _hobbyThis.hobbyList.shift();
                }
                _hobbyThis.hobbyList.push(hobbyData[j]);
            }
        }
        _hobbyThis.createList(_hobbyThis.hobbyList,"hobbyList","hobbyLi",_hobbyThis.hobbyHtml);
    }
};
window.onload = function(){
    Index.init();
};
