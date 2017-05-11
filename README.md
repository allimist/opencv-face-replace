# opencv-face-replace


npm install opencv-face-replace

place_path = data/place.jpg // targer face image fime paht
face_path = data/fece.jpg // source face image fime paht

place = { x: 280, y: 110, width: 240, height: 240 }; //target face location
face = { x: 280, y: 110, width: 240, height: 240 }; //source face location


face.replace(place_path,face_path,place,faces,result_path,function(){  
    console.log('image ready callback');
});

example: http://animalbody.ga