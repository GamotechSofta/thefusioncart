import crypto from 'crypto';
import axios from 'axios';

// In-memory OTP store (phone -> { hashedOTP, expiry })
const otpStore = new Map();

const FAST2SMS_BULK_URL = 'https://www.fast2sms.com/dev/bulkV2';

/** DLT-aligned template; {#var#} is replaced with the 6-digit OTP at send time. */
const OTP_MESSAGE_TEMPLATE =
  process.env.FAST2SMS_OTP_MESSAGE_TEMPLATE ||
  'Your TheFusionCart verification code is {#var#}. Valid for 5 minutes. Do not share it with anyone.';

function buildOtpMessage(otp) {
  return OTP_MESSAGE_TEMPLATE.replace(/\{#var#\}/g, String(otp));
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOTP(otp) {
  return crypto.createHash('sha256').update(String(otp)).digest('hex');
}

async function sendOtpViaFast2Sms({ apiKey, phone, message }) {
  const params = new URLSearchParams();
  params.append('route', 'q');
  params.append('message', message);
  params.append('numbers', phone);

  if (process.env.FAST2SMS_DEBUG === 'true') {
    console.log(`[Fast2SMS] Sending OTP to ${phone}...`);
  }

  const response = await axios.post(FAST2SMS_BULK_URL, params.toString(), {
    headers: {
      authorization: apiKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 10000,
  });

  if (process.env.FAST2SMS_DEBUG === 'true') {
    console.log('[Fast2SMS] Response:', response.data);
  }

  if (response.data?.return !== true) {
    const errMsg =
      response.data?.message ||
      (Array.isArray(response.data?.message) ? response.data.message.join(', ') : null) ||
      'Fast2SMS returned a non-success response';
    throw new Error(errMsg);
  }

  return response.data;
}

/**
 * Send OTP via Fast2SMS (route=q, bulkV2)
 */
export async function sendOtp(req, res) {
  try {
    const phone = req.body.phone || req.body.mobile;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number. Must be 10 digits starting with 6-9',
      });
    }

    const fast2smsApiKey = process.env.FAST2SMS_API_KEY;
    if (!fast2smsApiKey) {
      return res.status(500).json({
        success: false,
        message: 'SMS gateway not configured. Set FAST2SMS_API_KEY in environment.',
      });
    }

    const otp = generateOTP();
    const hashedOTP = hashOTP(otp);
    const expiry = Date.now() + 5 * 60 * 1000;

    otpStore.set(phone, { hashedOTP, expiry });

    const message = buildOtpMessage(otp);

    try {
      await sendOtpViaFast2Sms({ apiKey: fast2smsApiKey, phone, message });
      return res.json({
        success: true,
        message: 'OTP sent successfully',
      });
    } catch (smsErr) {
      console.error('[Fast2SMS Error]', smsErr.response?.data || smsErr.message);
      otpStore.delete(phone);
      return res.status(500).json({
        success: false,
        message: smsErr.message || 'Failed to send OTP via Fast2SMS',
      });
    }
  } catch (error) {
    console.error('Send OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while sending OTP',
    });
  }
}

export { otpStore, hashOTP };
