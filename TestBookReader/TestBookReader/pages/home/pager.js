/**
 * Created by Elviras on 14-4-13.
 */
function Pager(item){
    if (!item) return;
    this.obj = item;                                                           //分页对象
    this._pageSize = this.obj.clientWidth;                                 //可见页面大小
    this._recordCount = this.obj.scrollWidth;                             //总大小
    this._pageIndex =  1;                                                    //当前页
    this._pageCount = Math.ceil(this._recordCount/this._pageSize);     //总页数
    this._flag = false;
}

Pager.prototype = {
    /**
     * 初始化
     */
    init : function(){
        var self = this;
        self.obj.style.right = '0px';

        if (self._pageCount > 1) {
            var myDiv = document.createElement("div");
            myDiv.id = "pagerNav";
            myDiv.innerHTML = window.toStaticHTML(self._createBtn());
            document.body.appendChild(myDiv);
            self._bindEvent();
        }
    },
    _createBtn : function(){
        return '<button id="preBtn" disabled>上一页</button>' +
            '<button id="nextBtn">下一页</button>';
    },
    _bindEvent : function(){
        this._preBtn = document.getElementById('preBtn');
        this._nextBtn = document.getElementById('nextBtn');
        var self = this;
        var pre = self._preBtn.onclick = function(){
            self._pageIndex>1?self.goto(self._pageIndex-1):false;
            self._pageIndex--;
            self._changeBtn();
        }
        var next = self._nextBtn.onclick = function(){
            self._pageIndex<self._pageCount?self.goto(self._pageIndex+1):false;
            self._pageIndex++;
            self._changeBtn();
        }
    },
    goto : function(index){
        document.getElementById('main').style.right = -(index-1)*this._pageSize + 'px';
    },
    _changeBtn : function(){
        if (this._pageIndex>1 && this._pageIndex<this._pageCount){
            this._nextBtn.disabled = false;
            this._preBtn.disabled = false;
        }else if (this._pageIndex<=1){
            this._nextBtn.disabled = false;
            this._preBtn.disabled = true;
        }else{
            this._nextBtn.disabled = true;
            this._preBtn.disabled = false;
        }
    }
}