
import { Loading,LoadingController,ToastController, Toast } from 'ionic-angular';
export abstract class Base{
   
    constructor(){}

    protected showLoadding( loadingCtrl: LoadingController,
                  message:string):Loading{
            const loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
   }

   protected showToast(toastCtrl: ToastController,
                      message:string):Toast{

       const toast = toastCtrl.create({
         message: message,
         duration: 3000,
         position: 'bottom'
       });
       toast.present();
       return toast;
   }

}