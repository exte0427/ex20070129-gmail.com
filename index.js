let noticeNum=0;
let writeNum;
let historyWriteNum;
let writeTitle;
let writeVisit;
let getTag1 = $("tr.discussHeadRow").html() ;
let created;
let writeUser;
var two=0;
$.get(`https://playentry.org/api/discuss/findNotice?noCache=1570785798862`,d=>{
  noticeNum=d.length;
  for(var i=0;i<noticeNum;i++)
    $('tr.discussRow.ng-scope:first').remove();
  $('tr.discussHeadRow:first').remove();
})
setInterval(function() {
  $.get('https://playentry.org/api/discuss/find?category=free', d => {
    writeNum=d.data[0].number;
    writeTitle=d.data[0].title;
    writeVisit=Math.floor(Math.random() * 10) + 1;
    created=d.data[0].created;
    writeUser=d.data[0].user.username;
  })
  if(historyWriteNum!=writeNum){
    historyWriteNum=writeNum;
    if(two==0){two=1;}
    else{
      run();
    }
  }
},1000);
function run(){
  var getTag = $("tbody").html() ;
  var insTag = `<tr class="discussRow ng-scope" ng-click="goToArticle(article)" ng-repeat="article in articleList">
                      <!-- ngIf: !(category == 'notice' && article.isopen == true) && !article.groupNotice --><td class="discussNum ng-binding ng-scope" ng-if="!(category == 'notice' &amp;&amp; article.isopen == true) &amp;&amp; !article.groupNotice">
                          ${writeNum}
                      </td><!-- end ngIf: !(category == 'notice' && article.isopen == true) && !article.groupNotice -->
                      <!-- ngIf: (category == 'notice' && article.isopen == true) || article.groupNotice -->
                      <td class="discussTitle">
                          <div class="discussTitleWrapper entryEllipsis ng-binding" ng-class="{discussNoticeCategory:article.category == 'notice' &amp;&amp; article.isopen == true}">
                              ${writeTitle}
                          </div>
                          <!-- ngIf: category == 'report' && global.user.username != article.user.username -->
                          <!-- ngIf: category != 'report' && article.commentsLength -->
                          <!-- ngIf: category != "report" && getTimeInterval(article.created) --><span ng-if="category != &quot;report&quot; &amp;&amp; getTimeInterval(article.created)" class="ng-scope">
                              <img src="/img/assets/study/new.png">
                          </span><!-- end ngIf: category != "report" && getTimeInterval(article.created) -->
                      </td>
                      <td class="discussWriter entryEllipsis ng-binding">
                          <!-- ngIf: advisoryList.indexOf(article.owner) !== -1 -->
                          ${writeUser}
                      </td>
                      <td class="discussDate ng-binding">20.03.27</td>
                      <!-- ngIf: category != 'report' --><td class="discussViewCount ng-binding ng-scope" ng-if="category != 'report'">${writeVisit}</td><!-- end ngIf: category != 'report' -->
                      <!-- ngIf: category != 'report' --><td class="discussLikeCount ng-binding ng-scope" ng-if="category != 'report'">
                          0</td><!-- end ngIf: category != 'report' -->
                      <!-- ngIf: category == 'report' -->
                  </tr>`

  $("tbody").html(insTag+getTag) ;
}
