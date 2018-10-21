import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ToastController, ModalController, LoadingController, ActionSheetController, Platform, Loading, ViewController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { Base } from '../../common/base';

//导入四个插件
import { File} from '@ionic-native/file';
import { FileTransfer,FileTransferObject} from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';


declare var cordova: any; //导入第三方的库定义到 TS 项目中

@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends Base{

  userId:string;
  lastImageName:string = null;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl:ModalController,
              public loadingCtrl:LoadingController,
              public storage:Storage,
              public rest:RestProvider,
              public actionSheetCtrl:ActionSheetController,
              public camera:Camera,
              public filePath:FilePath,
              public file:File,
              public fileTransfer:FileTransfer,
              public platForm:Platform,
              public toastCtrl:ToastController,
              public viewCtrl:ViewController) {
      super();
  }

  ionViewDidEnter() {
     this.storage.get('userId').then((val)=>{
         if(val != null){
            this.userId = val;
         }
     })
 }

 presentActionSheet(){
     let actionSheet =this.actionSheetCtrl.create({
         title:'请选择一张照片',
         buttons:[
           {
             text:'从本地选择照片',
             handler:()=>{
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
             }
           },
           {
            text:'拍一张照片',
            handler:()=>{
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text:'取消',
            role:"cancle"
          }        
         ]
      });
      actionSheet.present();
  }

  //处理上传的图片
  takePicture(sourceType) {
    //定义相机的一些参数
    var option = {
       quality:100,
       sourceType:sourceType,
       saveToPhotoAlbum:false,//自动保存到相机
       correctOrientation:true //是否纠正拍摄照片
    };

    // 获取图片的方法
    this.camera.getPicture(option).then((imagePath)=>{
      // 安卓的设备做特殊处理
      if(this.platForm.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
         this.filePath.resolveNativePath(imagePath)  // 获取真实路径
           .then(filePath =>{
                let correctPath = filePath.substr(0,filePath.lastIndexOf('/')+1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/')+1,imagePath.lastIndexOf('?'));
                this.copyToLocalDir(correctPath,currentName,this.getFileName());
           })
      }else{
         //获取正确的路径
         var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
         // 获取文件名
         var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
         this.copyToLocalDir(correctPath,currentName,this.getFileName());
      }
    },err=>{
        super.showToast(this.toastCtrl,"选择图片出现错误，请在 App 中操作或检查相关权限。");
    })
  }
  
  //存储图片到本地图库
  copyToLocalDir(correctPath,currentName, newFileName){
     this.file.copyFile(correctPath,currentName,cordova.file.dataDirectory,newFileName)
        .then(success=>{
           this.lastImageName = newFileName;
        },errror=>{
           super.showToast(this.toastCtrl,"存储图片到本地图库出现错误");
        })
  }

  //为文件生成一个名字
  getFileName(){
    var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg"; //拼接文件名
    return newFileName;
  }

  public pathForImage(img){
     if(img == null){
        return '';
     }else{
       return  normalizeURL(cordova.file.dataDirectory+img);
     }
  }
  
  uploadImage(){
     var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
     var targetPath = this.pathForImage(this.lastImageName);
     //定义上传后的文件名
     var filename = this.userId+".jpg";
     //定义上传参数
     var option = {
       fileKey:'file',
       filename:filename,
       chunkedMode:false,
       mimeType:"multipart/form-data",
       params: { 'fileName': filename, 'userid': this.userId }
     }

    const fileTransfer:FileTransferObject = this.fileTransfer.create();
    var loading = super.showLoadding(this.loadingCtrl,"上传中...");
    fileTransfer.upload(targetPath,url,option).then(data=>{
       loading.dismiss();
       super.showToast(this.toastCtrl,"上传成功...");
        //在用户看清弹窗提示后进行页面的关闭
        setTimeout(()=>{
          this.viewCtrl.dismiss();
        },3000);
    },err=>{
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传发生错误，请重试。");
    })
  }


}
