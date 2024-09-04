document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form field values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (username.trim() === '' || password.trim() === '') {
                alert('Please fill in all fields.');
                return;
            }

            // If all validations pass
            alert('Login successfully done');
            // Perform actual login actions like sending data to server
            window.location.href = 'index.html';
        });
    }

    // Registration Form Handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form field values
            const username = document.getElementById('username').value;
            const mobile = document.getElementById('mobile').value;
            const provider = document.getElementById('provider').value;
            const bookingFor = document.querySelector('input[name="bookingFor"]:checked');
            const contactOption = document.querySelector('input[name="contactOption"]:checked');

            // Validate the form fields
            if (!username || !mobile || !provider || !bookingFor || !contactOption) {
                alert('Please fill in all fields.');
                return;
            }

            // Additional validation for mobile number (10 digits)
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            // If all validations pass
            alert('Registration successfully done');
            // Perform actual registration actions like sending data to server
        });
    }
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const data = {};
        
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        try {
          const response = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
          const result = await response.json();
          alert(result.message);
        } catch (error) {
          //alert('Error submitting form');
        }
      });
});
