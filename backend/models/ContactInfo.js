import mongoose from 'mongoose';

const CURRENT_CONTACT = {
  email: 'info@thefusioncart.shop',
  phone: '+918745015901',
  address:
    'Fourth Floor, Unit No OF-437, Tower A2, Spaze I Tech Park, Sohna Road, Sector 49, Gurugram, Haryana 122018',
  companyName: 'TheFusionCart',
};

const contactInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      default: 'TheFusionCart',
      trim: true,
    },
  },
  { timestamps: true }
);

// Ensure only one contact info document exists
contactInfoSchema.statics.getContactInfo = async function () {
  let contactInfo = await this.findOne();
  if (!contactInfo) {
    contactInfo = await this.create(CURRENT_CONTACT);
    return contactInfo;
  }

  const isStale = /buynest|janak puri|suneja/i.test(
    `${contactInfo.email} ${contactInfo.companyName} ${contactInfo.address || ''}`
  );
  if (isStale) {
    contactInfo.email = CURRENT_CONTACT.email;
    contactInfo.phone = CURRENT_CONTACT.phone;
    contactInfo.address = CURRENT_CONTACT.address;
    contactInfo.companyName = CURRENT_CONTACT.companyName;
    await contactInfo.save();
  }

  return contactInfo;
};

const ContactInfo = mongoose.models.ContactInfo || mongoose.model('ContactInfo', contactInfoSchema);

export default ContactInfo;
