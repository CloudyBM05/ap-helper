// Firebase debug test that can be run in browser console
// Copy and paste this into the browser console on the live site

console.log('🔍 Starting Firebase Debug Test...');

// Check if Firebase modules are available globally (they might not be)
console.log('📦 Checking Firebase availability...');

// Try to import Firebase dynamically
(async () => {
    try {
        console.log('📥 Attempting to import Firebase...');
        
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const { getAuth, GoogleAuthProvider, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        
        console.log('✅ Firebase modules imported successfully');
        
        // Firebase config from the app
        const firebaseConfig = {
            apiKey: "AIzaSyAxrYV2R8PLLrJLHSwgcg_gkFttWtr-2Go",
            authDomain: "ap-helper-7a6ac.firebaseapp.com",
            projectId: "ap-helper-7a6ac",
            storageBucket: "ap-helper-7a6ac.firebasestorage.app",
            messagingSenderId: "947116941994",
            appId: "1:947116941994:web:419f67156b2c9f01b466d3",
            measurementId: "G-BWBT538YWD"
        };
        
        console.log('🔧 Firebase config:', firebaseConfig);
        
        // Initialize Firebase
        console.log('🚀 Initializing Firebase...');
        const app = initializeApp(firebaseConfig);
        console.log('✅ Firebase app initialized:', app);
        
        // Initialize Auth
        console.log('🔐 Initializing Firebase Auth...');
        const auth = getAuth(app);
        console.log('✅ Firebase Auth initialized:', auth);
        
        // Test auth state listener
        console.log('👂 Setting up auth state listener...');
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('👤 User is signed in:', {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName
                });
            } else {
                console.log('🚪 No user signed in');
            }
        });
        
        // Test Google Auth Provider
        console.log('🌐 Testing Google Auth Provider...');
        const provider = new GoogleAuthProvider();
        console.log('✅ Google Auth Provider created:', provider);
        
        console.log('🎉 Firebase Debug Test completed successfully!');
        console.log('💡 You can now test login with: signInWithPopup(auth, provider)');
        
        // Make auth and provider available globally for testing
        window.debugFirebaseAuth = auth;
        window.debugGoogleProvider = provider;
        
    } catch (error) {
        console.error('❌ Firebase Debug Test failed:', error);
        console.error('📋 Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        
        // Check specific error types
        if (error.message.includes('auth/configuration-not-found')) {
            console.error('🔧 Configuration Error: Firebase project configuration is invalid');
        } else if (error.message.includes('auth/api-key-not-valid')) {
            console.error('🔑 API Key Error: Firebase API key is invalid or restricted');
        } else if (error.message.includes('auth/unauthorized-domain')) {
            console.error('🌐 Domain Error: Current domain is not authorized in Firebase Console');
        } else if (error.message.includes('auth/operation-not-allowed')) {
            console.error('🚫 Provider Error: Google sign-in is not enabled in Firebase Console');
        }
    }
})();
