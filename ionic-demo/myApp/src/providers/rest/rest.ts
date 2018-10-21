import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class RestProvider {

    //feed
    private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

    //account
    private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
    private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
    private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
    private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
    private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";
  
    //question
    private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
    private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
    private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
    private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
    private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
    private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
  
    //notification
    private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";
  

  constructor(public http: Http) {
  
  }

  public login(mobile:string,password:string):Observable<string[]> {
    return this.getUrlResponse(this.apiUrlLogin+"?mobile="+mobile+"&password="+password);
  }

  public register(nickname,mobile,password):Observable<string[]> {
    return this.getUrlResponse(this.apiUrlRegister+"?mobile="+mobile+"&password="+password+"&nickname="+nickname);
  }

  public getUserInfo(userId):Observable<string[]> {
    return this.getUrlResponse(this.apiUrlUserInfo+"?userid="+userId);
  }
  
  public updateNickName(userId,nickName):Observable<string[]> {
    return this.getUrlResponse(this.apiUrlUpdateNickName+"?userid="+userId+"&nickname="+nickName);
  }

  public submitQueston(userId,title,content):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlQuestionSave+"?userid="+userId+"&title="+title+"&content="+content);
  }
  
  public getFeeds():Observable<string[]>{
    return this.getUrlResponse(this.apiUrlFeeds);
  }
  
  public getQuestion(id):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlGetQuestion+"?id="+id);
  }

  public getQuestionByQuestionIdAndUserId(id,userid):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlGetQuestionWithUser+"?id="+id+"&userid="+userid);
  }

  public getFavriteByQuestionIdAndUserId(id,userid):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlSaveFavourite+"?questionid="+id+"&userid="+userid);
  }
  
  public answerQuestion(id,userId,content):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlAnswer+"?questionid="+id+"&userid="+userId+"&content="+content);
  }

  public getQuestionList():Observable<string[]>{
    return this.getUrlResponse(this.apiUrlQuestionList);
  }
  
  public getNotificationByUserId(userId):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlUserNotifications+"?userid="+userId);
  }

  public getUserQuestionList(userid,type):Observable<string[]>{
    return this.getUrlResponse(this.apiUrlQuestionList+"&userid="+userid+"&type="+type);
  }

  public getUrlResponse(url:string) : Observable<string[]> {
     return this.http.get(url).map(this.extractData).catch(this.handleError);
  } 
  
  private extractData(res: Response) {
     let body = res.json();
     return JSON.parse(body) || {};
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
