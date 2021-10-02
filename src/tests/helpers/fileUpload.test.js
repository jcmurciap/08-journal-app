import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dyigfrbji', 
    api_key: '783775478669187', 
    api_secret: 'r06m73OGVnq3BHHAEB_cctQ3apw',
    secure: true
  });

describe( '<fileUploads /> tests', () => {
    
    test( 'Upload a file and return its URL', async() => {
        
        const resp = await fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5lfKEAio-guhI7y4P4LPiYqpJSBc_hfjlTQ&usqp=CAU.png');
        const blob = await resp.blob();
        const file = new File( [blob], 'foto.png' );
        
        // new image in cloudinary
        const url = await fileUpload( file );
        
        expect( typeof url ).toBe('string');

        // delete images by ID
        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg',''); 
        cloudinary.v2.api.delete_resources( imageId, {}, () => {
        });
    }); 
    
    test( 'return a null expression', async() => {
        
        const file = new File( [], 'foto.png' );
        
        // new image in cloudinary
        const url = await fileUpload( file );
        expect( url ).toBe(null);
    });
})
