import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { storage } from './firebase';

// Upload file to Firebase Storage
export const uploadFile = (file, path, onProgress = null) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        console.error('Upload error:', error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch(reject);
      }
    );
  });
};

// Upload multiple files for admission application
export const uploadAdmissionDocuments = async (applicationId, documents, onProgress = null) => {
  try {
    const uploadPromises = [];
    const documentUrls = {};

    Object.entries(documents).forEach(([docType, file]) => {
      if (file) {
        const path = `admission_documents/${applicationId}/${docType}/${file.name}`;
        uploadPromises.push(
          uploadFile(file, path, onProgress).then(url => {
            documentUrls[docType] = {
              url,
              fileName: file.name,
              uploadedAt: new Date().toISOString()
            };
          })
        );
      }
    });

    await Promise.all(uploadPromises);
    return documentUrls;
  } catch (error) {
    console.error('Error uploading admission documents:', error);
    throw error;
  }
};

// Delete file from storage
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
