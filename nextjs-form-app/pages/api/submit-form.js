// API route to handle form submission
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate incoming data
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid email format' 
      });
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid phone number format' 
      });
    }

    // Simulate processing delay (e.g., database save, email sending)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system
    // etc.

    console.log('Form submission received:', {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        submittedAt: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      },
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
}
