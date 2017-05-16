




function Face() {
    
}


Face.prototype.find = function(place_path,callback) {

  const cv = require('opencv');

  cv.readImage(place_path, function(err, im){  
    if (err) throw err;
    if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

    im.detectObject('data/haarcascade_frontalface_alt2.xml', {}, function(err, faces){
      if (err) throw err;

      if (faces.length==0) {

        console.log('No faces');
        callback(1,null);
        return;

      }

      callback(0,faces);
      return;
      
    });
  });




}

Face.prototype.replace = function(place_path,face_path,place,face,result_path,callback) {



  const cv = require('opencv');

  console.log('face_path',face_path);


  cv.readImage(place_path, function(err, im){  
    if (err) throw err;
    if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');



      cv.readImage(face_path, function(err2, im2){  
        if (err2) throw err2;
        if (im2.width() < 1 || im2.height() < 1) throw new Error('Im2age has no size');

        

          // if (faces2.length==0) {

          //   console.log('No faces');
          //   callback(0);
          //   return;

          // }

          // var place = faces[0];
          // var face = faces2[0];

          console.log('place ',im);
          console.log(place);
          console.log('Target X(width) from : ',place.x,' to: ',place.x+place.width);
          console.log('Target Y(width) from : ',place.y,' to: ',place.y+place.width);
          console.log('face: ',im2);
          console.log(face);
          console.log('Source X(width) from : ',face.x,' to: ',face.x+face.height);
          console.log('Source Y(width) from : ',face.y,' to: ',face.y+face.height);

          scala = face.width/place.width;
          console.log('scala: ',scala);




          imc = im2.crop(face.x, face.y, face.width, face.height);
          // imc.save('out_crop.jpg');

          imc.resize(place.width,place.height);

          var center_x = place.x + place.width/2; 
          var center_y = place.y + place.height/2; 

          rx = place.width/2;
          ry = place.height/2;

          function mergePixel(pixel1,pixel2,whight){

            p = [];
            p[0] = ( pixel1[0] * whight )+( pixel2[0] * (1-whight) );
            p[1] = ( pixel1[1] * whight )+( pixel2[1] * (1-whight) );
            p[2] = ( pixel1[2] * whight )+( pixel2[2] * (1-whight) );
            return p;    


          }

          console.log((rx)*(ry));
          window_size = ((rx)*(ry))/2;


          for (var i = 0; i < rx; i++){

            for (var j = 0; j < ry; j++){

              if( (i*i+j*j) < ((rx)*(ry))-window_size){
                
                im.pixel(ry+place.y+j,rx+place.x+i,imc.pixel(ry+j,rx+i));
                im.pixel(ry+place.y-j,rx+place.x+i,imc.pixel(ry-j,rx+i));
                im.pixel(ry+place.y+j,rx+place.x-i,imc.pixel(ry+j,rx-i));
                im.pixel(ry+place.y-j,rx+place.x-i,imc.pixel(ry-j,rx-i));

              } else if((i*i+j*j) > ((rx)*(ry))-window_size && (i*i+j*j) < ((rx)*(ry))){
                
                
                whight = ( (i*i+j*j) / ((rx)*(ry)+window_size) )  ;//0.4;
                //console.log(whight);
                p = mergePixel(im.pixel(ry+place.y+j,rx+place.x+i),imc.pixel(ry+j,rx+i),whight)
                im.pixel(ry+place.y+j,rx+place.x+i,p);

                p = mergePixel(im.pixel(ry+place.y-j,rx+place.x+i),imc.pixel(ry-j,rx+i),whight)
                im.pixel(ry+place.y-j,rx+place.x+i,p);
                
                p = mergePixel(im.pixel(ry+place.y+j,rx+place.x-i),imc.pixel(ry+j,rx-i),whight)
                im.pixel(ry+place.y+j,rx+place.x-i,p);

                p = mergePixel(im.pixel(ry+place.y-j,rx+place.x-i),imc.pixel(ry-j,rx-i),whight)
                im.pixel(ry+place.y-j,rx+place.x-i,p);

              }


            
            }
            
          }

        

          //console.log( (imc.pixel(ry,rx)[0]+imc.pixel(ry,rx)[0])/2 );
          //console.log( imc.pixel(ry,rx) + imc.pixel(ry,rx) );

          //timestamp = new Date().getTime().toString();
          //console.log(timestamp);
          im.save(result_path);

          callback(1);

          // im.save('out_result.jpg');
          // console.log('Image 3 saved.');
          //var mat = new cv.Matrix.Eye(4,4);
          //pixel = im.get(1,1);
          //console.log(im);
          //console.log(im.row(14));




        });



  });




}

Face.prototype.replace_old = function(place_path,face_path,result_path,callback) {



  const cv = require('opencv');

  console.log('face_path',face_path);


  cv.readImage(place_path, function(err, im){  
    if (err) throw err;
    if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

    im.detectObject('data/haarcascade_frontalface_alt2.xml', {}, function(err, faces){
      if (err) throw err;

      
      if (faces.length==0) {

        console.log('No faces');
        callback(0);
        returnv;

      }

      // for (var i = 0; i < faces.length; i++){
      //   var face = faces[i];
      //   im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2, [255, 255, 0], 3);
      // }




      cv.readImage(face_path, function(err2, im2){  
        if (err2) throw err2;
        if (im2.width() < 1 || im2.height() < 1) throw new Error('Im2age has no size');

        im2.detectObject('data/haarcascade_frontalface_alt2.xml', {}, function(err2, faces2){
      //     if (err2) throw err2;

      //     for (var i = 0; i < faces2.length; i++){
      //       var face = faces2[i];
      //       im2.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2, [255, 255, 0], 3);
      //     }



          //im.save('out_detection.jpg');
          //console.log('Image 1 saved.');

          // im2.save('men-detection.jpg');
          // console.log('Image 2 saved.');

          if (faces2.length==0) {

            console.log('No faces');
            callback(0);
            return;

          }

          var place = faces[0];
          var face = faces2[0];

          console.log('im: ',im);

          console.log(place);
          console.log('Target X(width) from : ',place.x,' to: ',place.x+place.width);
          console.log('Target Y(width) from : ',place.y,' to: ',place.y+place.width);
          
          console.log(face);
          console.log('Source X(width) from : ',face.x,' to: ',face.x+face.height);
          console.log('Source Y(width) from : ',face.y,' to: ',face.y+face.height);

          scala = face.width/place.width;
          console.log('scala: ',scala);




          imc = im2.crop(face.x, face.y, face.width, face.height);
          // imc.save('out_crop.jpg');

          imc.resize(place.width,place.height);

          var center_x = place.x + place.width/2; 
          var center_y = place.y + place.height/2; 

          rx = place.width/2;
          ry = place.height/2;

          function mergePixel(pixel1,pixel2,whight){

            p = [];
            p[0] = ( pixel1[0] * whight )+( pixel2[0] * (1-whight) );
            p[1] = ( pixel1[1] * whight )+( pixel2[1] * (1-whight) );
            p[2] = ( pixel1[2] * whight )+( pixel2[2] * (1-whight) );
            return p;    


          }

          console.log((rx)*(ry));
          window_size = ((rx)*(ry))/2;


          for (var i = 0; i < rx; i++){

            for (var j = 0; j < ry; j++){

              if( (i*i+j*j) < ((rx)*(ry))-window_size){
                
                im.pixel(ry+place.y+j,rx+place.x+i,imc.pixel(ry+j,rx+i));
                im.pixel(ry+place.y-j,rx+place.x+i,imc.pixel(ry-j,rx+i));
                im.pixel(ry+place.y+j,rx+place.x-i,imc.pixel(ry+j,rx-i));
                im.pixel(ry+place.y-j,rx+place.x-i,imc.pixel(ry-j,rx-i));

              } else if((i*i+j*j) > ((rx)*(ry))-window_size && (i*i+j*j) < ((rx)*(ry))){
                
                
                whight = ( (i*i+j*j) / ((rx)*(ry)+window_size) )  ;//0.4;
                //console.log(whight);
                p = mergePixel(im.pixel(ry+place.y+j,rx+place.x+i),imc.pixel(ry+j,rx+i),whight)
                im.pixel(ry+place.y+j,rx+place.x+i,p);

                p = mergePixel(im.pixel(ry+place.y-j,rx+place.x+i),imc.pixel(ry-j,rx+i),whight)
                im.pixel(ry+place.y-j,rx+place.x+i,p);
                
                p = mergePixel(im.pixel(ry+place.y+j,rx+place.x-i),imc.pixel(ry+j,rx-i),whight)
                im.pixel(ry+place.y+j,rx+place.x-i,p);

                p = mergePixel(im.pixel(ry+place.y-j,rx+place.x-i),imc.pixel(ry-j,rx-i),whight)
                im.pixel(ry+place.y-j,rx+place.x-i,p);

              }


            
            }
            
          }

        

          //console.log( (imc.pixel(ry,rx)[0]+imc.pixel(ry,rx)[0])/2 );
          //console.log( imc.pixel(ry,rx) + imc.pixel(ry,rx) );

          //timestamp = new Date().getTime().toString();
          //console.log(timestamp);
          im.save(result_path);

          callback(1);

          // im.save('out_result.jpg');
          // console.log('Image 3 saved.');
          //var mat = new cv.Matrix.Eye(4,4);
          //pixel = im.get(1,1);
          //console.log(im);
          //console.log(im.row(14));




        });
      });





      
    });
  });




}

module.exports = Face;

