const editBtn = document.querySelector('.edit-btn');
const modal = document.getElementById('editProfileModal');
const closeBtn = document.getElementById('closeEditProfile');
const cameraBtn = document.getElementById('editProfileCameraBtn');
const fileInput = document.getElementById('editProfileImgInput');
const imgPreview = document.getElementById('editProfileImgPreview');

editBtn.addEventListener('click', () => {
  modal.classList.add('active');
});
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

if (cameraBtn && fileInput && imgPreview) {
  cameraBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        imgPreview.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}
const editProfileForm = document.querySelector('.edit-profile-form');

if (editProfileForm) {
  editProfileForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData();
    // Add image if selected
    if (fileInput && fileInput.files[0]) {
      formData.append('profileImage', fileInput.files[0]);
    }
    // Add other fields
    formData.append('firstName', editProfileForm.querySelector('input[placeholder="First Name"]').value);
    formData.append('lastName', editProfileForm.querySelector('input[placeholder="Last Name"]').value);
    formData.append('username', editProfileForm.querySelector('input[placeholder="Username"]').value);
    formData.append('email', editProfileForm.querySelector('input[placeholder="Email"]').value);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token') // if you use JWT in localStorage
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        document.querySelectorAll('.profile-img').forEach(img => {
          img.src = data.profileImage;
        });
        showSuccessMessage('Profile updated successfully!');
        modal.classList.remove('active');
      } else {
        const err = await res.json();
        showErrorMessage(err.message || 'Update failed');
      }
    } catch (error) {
      showErrorMessage('Network error');
    }
  });
}

// Helper functions for messages
function showSuccessMessage(msg) {
  showBanner(msg, 'success');
}
function showErrorMessage(msg) {
  showBanner(msg, 'error');
}
function showBanner(msg, type) {
  let banner = document.createElement('div');
  banner.className = 'profile-banner ' + type;
  banner.textContent = msg;
  document.body.appendChild(banner);
  setTimeout(() => banner.remove(), 3000);
}