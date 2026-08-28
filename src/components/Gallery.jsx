import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Upload, Trash2, ImagePlus } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import './Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Admin State
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  
  // Upload State
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Listen to Firestore for real-time updates
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPhotos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPhotos(fetchedPhotos);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching photos from Firebase:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'mansimaddy') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword('');
    } else {
      alert("Incorrect password!");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    try {
      // Create a unique file name
      const fileRef = ref(storage, `gallery/${Date.now()}_${uploadFile.name}`);
      
      // Upload to Firebase Storage
      await uploadBytes(fileRef, uploadFile);
      
      // Get the public URL
      const url = await getDownloadURL(fileRef);
      
      // Save the URL to Firestore Database
      await addDoc(collection(db, 'photos'), {
        url: url,
        storagePath: fileRef.fullPath,
        createdAt: serverTimestamp()
      });

      setUploadFile(null);
      // reset file input
      document.getElementById('file-upload').value = '';
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please check console.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId, storagePath) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      // Delete from Firestore Database
      await deleteDoc(doc(db, 'photos', photoId));
      
      // Delete from Storage if we have the path
      if (storagePath) {
        const fileRef = ref(storage, storagePath);
        await deleteObject(fileRef);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  // Fallback to local photos if DB is totally empty and not loading
  const displayPhotos = photos.length > 0 ? photos : 
    (loading ? [] : [
      { id: 'local1', url: photo1 },
      { id: 'local2', url: photo2 }
    ]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="gallery-section">
      <div className="gallery-header">
        <motion.h2 
          className="gallery-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Memories
        </motion.h2>

        {/* Hidden Admin Toggle Button */}
        {!isAdmin && (
          <button 
            className="admin-lock-btn" 
            onClick={() => setShowAdminLogin(!showAdminLogin)}
          >
            <Lock size={16} />
          </button>
        )}

        {isAdmin && (
          <button 
            className="admin-lock-btn" 
            onClick={() => setIsAdmin(false)}
            style={{ opacity: 1, color: 'var(--primary)' }}
          >
            <Unlock size={16} /> Logout Admin
          </button>
        )}
      </div>

      {/* Admin Login Form */}
      {showAdminLogin && !isAdmin && (
        <motion.form 
          className="admin-controls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
        >
          <p>Enter password to manage photos:</p>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            placeholder="Password..."
            autoFocus
          />
          <button type="submit" className="login-btn">Unlock</button>
        </motion.form>
      )}

      {/* Admin Upload Form */}
      {isAdmin && (
        <motion.form 
          className="admin-controls"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleUpload}
        >
          <h3><ImagePlus size={20} style={{ display: 'inline', marginBottom: '-4px' }} /> Upload New Memory</h3>
          <input 
            type="file" 
            id="file-upload"
            accept="image/*"
            onChange={(e) => setUploadFile(e.target.files[0])}
            className="file-input"
          />
          <button 
            type="submit" 
            className="upload-btn"
            disabled={!uploadFile || uploading}
          >
            {uploading ? "Uploading..." : <><Upload size={16} /> Upload Photo</>}
          </button>
        </motion.form>
      )}
      
      {loading ? (
        <p className="loading-text">Loading memories...</p>
      ) : (
        <motion.div 
          className="gallery-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {displayPhotos.map((photo, index) => (
            <motion.div 
              key={photo.id} 
              className="gallery-item glass-panel"
              variants={item}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                rotateX: 5,
                zIndex: 10,
                boxShadow: "0 25px 50px -12px rgba(255, 77, 133, 0.5)"
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="glare"></div>
              <img src={photo.url} alt={`Memory ${index + 1}`} />
              
              {/* Delete Button for Admins */}
              {isAdmin && photo.id.startsWith('local') === false && (
                <button 
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(photo.id, photo.storagePath);
                  }}
                  title="Delete Photo"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
