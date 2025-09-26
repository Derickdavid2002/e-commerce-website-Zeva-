// TODO: Install EmailJS SDK: npm install @emailjs/browser
// TODO: Create EmailJS account and get your keys from https://www.emailjs.com/
// TODO: Replace with your actual EmailJS configuration

/*
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'your_service_id'
const EMAILJS_TEMPLATE_ID = 'your_template_id'
const EMAILJS_PUBLIC_KEY = 'your_public_key'

export const sendOrderConfirmationEmail = async (orderData: {
  customerEmail: string
  customerName: string
  orderId: string
  total: number
}) => {
  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_email: orderData.customerEmail,
        to_name: orderData.customerName,
        order_id: orderData.orderId,
        total_amount: orderData.total,
      },
      EMAILJS_PUBLIC_KEY
    )
    return result
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
*/

// Placeholder function for development
export const sendOrderConfirmationEmail = async (orderData: any) => {
  console.log("📧 TODO: Configure EmailJS - Replace placeholder in lib/emailjs.ts")
  console.log("Email would be sent to:", orderData.customerEmail)
  return { status: 200, text: "OK" }
}
