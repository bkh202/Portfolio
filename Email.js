// Initialize EmailJS with your Public Key
emailjs.init("klXvda2dqII_9KlXi");   // Replace with your actual public key

const form = document.getElementById('advancedContactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('emailId').value.trim();
  const phone = document.getElementById('phoneNum').value.trim();
  const message = document.getElementById('msgContent').value.trim();

  if (!name || !email || !message) {
    feedback.innerHTML = '<span style="color:#f87171;">❌ Please fill all required fields.</span>';
    return;
  }

  const submitBtn = document.getElementById('sendBtn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
  submitBtn.disabled = true;

  try {
    await email.send('service_po71t3y', 'template_yii3zwj', {
      from_name: name,
      from_email: email,
      phone_number: phone,
      message: message,
    });
    feedback.innerHTML = '<span style="color:#2dd4bf;">✅ Message sent successfully! I\'ll reply soon.</span>';
    form.reset();
  } catch (error) {
    console.error('EmailJS error:', error);
    feedback.innerHTML = '<span style="color:#f87171;">❌ Failed to send. Please try again later.</span>';
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    setTimeout(() => feedback.innerHTML = '', 5000);
  }
});